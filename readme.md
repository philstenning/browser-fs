# browser-fsa

Browser Fsa is a monorepo of libraries to simplify adding the Browser File System Access api to your app. It abstracts over the api to try and give you a near native 
experience in the you web browser. 


## fsa-browser

[Details and API](/browser-fs/modules/fsa_browser.html)

If you just need basic access to to the local file system you can:

 - Check browser compatibility of api
 - Get Directories from you local drives
 - store reference of Directories in indexDb for later use even after a browser reload.
 - Scan and rescan recursively for files of any extension type.
 - Excluded list of directories, to help speed up scanning. 


## fsa-database

[Details and API](/browser-fs/modules/fsa_database.html)

Add the ability to create collections of your files that can be saved back to the local drive.

- Keep collections on your local drives in sync with your browsers database.
- Drag and drop support.
- Support for browsers that don't support the File System Access api.
- Simple state management with history built in using indexDb.
- Add and remove file types from the database
- Toggle visibility of files by type
- Add and remove excluded directories to the database
- import/export of database (Blob) to local file.

## react-fsa-database

[Details and API](/browser-fs/modules/react_fsa_database.html)

Wraps fsa-database and adds hooks for simple app creation when using react.

- Uses react context for state management
- Hooks reload data reactively as data is updated in the database.

## Tips using the libraries

The File System Access Api requires a user event/action to work, if it throws an error you may or may not see them, this is for security reasons so don't try to attach functions to onload or passive events.

If you find that you keep needing to grant permission to the browser because you keep 
refreshing the browser during development, just keep another tab open.


## Browser Compatibility

The File System Access API is [not available in all browsers](https://caniuse.com/?search=File%20System%20Access%20API) so a fallback is provided for users not using the supported features of API using fsa-database and react-fsa-database, this works by storing the file with its meta data in the indexDB so we can use it from within the app.