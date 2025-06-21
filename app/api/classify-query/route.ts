import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
    const body = await req.json();
    const { query } = body;

    console.info('POST /api/classify-query query', query);

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content:
                        `You are a tool router. You must choose between 3 tools: "getJourney", "add", and "search".
                        Return a JSON object with tool name and parameters.
                        Examples:
                        Input: "I want to go from A to B"
                        → {"tool": "getJourney", "args": {"from": "A", "to": "B"}}
                        Input: "add 2 and 3"
                        → {"tool": "add", "args": {"a": 2, "b": 3}}
                        Otherwise:
                        → {"tool": "search", "args": {"query": "original query"}}
                        Only output the JSON object. No explanation. No markdown.`,
                },
                { role: 'user', content: query },
            ],
            temperature: 0,
        });

        const output = completion.choices[0].message?.content;

        if (!output) throw new Error('No response content from GPT');

        const parsed = JSON.parse(output);

        return NextResponse.json(parsed);
    } catch (error) {
        console.error('OpenAI classification error:', error);
        return NextResponse.json({ error: 'Failed to classify input' }, { status: 500 });
    }
}