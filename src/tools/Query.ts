import {McpServer} from "@modelcontextprotocol/sdk/server/mcp";
import {CallToolResult} from "@modelcontextprotocol/sdk/types";
import {makeRequest} from "@/Utils";
import {z} from "zod";

export const registerQueryTool = (server: McpServer, apiHost: string, accessToken: string) => {
    server.tool(
        "hyperarc_query",
        "Run a sql query through HyperArc.",
        {
            query: z.string().describe("Question about your data or how your team does analytics."),
        },
        async ({ query }): Promise<CallToolResult> => {
            const url = new URL("/api/v1/query", apiHost);

            return makeRequest(url, accessToken, "POST", {
                query: query
            });
        }
    );
}