import Strapi from 'strapi-sdk-javascript/build/main';
import { updateDb } from 'db';

const strapi = new Strapi('http://localhost:1337');

const strapiConnector = (query, options) => {
  switch (query) {
  case "getData":
    getData(options);
    break;
  case "insertData":
    insertData(options);
    break;
  default:

  }
};

const insertData = (options) => {
  strapi.request('post', '/' + options.collection, {
    data: options.values
  });
};

const getData = async (options) => {
  let data = await strapi.getEntries(options.collection);
  updateDb(options.collection, data);
};


export default strapiConnector;
