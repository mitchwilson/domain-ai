

import { useState } from 'react';

export default function Home() {
  const [output, setOutput] = useState<string>("");
  const [message, setMessage] = useState<string>("What is the capital of Texas?");
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);
    setOutput("Loading...");
    try {
      const res = await fetch("http://localhost:3000/test");
      const data = await res.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      setOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async () => {
    setLoading(true);
    setOutput("Loading...");
    try {
      const res = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message }),

      });
      const data = await res.json();
      setOutput(JSON.stringify(data, null, 2));
    } catch (err) {
      setOutput(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>Test OpenAI Server</h1>
      <p>Click the button below to send a request to the OpenAI server.</p>
      
      <button onClick={handleClick} disabled={loading}>
        Test server connection
      </button>
      <div style={{ marginTop: "1rem" }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What is the capital of Texas?"
          disabled={loading}
          style={{ padding: "0.5rem", width: "300px", height: "100px" }}
        />
        <br/>
        <button onClick={handleAsk} disabled={loading} style={{ marginLeft: "0.5rem", verticalAlign: "top" }}>
          Ask a question
        </button>
      </div>
      <pre>{output}</pre>
    </section>
  );
}
