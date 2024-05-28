import React, { useState } from 'react';
import Editor from './components/Editor';
import Output from './components/Output';
import './App.css';

const App = () => 
{
	const [code, setCode] = useState('');
	const [output, setOutput] = useState('');

	const handleCodeChange = (newCode) => 
	{
		setCode(newCode);
	};

	const runCode = async () => 
	{
		// Removing all tabs from the code
		const cleanedCode = code.replace(/\t/g, '');
	
		const response = await fetch('https://garbio-ide.glitch.me/run', 
		{
			method: 'POST',
			headers: 
			{
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ code: cleanedCode }), // Using the cleaned code
		});
	
		const result = await response.text();
		setOutput(result);
		console.log(response.status);
	};	

	return (
		<div className="App">
		<h1>Garbio IDE</h1>
		<Editor onCodeChange={handleCodeChange} />
		<button onClick={runCode}>Run</button>
		<Output output={output} />
		</div>
	);
};

export default App;
