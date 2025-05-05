import {registerAskTool} from "@/tools/Ask";
import {registerDescribeDatasetTool} from "@/tools/Metadata";
import {registerQueryTool} from "@/tools/Query";
import {registerSearchTool} from "@/tools/Search";
import {makeLog} from "@/Utils";
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";


/**
 * Creates and configures an MCP server to interact with the HyperArc API.
 * 
 * @returns The configured McpServer instance
 */
const createHyperArcServer = (
    // HyperArc API host URL
    apiHost: string, 
    // The personal access token for authenticating with HyperArc API
    accessToken: string
): McpServer => {
    // Create a new MCP server
    const server = new McpServer({
        name: "HyperArc",
        version: "1.0.0",
        description: "MCP server for HyperArc data and analytics."
    });

    registerAskTool(server, apiHost, accessToken);
    registerSearchTool(server, apiHost, accessToken);
    registerDescribeDatasetTool(server, apiHost, accessToken);
    registerQueryTool(server, apiHost, accessToken);

    return server;
}


// Entry point for the MCP server
export const main = async () => {
    try {
        // Get access token from environment variable or command line argument
        const accessToken = process.env.HYPERARC_TOKEN || process.argv[2];

        if (!accessToken) {
            console.error(makeLog("Error: No access token provided. Please set HYPERARC_TOKEN environment variable or pass as first argument."));
            process.exit(1);
        }

        const apiHost = process.env.HYPERARC_API_HOST || "https://api.hyperarc.com";

        // Create server with access token
        const server = createHyperArcServer(apiHost, accessToken);

        // Set up stdio transport
        const transport = new StdioServerTransport();

        // Connect server to transport
        await server.connect(transport);

        // Log that we're ready (this won't be visible to MCP clients)
        console.error(makeLog("HyperArc MCP server started and ready to receive messages."));
    } catch (error) {
        console.error(makeLog(`Failed to start MCP server: ${error}.`));
        process.exit(1);
    }
};