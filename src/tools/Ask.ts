import {McpServer} from "@modelcontextprotocol/sdk/server/mcp";
import {CallToolResult} from "@modelcontextprotocol/sdk/types";
import {makeRequest} from "@/Utils";
import {z} from "zod";

export const registerAskTool = (server: McpServer, apiHost: string, accessToken: string) => {
    server.tool(
        "hyperarc_ask",
        "Ask HyperArc a question about your data and analytics.",
        {
            query: z.string().describe("Question about your data or how your team does analytics."),
        },
        async ({ query }): Promise<CallToolResult> => {
            const url = new URL("/api/v1/hypergraph/ask", apiHost);
            url.searchParams.append("query", query);
            url.searchParams.append("useWebSearchResults", "false");

            return makeRequest(url, accessToken);
        }
    );
}