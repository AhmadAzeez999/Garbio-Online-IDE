// src/modes/garbio-mode.js
import CodeMirror from 'codemirror';

CodeMirror.defineMode("garbio", function() 
{
    return {
        token: function(stream, state) 
        {
            if (stream.match("//")) 
            {
                stream.skipToEnd();
                return "comment";
            }

            if (stream.match(/"([^"\\]|\\.)*"?/)) 
            {
                return "string";
            }

            if (stream.match(/function|if|else|display|while/)) 
            {
                return "keyword";
            }

            if (stream.match(/[+\-*/=]/)) 
            {
                return "operator";
            }

            stream.next();
            return null;
        }
    };
});

CodeMirror.defineMIME("text/x-garbio", "garbio");
