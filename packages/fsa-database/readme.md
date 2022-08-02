# fsa-database


- [fsa-database](#fsa-database)
  - [Overview](#overview)
  - [Features](#features)
    - [Files and Directories](#files-and-directories)
    - [Collections](#collections)
    - [Flatten Directory structure](#flatten-directory-structure)
    - [Rescan](#rescan)
    - [State Management](#state-management)
    - [Uses Dexie.js](#uses-dexiejs)
  - [Browser Compatibility](#browser-compatibility)
  - [Getting Started](#getting-started)
  - [Getting Started with React](#getting-started-with-react)
    - [Add a Root Directory](#add-a-root-directory)
  - [Options](#options)
  - [Settings](#settings)
  - [TypeScript](#typescript)
  - [Contributing](#contributing)
  - [License](#license)

## Overview
Create collections of files from your local drive for use in the browser.

## Features

### Files and Directories
Use fsa-database to recursively scan your local drive for files of any extension ['.svg', 'gcode', 'jpg'] and save a reference to them in the browsers indexDB, you can then use the files within your app with almost the same ease of use as you would natively. The Files and Directories are then available even after the user closes the browser or reloads the browser window (after regranting permissions)


### Collections

fsa-database has a collections feature that allows you to create a collection, add files to it, then save the collection back to your local drive, these collections on your local drive __can__ then be kept in sync adding and removing files as you update your collection in your app.

### Flatten Directory structure

The directory structure of you fileSystem is retained from the root directory in the database, but you have the ability to flatten it if you wish, and move any directory's content up into their parents directory but also allowing it to be reset to its origin if needed.


### Rescan 

Rescan your directories for files that have been added or removed since your initial scan and automatically remove obsolete files from collections. 

### State Management

Built in state management, if needed, is stored in the database so after page reloads, the state of the app can be quickly restored, this state is also available across browser tabs. 

### Uses Dexie.js
Under the hood fsa-database used [Dexie.js](https://dexie.org/) to store data in the browsers indexDb so all its features are available to you.


___
## Browser Compatibility

The File System Access API is [not available in all browsers](https://caniuse.com/?search=File%20System%20Access%20API) so a fallback is provided for users not using the supported features of API, this works by storing the file with its meta data in the indexDB so we can use it from within the app.



___
## Getting Started

```js
// using npm
npm install fsa-database

// using pnpm
pnpm i fsa-database

// yarn
yarn add fsa-database
```
## Getting Started with React

If you use react [react-fsa-database](/browser-fs/api/modules/react_fsa_database) wraps most of the features of this library but also adds a context provider for state management.

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