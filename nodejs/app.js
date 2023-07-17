// load libraries
const express = require('express');
const app = express();
const fs = require('fs');
const port = 5623;

// Read in the contents of the secure.json file
const secureData = fs.readFileSync('secure.json');
const secure = JSON.parse(secureData);

// sets express to listen on local port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// test to make sure it is working
// connect with /nodejs/test
app.get('/test', (req, res) => {
    res.send('Hello World!');
});




// load chatGPT
const openai = require('openai').default;

// Set up your OpenAI API credentials
const openaiAPIKey = secure.APIKey;
const chatgpt = new openai(openaiAPIKey);

// Define the parameters for your chat conversation
const params = {
    messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Who won the world series in 2020?' },
        { role: 'assistant', content: 'The Los Angeles Dodgers won the World Series in 2020.' },
        { role: 'user', content: 'Where was it played?' },
        { role: 'assistant', content: 'The games were played in Arlington, Texas.' }
    ]
};

// Make the API call
chatgpt.complete(params)
    .then(response => {
        const { choices } = response.data;
        const reply = choices[0].message.content;
        console.log('ChatGPT Reply:', reply);
    })
    .catch(error => {
        console.error('Error:', error);
    });