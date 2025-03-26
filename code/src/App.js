// Filename: App.js

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const fetchAIResponse = async () => {
    const res = await fetch("http://localhost:8000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gen AI Platform</h1>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Enter your prompt..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button className="mt-2" onClick={fetchAIResponse}>
        Generate
      </Button>
      {response && (
        <Card className="mt-4">
          <CardContent>
            <p>{response}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
