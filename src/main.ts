import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

/**
 * Creates and configures an MCP server to interact with the Hyperarc API.
 * @param accessToken The personal access token for authenticating with Hyperarc API
 * @returns The configured McpServer instance
 */
function createHyperarcServer(apiHost: string, accessToken: string) {
  // Create a new MCP server
  const server = new McpServer({
    name: "Hyperarc API",
    version: "1.0.0",
    description: "MCP server for accessing the Hyperarc hypergraph API"
  });

  // Add the "ask" tool that calls Hyperarc's hypergraph ask endpoint
  server.tool(
    "ask",
    {
      query: z.string().describe("The query to send to the Hyperarc hypergraph"),
      useWebSearchResults: z.boolean().optional().describe("Whether to include web search results in the response")
    },
    async ({ query, useWebSearchResults }) => {
      try {
        // Create URL with query parameter
        const url = new URL("/api/v1/hypergraph/ask", apiHost);
        url.searchParams.append("query", query);
        if (useWebSearchResults) {
          url.searchParams.append("useWebSearchResults", "true");
        }

        console.error(`Making request to: ${url.toString()}`);

        // Make the API request with authorization header
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Authorization": `Token ${accessToken}`,
            "Accept": "application/json"
          }
        });

        // Handle response
        if (!response.ok) {
          const errorText = await response.text();
          return {
            content: [{ 
              type: "text", 
              text: `Error: ${response.status} ${response.statusText}\n${errorText}` 
            }],
            isError: true
          };
        }

        // Parse and return successful response
        const data = await response.json();
        return {
          content: [{ 
            type: "text", 
            text: JSON.stringify(data, null, 2) 
          }]
        };
      } catch (error) {
        // Handle any network or processing errors
        return {
          content: [{ 
            type: "text", 
            text: `Error occurred: ${error instanceof Error ? error.message : String(error)}` 
          }],
          isError: true
        };
      }
    }
  );

  return server;
}

// Entry point for the MCP server
async function main() {
  try {
    // Get access token from environment variable or command line argument
    const accessToken = process.env.HYPERARC_TOKEN || process.argv[2];
    
    if (!accessToken) {
      console.error("Error: No access token provided. Please set HYPERARC_TOKEN environment variable or pass as first argument.");
      process.exit(1);
    }

    const apiHost = process.env.HYPERARC_API_HOST || "https://api.hyperarc.com";

    // Create server with access token
    const server = createHyperarcServer(apiHost, accessToken);
    
    // Set up stdio transport
    const transport = new StdioServerTransport();
    
    // Connect server to transport
    await server.connect(transport);
    
    // Log that we're ready (this won't be visible to MCP clients)
    console.error("Hyperarc MCP server started and ready to receive messages");
  } catch (error) {
    console.error("Failed to start MCP server:", error);
    process.exit(1);
  }
}

// Start the server
main();