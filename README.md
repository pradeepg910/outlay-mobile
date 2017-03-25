outlay

To create ionic app:
ionic start <<app-name>> --v2

Start Server:
ionic server

Build and emulate Android/Ios
ionic build <<android/ios>>
ionic emulate <<android/ios>>

Pouch DB:

To install SQLite Plugin 2 execute the following command in your Ionic app directory:

$ ionic plugin add cordova-plugin-sqlite-2
Next, we'll install PouchDB and the PouchDB SQLite adapter.

$ npm install pouchdb pouchdb-adapter-cordova-sqlite --save
