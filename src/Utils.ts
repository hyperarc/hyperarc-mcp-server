import {CallToolResult} from "@modelcontextprotocol/sdk/types";

export const makeLog = (message: string): string => {
    return JSON.stringify({
        jsonrpc: "2.0",
        method: "log",
        params: {message},
    });
};

export const makeErrorResponse = (message: string): CallToolResult => {
    return {
        content: [{ 
            type: "text", 
            text: `Error: ${message}` 
        }],
        isError: true
    }
};

export const makeRequest = async (
    url: URL,
    accessToken: string
): Promise<CallToolResult> => {
    try {
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
            return makeErrorResponse(`${response.status} ${response.statusText}: ${errorText}`);
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
        return makeErrorResponse(error instanceof Error ? error.message : String(error));
    }
}