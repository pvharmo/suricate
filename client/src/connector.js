import strapiConnector from 'connectors/strapi';

const connection = "strapi";

export default function query(query, options) {
  switch (connection) {
  case "strapi":
    strapiConnector(query, options);
    break;
  default:

  }
}
