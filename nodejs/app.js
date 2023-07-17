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




// // load chatGPT
// const openai = require('openai').default;

// // Set up your OpenAI API credentials
// const openaiAPIKey = secure.APIKey;
// const chatgpt = new openai(openaiAPIKey);

const { Configuration, OpenAIApi } = require('openai');;
const configuration = new Configuration({
    organization: "org-vcr7rrSPfrXSfF25zYsJuF5N",
    apiKey: secure.APIKey,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();
