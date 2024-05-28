import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/edit/closebrackets';
import '../modes/garbio-mode';
const Editor = ({ onCodeChange }) => 
{
 	 const [code, setCode] = useState('');

	return (
		<div className="editor-container">
		<CodeMirror
			value={code}
			options=
			{{
				mode: 'garbio',
				theme: 'material',
				lineNumbers: true,
				autoCloseBrackets: true,
			}}
			onBeforeChange={(editor, data, value) => 
			{
				setCode(value);
				onCodeChange(value);
			}}
		/>
		</div>
	);
};

export default Editor;
