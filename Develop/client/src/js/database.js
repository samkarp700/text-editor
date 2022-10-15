import { openDB } from 'idb';
import 'regenerator-runtime/runtime';

export const initdb = async () =>
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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
