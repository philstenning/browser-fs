# react-fsa-database

- [react-fsa-database](#react-fsa-database)
  - [Overview](#overview)
  - [Features](#features)
    - [Hooks](#hooks)
    - [State Management](#state-management)
  - [Getting Started](#getting-started)
    - [Install](#install)
    - [Add context provider to your app](#add-context-provider-to-your-app)
    - [Add a Root Directory](#add-a-root-directory)
    - [List Files](#list-files)
    - [Add Collection](#add-collection)
    - [Add File to collection](#add-file-to-collection)
  - [Options](#options)
  - [Settings](#settings)
  - [TypeScript](#typescript)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

Most of the features of fsa-database wrapped with hooks for easy, clean component creation.

## Features

### Hooks
Hooks take care or reloading your data reactively in your components 

### State Management

Uses React Context for state management 


## Getting Started

### Install

```js
// using npm
npm install @philstenning/fsa-database

// using pnpm
pnpm i @philstenning/fsa-database

// yarn
yarn add @philstenning/fsa-database
```

### Add context provider to your app

```tsx
// app.tsx
// file extensions can be either '.md' or 'md'
import { FsaDbContextProvider } from '@philstenning/react-fsa-database'

function App() {
  return (
    <FsaDbContextProvider fileExtensionsForApp={['.txt', '.md', 'svg']}>
      <YourApp></YourApp>
    </FsaDbContextProvider>
  )
}

export default App
```

### Add a Root Directory

```tsx
// TODO
```

### List Files

```tsx
// TODO
```

### Add Collection

```tsx
// TODO
```

### Add File to collection

```tsx
// TODO
```

---

## Options

```ts
// list of folders that are not scanned.
excludedFolders: string[]  = [
  "node_modules",
  "programFiles",
  "junk",
  ".git",
  ".changeset",
  "bin",
  "__pycache__",
]


```

```ts
// list of extensions to scan for
fileTypes: string[] = ['jpg','png','gif']

```

```ts
// How deep you want to scan
maxDepth: number = 10
```

## Settings

```ts
fsaSetting {
  id?: number

  // set internally when browser session starts
  sessionStarted: number

  // when files are removed from a collection,
  // or a collection is deleted
  // removed files  from local disk also
  cleanUpFiles: boolean

  // when a file is added to collection
  // save to disk
  autoSaveCollections: boolean

  scanInterval: number // default is 0 or none.

  // time the user last scanned for file changes.
  lastScanned: number

  // when adding with drag and drop whether
  // to add files to a new folder
  allowDndFiles: boolean

  // When resetting db retain all root Directories.
  retainRootDirectoriesOnReset: boolean;

}
```

## TypeScript

Fully written with TypeScript

## Contributing

I'm open to all community contributions! If you'd like to contribute in any way, file an issue or pull request.

## License

ISC
