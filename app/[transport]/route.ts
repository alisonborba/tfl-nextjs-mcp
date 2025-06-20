import { createMcpHandler } from "@vercel/mcp-adapter";

// const tflApiUrl = "https://api.tfl.gov.uk";
// const TFL_APP_KEY = `${process.env.TFL_APP_KEY}`;

const handler = createMcpHandler(server => {
    server.tool(
        'getJourney',
        'Get public transport route using TFL API',
        {
            from: { type: 'string' },
            to: { type: 'string' }
        },
        ({ from, to }) => {
            const summary = `Journey from ${from} to ${to} is 69 minutes.`;

            return {
                content: [
                    {
                        type: "text",
                        text: summary
                    }
                ]
            };
            // async ({ from, to }) => {
            //     const res = await fetch(`${tflApiUrl}/Journey/JourneyResults/${from}/to/${to}`);
            //     const data: any = await res.json();
            //     return { journeys: Array.isArray(data?.journeys) ? data.journeys : [] };
            // }
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
