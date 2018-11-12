import Dexie from 'dexie';
import 'dexie-observable' ;

var db = new Dexie("Database");
db.version(1).stores({
  data: "id",
  books: "id"
});

db.version(2).stores({});

export const updateDb = (collection, items) => {
  db.transaction('rw', db[collection], () => {
    db[collection].clear();
    for (const item of items) {
      db[collection].put(item);
    }
  }).catch(function (e) {
    console.error(e);
  });
};

Dexie.Observable.createUUID();

export default db;
