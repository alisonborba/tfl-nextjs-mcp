import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { from, to } = await req.json();

    const body = {
        jsonrpc: "2.0",
        id: 1,
        method: "callTool",
        params: {
            name: "getJourney",
            arguments: { from, to }
        }
    };

    const res = await fetch('https://tfl-nextjs-mcp.vercel.app/mcp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/event-stream'
        },
        body: JSON.stringify(body)
    });

    const result = await res.json();

    if (result?.result?.content?.[0]?.text) {
        return NextResponse.json({ journey: result.result.content[0].text });
    }
    return NextResponse.json(result);
}