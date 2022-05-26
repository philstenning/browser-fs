# fsa-database

Create collections of files from your local drive for use in the browser.

## Overview

Use fsa-database to recursively scan your local drive for files of a any given extension
save them to the browsers indexDB, then create collections of them for further use within your app.

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

import {FsaDbContextProvider} from "react-fsa-database";

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
___
## Browser Compatibility

The File System Access API is [not available in all browsers](https://caniuse.com/?search=File%20System%20Access%20API) so a fallback is provided for users not using the supported features of API, this works by storing the file with its meta data in the indexDB so we can use it from within the app.

## TypeScript
Fully written with TypeScript

## Contributing

I'm open to all community contributions! If you'd like to contribute in any way, file an issue or pull request.

## License

ISC