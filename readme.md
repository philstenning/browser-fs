# browser-fsa

Browser Fsa is a monorepo of libraries to simplify adding the Browser File System Access API to your app, the libraries abstract over the API to try and give you a more native like experience in the your web browser. 


## fsa-browser

[Details and API](https://philstenning.github.io/browser-fs/api/modules/fsa_browser)

If you just need basic access to to the local file system you can:

 - Check browser compatibility of API
 - Get Directories from you local drives
 - Store reference of Directories in indexDb for later use even after a browser reloads.
 - Scan and rescan recursively for files of any extension type.
 - Excluded list of directories, to help speed up scanning. 


## fsa-database

[Details and API](https://philstenning.github.io/browser-fs/api/modules/fsa_database)

Add the ability to create collections of your files that can be saved back to the local drive.

- Keep collections on your local drives in sync with your browsers database.
- Drag and drop support.
- Support for browsers that don't support the File System Access api.
- Simple state management with history built in using indexDb.
- Add and remove file types from the database.
- Toggle visibility of files by extension/type.
- Add and remove excluded directories to the database.
- Import/export of database (Blob) to local file.

## react-fsa-database

[Details and API](https://philstenning.github.io/browser-fs/api/modules/react_fsa_database)

Wraps fsa-database and adds hooks for simple app creation when using react.

- Uses react context for state management
- Hooks reload data reactively as data is updated in the database.

## Tips using the libraries

The File System Access API requires a user event/action to work, if it throws an error you may or may not see it, this is for security reasons so don't try to attach functions to onload or passive events.

If you find that you keep needing to grant permission to the browser during development because of frequent page reloads, just keep another tab open.


## Browser Compatibility

The File System Access API is [not available in all browsers](https://caniuse.com/?search=File%20System%20Access%20API) so a fallback is provided for users not using the supported features of API using fsa-database and react-fsa-database, this works by storing the file with its meta data in the indexDB so we can use it from within the app.