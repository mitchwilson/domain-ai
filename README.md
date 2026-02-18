# Domain-AI

Proof-of-concept starting exammple project of constraining AI responses to a related domain. The demo allows selecting a domain and asking a question. The default domain is "Austin, TX". The other two domain choides are "Tokyo, Japan" or "Mars".

The problem solved here is helping users can better answers faster when using AI. The issue is one or both of the following: 1) the user does not know how to better tailor their questions; or 2) they don't have the time -- figuring out all the exact questions to ask before asking your real questions can be time consuming and error prone. Why not prime the system with expert pre-questions to get AI on track?

I imagine the next steps would be to create an expert system where the user would answer questions and server would refine the request to AI to get a better answer and the UI would present a more tailored AI response and some additional next steps.

## Running the demo

![App Screenshot](domain-ai-ui.png)

- Clone the repo locally
<<<<<<< HEAD
- Set the test API key (which is read-only) locally so it is an environmental variable. On Mac, for example, open a terminal and copy this: ```sh
export OPENAI_API_KEY=<TEST_API_KEY>
=======
- Set the test API key (which is read-only) locally so it is an environmental variable. On Mac, for example, open a terminal and copy this: 
```sh
export OPENAI_API_KEY=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
>>>>>>> f388cec (feat: update README with complete instructions and add a photo of UI)
```
- npm install
- npm run dev (this starts the server and the client)
- Open http://localhost:5173/ in your browser.

## Stopping the demo

- Control + C in the terminal running the server and client

## Tech stack

The client is written using React and TypeScript.

The server is written using Node.js and JavaScript. 

The AI used is the OpenAI API on the server.

The OpenAI API key is stored locally on your computer running the demo using the test API key shown above.