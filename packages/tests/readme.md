# Template for vite and open-props

When using pmpm workspaces, add your own components to your package.json

```json
{
    "components": "workspace:components"
}
```

```bash
// install all dependencies
pnpm i

// run the dev server
pnpm dev

// build 
pnpm build
```

TODO: add a file (.excludedFolders) with a list of excluded folder names to prevent unnecessary scanning of folders that do not need to be scanned.