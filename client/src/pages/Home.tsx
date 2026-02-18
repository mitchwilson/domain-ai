import { useState } from 'react';

export default function Home() {
  const [output, setOutput] = useState<string>("");
  const [message, setMessage] = useState<string>("Recommend a good tourist attraction");
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<string>("Austin, TX");

  const handleSelectButton = () => {
    setOutput(`Selected: ${selectedOption}`);
  };

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
        body: JSON.stringify({ question: message + selectedOption }),

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
      <h1>Domain-AI Client</h1>
      <p>Click the button below to send a request to the OpenAI server.</p>
      
      
      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleClick} disabled={loading}>
          Test server connection
        </button>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          disabled={loading}
          style={{ padding: "0.5rem", minWidth: "120px" }}
        >
          <option value="in Austin, TX<">Austin, TX</option>
          <option value="in Tokyo, Japan">Tokyo, Japan</option>
          <option value="on Mars">Mars</option>
        </select>
        <button
          onClick={handleSelectButton}
          disabled={loading}
          style={{ marginLeft: "0.5rem" }}
        >
          Select domain
        </button>
      </div>
      <div style={{ marginTop: "1rem" }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
