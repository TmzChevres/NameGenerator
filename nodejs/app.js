/*// load libraries
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

*/

// // load chatGPT
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

(async () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const history = [];

  while (true) {
    const user_input = "Your input goes here";

    const messages = [];
    for (const [input_text, completion_text] of history) {
      messages.push({ role: "user", content: input_text });
      messages.push({ role: "assistant", content: completion_text });
    }

    messages.push({ role: "user", content: user_input });

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });

      const completion_text = completion.data.choices[0].message.content;
      console.log(completion_text);

      history.push([user_input, completion_text]);

      const user_input_again = "N"; // Enter 'Y' or 'N' here
      if (user_input_again.toUpperCase() === "N") {
        return;
      } else if (user_input_again.toUpperCase() !== "Y") {
        console.log("Invalid input. Please enter 'Y' or 'N'.");
        return;
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  }
})();
