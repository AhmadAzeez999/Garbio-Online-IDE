import React, { useEffect, useState } from 'react';
import Editor from './components/Editor/Editor';
import Output from './components/Output/Output';
import './App.css';

const App = () => 
{
	const [code, setCode] = useState('');
	const [output, setOutput] = useState('');

	const handleCodeChange = (newCode) => 
	{
		setCode(newCode);
	};

	useEffect(() =>
	{
		const handleKeyDown = (event) =>
		{
			if (event.key === 'F2')
			{
				event.preventDefault();
				runCode();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		// Cleanup
		return () => document.removeEventListener('keydown', handleKeyDown);
	});

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
			<button className='run-button' onClick={runCode}>Run</button>
			<p>Or press 'F2'</p>
			<Output output={output} />
		</div>
	);
};

export default App;
