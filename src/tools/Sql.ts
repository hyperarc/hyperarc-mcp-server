import {McpServer} from "@modelcontextprotocol/sdk/server/mcp";
import {CallToolResult} from "@modelcontextprotocol/sdk/types";
import {makeRequest} from "@/Utils";
import {z} from "zod";

export const registerSqlTool = (server: McpServer, apiHost: string, accessToken: string) => {
    server.tool(
        "hyperarc_sql",
        "Run a sql query through HyperArc.",
        {
            query: z.string().describe("SQL query to execute on HyperArc."),
        },
        async ({ query }): Promise<CallToolResult> => {
            const url = new URL("/api/v1/query", apiHost);

            return makeRequest(url, accessToken, "POST", {
                query: query
            });
        }
    );
}