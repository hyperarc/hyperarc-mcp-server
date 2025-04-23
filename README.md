# hyperarc-mcp-server

## Usage
* Clone the repository and run npm install
* Get a Hyperarc Personal Access Token
* `export HYPERARC_TOKEN=<token value>`
* Run the server via `npm start` (or the MCP Inspector via `npm run inspect`)

To use in VS Code, add the following MCP server configuration:
```
"inputs": [
    {
        "type": "promptString",
        "id": "hyperarc-token",
        "description": "Hyperarc Personal Access Token",
        "password": true
    }
],
"servers": {
    "hyperarc-mcp-server": {
        "type": "stdio",
        "command": "npm",
        "args": [
            "start", "--prefix", "<path to hyperarc-mcp-server>/hyperarc-mcp-server"
        ],
        "env": {
            "HYPERARC_TOKEN": "${input:hyperarc-token}"
        }
    }
}
```