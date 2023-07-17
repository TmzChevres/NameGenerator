// this should be at the top of app.js
const express = require('express');
const app = express();
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
    res.send('Hello World! ' + secure.APIKey);
});
