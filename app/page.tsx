// app/page.tsx
'use client';

import { useState } from 'react';
// import { useCompletion } from '@ai-sdk/react';

export default function HomePage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    console.log('handleSubmit', `${from} to ${to}`);

    try {
      const classifyResponse = await fetch('/api/classify-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ query: `${from} to ${to}` })
        body: JSON.stringify({ query })
      });
      const data = await classifyResponse.json();
      console.log('data', data);

      // const gptResponse = await fetch('/api/query-mcp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ from, to })
      // });

      // const data = await gptResponse.json();
      setResponse(data);
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">London Journey Planner (MCP + GPT)</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
          placeholder="..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          placeholder="From (e.g. Acton Town)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          placeholder="To (e.g. King's Cross)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border rounded px-3 py-2"
        />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? 'Planning...' : 'Plan Journey'}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 rounded">
          <h2 className="font-semibold mb-2">Response:</h2>
          <pre className="text-sm overflow-auto ">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}