import {makeErrorResponse, makeRequest} from "@/Utils";
import {McpServer} from "@modelcontextprotocol/sdk/server/mcp";
import {CallToolResult} from "@modelcontextprotocol/sdk/types";
import {z} from "zod";

export const registerDescribeDatasetTool = (server: McpServer, apiHost: string, accessToken: string) => {
    server.tool(
        "hyperarc_describe_dataset",
        "Describe an existing HyperArc dataset by its 4 part fully qualified name.",
        {
            fqn: z.string().describe("Fully qualified name of the dataset in the form `<organization>/<project>/dataset_v2/<dataset_name>`."),
        },
        async ({ fqn }): Promise<CallToolResult> => {
            // parse the fqn and make sure there are 4 parts with part 3 being "dataset_v2"
            const parts = fqn.split("/");
            if (parts.length !== 4 || parts[2] !== "dataset_v2") {
                return makeErrorResponse(`Invalid FQN format '${fqn}', expected format is <organization>/<project>/dataset_v2/<dataset_name>.`);
            }

            const url = new URL(
                `/api/v1/accounts/${parts[0]}/folders/${parts[1]}/datasets_v2/${parts[3]}/describe`, 
                apiHost
            );

            return makeRequest(url, accessToken);
        }
    );
}