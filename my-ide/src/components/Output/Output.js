import React from 'react';
import './Output.css';

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
