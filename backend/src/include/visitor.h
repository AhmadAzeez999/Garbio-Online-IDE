#ifndef VISITOR_H
#define VISITOR_H
#include "AST.h"

typedef struct VISITOR_STRUCT
{

} visitor_T;

visitor_T* init_visitor();

// This will take in the root node and check what type it is
// And will call the appropriate child method to visit it
AST_T* visitor_visit(visitor_T* visitor, AST_T* node);

AST_T* visitor_visit_variable_definition(visitor_T* visitor, AST_T* node);

AST_T* visitor_visit_function_definition(visitor_T* visitor, AST_T* node);

AST_T* visitor_visit_variable(visitor_T* visitor, AST_T* node);

AST_T* visitor_visit_function_call(visitor_T* visitor, AST_T* node);

AST_T* visitor_visit_string(visitor_T* visitor, AST_T* node);

AST_T* visitor_visit_compound(visitor_T* visitor, AST_T* node);

AST_T* visitor_visit_boolean(visitor_T* visitor, AST_T* node);

AST_T* visitor_visit_if(visitor_T* visitor, AST_T* node);

AST_T* visitor_visit_number(visitor_T* visitor, AST_T* node);

AST_T* visitor_visit_binop(visitor_T* visitor, AST_T* node);

#endif