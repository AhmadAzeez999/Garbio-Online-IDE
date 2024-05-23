// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const codeRoute = require('./routes/code');
app.use('/run', codeRoute);

// Start server
app.listen(port, () => 
{
  	console.log(`Server is running on http://localhost:${port}`);
});
