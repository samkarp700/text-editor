import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

const initdb = async () =>
//new db called jate, version 1
  openDB('jate', 1, {
    //add db schema if not already initilized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //new object store for data with key 'id'
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('put to the database', id);

  //create connection to indexeddb
  const jateDb = await openDB('jate', 1);
  //transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  // open desired object store
  const store = tx.objectStore('jate');
  //create .put() method to update specific object in db
  const request = store.add({ content });
  //results
  const result = await request;
    console.log('data saved to database', result);
};
//Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  //create connection
  const jateDb = await openDB('jate', 1);
  //new transaction
  const tx = jateDb.transaction('jate', 'readonly');
  //open up the desired object store
  const store = tx.objectStore('jate');
  //use the .getAll() method
  const request = store.get(1);
  //confirmation of request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
