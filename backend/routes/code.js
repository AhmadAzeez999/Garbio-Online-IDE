// backend/routes/code.js
const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/', (req, res) => 
{
    const { code } = req.body;
  
    const filePath = path.join(__dirname, '..', 'temp.garb');
  
    fs.writeFile(filePath, code, (err) => 
    {
		if (err) 
		{
			console.error('File write error:', err);
			return res.status(500).send('File write error');
		}
	
		const interpreterPath = path.join(__dirname, '..', 'garbio.out');
		const command = `${interpreterPath} ${filePath}`;
	
		console.log('Executing command:', command); // Debugging statement
	
		exec(command, (error, stdout, stderr) => 
		{
			// Clean up the temp file
			fs.unlink(filePath, () => {});
	
			if (error) 
			{
				console.error('Execution error:', error); // Changed from stderr to error for better error reporting
				return res.status(500).send(error.message || 'Execution error');
			}
			console.log('Execution output:', stdout); // Debugging statement
			res.send(stdout);
		});
    });
  });
  

module.exports = router;
