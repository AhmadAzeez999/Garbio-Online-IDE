import React from 'react';

const Output = ({ output }) => 
{
    return (
        <div className="output">
        <h3>Output:</h3>
        <pre>{output}</pre>
        </div>
    );
};

export default Output;
