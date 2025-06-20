import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const origin = process.argv[2] || "https://tfl-nextjs-mcp.vercel.app";

async function main() {
  const transport = new SSEClientTransport(new URL(`${origin}/sse`));

  const client = new Client(
    {
      name: "example-client",
      version: "1.0.0",
    },
    {
      capabilities: {
        prompts: {},
        resources: {},
        tools: {},
      },
    }
  );


  await client.connect(transport);

  console.log("Connected", client.getServerCapabilities());

  const result = await client.listTools();
  console.log(JSON.stringify(result, null, 2));


  // const response = await client.callTool({
  //   name: "getJourney",
  //   arguments: {
  //     from: "9400ZZLUACT",
  //     to: "9400ZZLUKSX",
  //   },
  // });
  // console.log("getJourney result:", response);
}

main();