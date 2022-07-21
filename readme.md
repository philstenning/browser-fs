# fsa-database

Create collections of files from your local drive for use in the browser.

## Overview

Use fsa-database to recursively scan your local drive for files of a any given extension and save them to the browsers indexDB, then create collections from them for further use within your app

### Concepts 


___

- [fsa-database](#fsa-database)
  - [Overview](#overview)
    - [Concepts](#concepts)
  - [Getting Stated](#getting-stated)
  - [Getting Stated with React](#getting-stated-with-react)
    - [Add a Root Directory](#add-a-root-directory)
  - [Features](#features)
    - [Files and Directories](#files-and-directories)
    - [Collections](#collections)
    - [State](#state)
  - [Browser Compatibility](#browser-compatibility)
  - [Options](#options)
  - [Settings](#settings)
  - [TypeScript](#typescript)
  - [Contributing](#contributing)
  - [License](#license)

This is a monorepo containing the following packages / projects:

1. fsa-browser - base package this will be removed and all the necessary bits added to fsa-database for version 1.0.0
2. fsa-database  
3. react-fsa-database - wrapper for using with react
4. web - vitejs frontend for testing
5. docs - wip.
___
## Getting Stated

```js
// using pnp
npm install fsa-database

// using pnpm
pnpm i fsa-database

// yarn
yarn add fsa-database
```
## Getting Stated with React

```js
pnpm i fsa-database react-fsa-database
```

Add context provider to your app
```tsx
// app.tsx
// file extensions can be either '.md' or 'md'

import {FsaDbContextProvider} from "@philstenning/react-fsa-database";

function App() {
  return (
    <FsaDbContextProvider  
     fileExtensionsForApp={['.txt','.md','svg']}>
      <YourApp>
    
      </YourApp>
    </FsaDbContextProvider>
  );
}

export default App; 



```
### Add a Root Directory

```tsx

```


## Features

### Files and Directories

fsa-database uses the File System Access API to scan a local drive for files with a given array of extensions ['.jpg', '.png','.gif']  and returns a list of of directories with their files that are stored in the indexDb for use within your app. These Files and Directories are then available even after the user closes the browser or reloads the browser window (after regranting permissions)

### Collections

The user can create collections and then add/remove any file  from the database to it, then save the whole collection back to almost any location on their local drive. Collections once saved for the first time, can then be updated/deleted in a similar manner that you would have in a regular native app. 

### State

Built in state management, if needed, is stored in the database so after page reloads, the state of the app can be quickly restored, this state is also available across browser tabs. 
___
## Browser Compatibility

The File System Access API is [not available in all browsers](https://caniuse.com/?search=File%20System%20Access%20API) so a fallback is provided for users not using the supported features of API, this works by storing the file with its meta data in the indexDB so we can use it from within the app.

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