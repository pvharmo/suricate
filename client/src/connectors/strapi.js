import Strapi from 'strapi-sdk-javascript/build/main';
import { updateDb } from 'db';

const strapi = new Strapi('http://localhost:1337');

const strapiConnector = (query, options) => {
  switch (query) {
  case "getData":
    getData(options);
    break;
  case "insertRecord":
    insertRecord(options);
    break;
  case "modifyData":
    modifyData(options);
    break;
  case "deleteRecord":
    deleteRecord(options);
    break;
  default:

  }
};

const insertRecord = (options) => {
  strapi.createEntry(options.action.get("collection"), options.values);
};

const modifyData = (options) => {
  strapi.updateEntry(options.action.get("collection"), options.values.id, options.values);
};

const deleteRecord = (options) => {
  strapi.deleteEntry(options.action.get("collection"), options.id);
};

const getData = async (options) => {
  let data = await strapi.getEntries(options.collection);
  updateDb(options.collection, data);
};


export default strapiConnector;
