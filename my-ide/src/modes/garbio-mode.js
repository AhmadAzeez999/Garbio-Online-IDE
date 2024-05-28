import CodeMirror from 'codemirror';

CodeMirror.defineMode("garbio", function() 
{
    return {
        token: function(stream, state) 
        {
            if (stream.match("#")) 
            {
                stream.skipToEnd();
                return "comment";
            }

            if (stream.match(/"([^"\\]|\\.)*"?/)) 
            {
                return "string";
            }

            if (stream.match(/if|else|while/)) 
            {
                return "keyword";
            }

            if (stream.match(/function|var/)) 
            {
                return "def";
            }

            if (stream.match(/true|false|null/)) 
            {
                return "atom";
            }

            if (stream.match(/displayln|display/))
            {
                return "builtin";
            }

            if (stream.match(/[+\-*/=]/)) 
            {
                return "operator";
            }

            if (stream.match(/[()[]{}]/))
            {
                return "bracket";
            }

            stream.next();
            return null;
        }
    };
});

CodeMirror.defineMIME("text/x-garbio", "garbio");
