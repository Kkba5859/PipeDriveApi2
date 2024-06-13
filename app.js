const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse JSON bodies
app.use(express.json());

// Define a route handler for the default home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Define a route handler for the /about page
app.get('/about', (req, res) => {
    res.send('About this site');
});

// Define a route handler for a POST request
app.post('/data', (req, res) => {
    const { clientData, jobData, serviceLocationData, scheduledData } = req.body;

    // Create an object with data to be sent to Pipedrive
    const pipedriveData = {
        title: `${clientData.firstName} ${clientData.lastName}`, // Deal title
        // Populate other data fields using clientData, jobData, serviceLocationData, and scheduledData
    };

    // Use the API token from the environment variables
    const apiToken = process.env.PIPEDRIVE_API_TOKEN;

    // Send a request to the Pipedrive API
    fetch(`https://api.pipedrive.com/v1/deals?api_token=${apiToken}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pipedriveData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Deal created:', data);
        res.send(`Deal created: ${JSON.stringify(data)}`);
        // Additional actions after successful deal creation
    })
    .catch(error => {
        console.error('Error creating deal:', error);
        res.status(500).send('Error creating deal');
        // Error handling
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
