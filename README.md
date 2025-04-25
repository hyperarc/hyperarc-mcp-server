# HyperArc MCP Server
Give your favorite agent access to your HyperArc memories and assets.

## Usage
- Clone the repository and run npm install
- Get a Hyperarc Personal Access Token
    - Once you've logged in to https://app.hyperarc.com and created your account, go to htttps://api.hyperarc.com and log in
    - Enter a name for your token, and click "Generate Api Token" which will download a credentials.json file
    - Copy the value of the `token` field in credentials.json

### Claude Desktop
```json
{
    "mcpServers": {
        "hyperarc": {
            "command": "npm",
            "args": [
                "start",
                "--silent",
                "--prefix",
                "/mnt/workspace/users/zuyezheng/dev/hyperarc/hyperarc-mcp-server"
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
                "command": "npm",
                "args": [
                    "start", "--prefix", "<path to hyperarc-mcp-server>/hyperarc-mcp-server"
                ],
                "env": {
                    "HYPERARC_TOKEN": "${input:hyperarc-token}"
                }
            }
        }
    }
}
```

### Build
* `export HYPERARC_TOKEN=<token value>`
* Run the server via `npm start` (or the MCP Inspector via `npm run inspect`)