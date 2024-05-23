#include "include/visitor.h"
#include "include/scope.h"
#include <stdio.h>
#include <string.h>

static AST_T* builtin_function_print(visitor_T* visitor, AST_T** args, int args_size)
{
    for (int i = 0; i < args_size; i++)
    {
        AST_T* visited_ast = visitor_visit(visitor, args[i]);

        switch (visited_ast->type)
        {
        case AST_STRING: printf("%s\n", visited_ast->string_value);
            break;
        
        default: printf("%p\n", visited_ast);
            break;
        }
    }

    return init_ast(AST_NOOP);
}

visitor_T* init_visitor()
{
    visitor_T* visitor = calloc(1, sizeof(struct VISITOR_STRUCT));

    return visitor;
}

AST_T* visitor_visit(visitor_T* visitor, AST_T* node)
{        
    switch (node->type)
    {
        case AST_VARIABLE_DEFINITION: return visitor_visit_variable_definition(visitor, node);
            break;

        case AST_FUNCTION_DEFINITION: return visitor_visit_function_definition(visitor, node);
            break;

        case AST_VARIABLE: return visitor_visit_variable(visitor, node);
            break;

        case AST_FUNCTION_CALL: return visitor_visit_function_call(visitor, node);
            break;

        case AST_STRING: return visitor_visit_string(visitor, node);
            break; 

        case AST_COMPOUND: return visitor_visit_compound(visitor, node);
            break;

        case AST_NOOP: return node;
            break;

        default:
            break;
    }

    printf("Uncaught state of type `%d`\n", node->type);
    exit(1);

    return init_ast(AST_NOOP);
}

AST_T* visitor_visit_variable_definition(visitor_T* visitor, AST_T* node)
{
    scope_add_variable_definition(node->scope, node);

    return node;
}

AST_T* visitor_visit_function_definition(visitor_T* visitor, AST_T* node)
{
    scope_add_function_definition(node->scope, node);

    return node;
}

AST_T* visitor_visit_variable(visitor_T* visitor, AST_T* node)
{
    AST_T* vardef = scope_get_variable_definition(node->scope, node->variable_name);

    if (vardef != (void*) 0) // if we found the var definition, visit it
        return visitor_visit(visitor, vardef->variable_definition_value);

    printf("Undefined variable `%s`\n", node->variable_name);
    exit(1);
}

AST_T* visitor_visit_function_call(visitor_T* visitor, AST_T* node)
{
    if (strcmp(node->function_call_name, "display") == 0)
    {
        return builtin_function_print(visitor, node->function_call_arguments, node->function_call_arguments_size);
    }

    AST_T* funcdef = scope_get_function_definition(node->scope, node->function_call_name);

    if (funcdef == (void*)0)
    {
        printf("Undefined method `%s`\n", node->function_call_name);
        exit(1);
    }

    for (int i = 0; i < (int) node->function_call_arguments_size; i++)
    {
        // Grab the variable from the function definition arguments
        AST_T* ast_var = (AST_T*) funcdef->function_definition_args[i];

        // Grab the value from the function call arguments
        AST_T* ast_value = (AST_T*) node->function_call_arguments[i];

        // Create variable definition
        AST_T* ast_vardef = init_ast(AST_VARIABLE_DEFINITION);

        // Attach value to variable definition
        ast_vardef->variable_definition_value = ast_value;

        // Copy variable name into variable definition
        ast_vardef->variable_definition_variable_name = (char*) calloc(strlen(ast_var->variable_name) + 1, sizeof(char));
        strcpy(ast_vardef->variable_definition_variable_name, ast_var->variable_name);

        scope_add_variable_definition(funcdef->function_definition_body->scope, ast_vardef);
    }

    return visitor_visit(visitor, funcdef->function_definition_body);
}

AST_T* visitor_visit_string(visitor_T* visitor, AST_T* node)
{
    return node;
}

AST_T* visitor_visit_compound(visitor_T* visitor, AST_T* node)
{
    for (int i = 0; i < node->compound_size; i++)
    {
        visitor_visit(visitor, node->compound_value[i]);
    }

    return init_ast(AST_NOOP);
}