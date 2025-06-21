import { createMcpHandler } from "@vercel/mcp-adapter";

// const tflApiUrl = "https://api.tfl.gov.uk";
// const TFL_APP_KEY = `${process.env.TFL_APP_KEY}`;

const handler = createMcpHandler(server => {
    server.tool(
        'getJourney',
        'Get public transport route using TFL API',
        {
            from: { query: 'string' },
        },
        ({ query }) => {
            const summary = `Journey from ${query} is 10 minutes.`;

            return {
                content: [
                    {
                        type: "text",
                        text: summary
                    }
                ]
            };
        }
    );
}, {
    capabilities: {
        tools: {
            getJourney: {
                description: 'Get public transport route using TFL API',
            }
        }
    }
}, {
    redisUrl: process.env.REDIS_URL,
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 58,
});

export { handler as GET, handler as POST };
