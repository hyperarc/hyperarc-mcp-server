# HyperArc MCP Server
Give your favorite agent access to your HyperArc memories and assets.

## Usage
- Get a Hyperarc Personal Access Token.
- Login to [HyperArc](https://app.hyperarc.com).
- Go [here](https://api.hyperarc.com) to generate a token.

### Claude Desktop
```json
{
    "mcpServers": {
        "hyperarc": {
            "command": "npx",
            "args": [
                "-y", 
                "hyperarc-mcp-server"
            ],
            "env": {
                "HYPERARC_TOKEN": "hyperarc_your_token"
            }
        }
    }
}
```

### VS Code
```json
{
    "mcp": {
        "inputs": [
            {
                "type": "promptString",
                "id": "hyperarc-token",
                "description": "HyperArc Personal Access Token",
                "password": true
            }
        ],
        "servers": {
            "hyperarc-mcp-server": {
                "type": "stdio",
                "command": "npx",
                "args": [
                    "-y", 
                    "hyperarc-mcp-server"
                ],
                "env": {
                    "HYPERARC_TOKEN": "${input:hyperarc-token}"
                }
            }
        }
    }
}
```

### Standalone
* Clone the repo and run `run npm install`.
* `export HYPERARC_TOKEN=<token value>`
* Run the server via `npm start` (or the MCP Inspector via `npm run inspect`).


### Build
```
npm run build && npm pack
npm publish
```