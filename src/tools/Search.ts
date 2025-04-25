import {McpServer} from "@modelcontextprotocol/sdk/server/mcp";
import {z} from "zod";
import {makeLog, makeRequest} from "../Utils";
import {CallToolResult} from "@modelcontextprotocol/sdk/types";

export const registerSearchTool = (server: McpServer, apiHost: string, accessToken: string) => {
    server.tool(
        "hyperarc_search",
        "Search HyperArc for existing memories about your analytics.",
        {
            query: z.string().describe("Search for existing memories in natural language."),
            includePublic: z.boolean().describe("Search for memories only in your organizations, or include public memories across all users."),
        },
        async ({ query, includePublic }): Promise<CallToolResult> => {
            const url = new URL("/api/v1/search/hypergraph", apiHost);
            url.searchParams.append("query", query);
            url.searchParams.append("includePublic", String(includePublic));
            url.searchParams.append("size", "5");

            return makeRequest(url, accessToken);
        }
    );
}