import strapiConnector from 'connectors/strapi';

const connection = "strapi";

export default function query(query, options) {
  switch (connection) {
  case "strapi":
    return strapiConnector(query, options);
  default:

  }
}
