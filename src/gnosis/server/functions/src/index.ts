import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// @see https://github.com/firebase/functions-samples

// In reality this would be named `setTaskPerformed`
export const onAddAction = functions.database
  .ref('/actions/{actionIndex}')
  .onWrite((change, context) => {
    // tslint:disable-next-line:no-console
    console.log('change', change);
    // Only edit data when it is first created.
    if (change.before.exists()) {
      return null;
    }
    // Exit when the data is deleted.
    if (!change.after.exists()) {
      return null;
    }
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting a sibling in the Realtime Database returns a Promise.
    return change.after.ref.child('isPerformed').set(true);
  });
