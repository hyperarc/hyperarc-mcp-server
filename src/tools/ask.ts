import { McpServer } from "@modelcontextprotocol/sdk/server/mcp";
import { z } from "zod";

export const registerAskTool = (server: McpServer, apiHost: string, accessToken: string) => {
    server.tool(
        "ask",
        "Ask HyperArc a question",
        {
            query: z.string().describe("The question to ask HyperArc"),
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
}