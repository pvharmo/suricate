
const view = {
  authors: {
    name: "authors",
    modules: [
      {
        name: "listTable",
        type: "table",
        label: "List of books",
        page: 0,
        rowsPerPage: 5,
        selected: [],
        allSelected: 0,
        order: "asc",
        orderBy: "",
        collection: "books",
        httpServer: "http://localhost:1337/",
        options: { print: false, download: false, selectableRows: false},
        columns: [
          {name: "name", label: "Nom", numeric: false},
          {name: "price", label: "Prix", numeric: true}
        ]
      }
    ],
    dialogs: [
      {
        name: "new-book",
        open: false,
        title: "Nouveau livre",
        modules: [
          {
            name: "new-book",
            type: "form",
            label: "Nouveau livre",
            onSubmit: [
              {
                action: "insertData",
                collection: "books",
                httpServer: "http://localhost:1337/",
              },
              {
                action: "closeDialog", dialog: "new-book"
              }
            ],
            fields: [
              {name: "name", label: "Nom", type: "text", width:{xs: 8}},
              {name: "price", label: "Prix", type: "number", width:{xs: 4}},
              {name: "submit", label: "Enregistrer", type: "submit", width: {xs:4}}
            ]
          }
        ]
      },
      {
        name: "edit-book",
        open: false,
        title: "Éditer le livre",
        modules: [
          {
            name: "edit-book",
            type: "form",
            label: "Modifier le livre",
            onSubmit: [{action: "modifyData", options: {
              collection: "books"
            }}, {action: "toggleDialog", dialog: "edit-book"}],
            fields: [
              {name: "name", label: "Nom", type: "text", width:{xs: 8}},
              {name: "price", label: "Prix", type: "number", width:{xs: 4}},
              {name: "submit", label: "Enregistrer", type: "submit", width: {xs:4}}
            ]
          }
        ]
      }
    ],
    actionButton: [{
      action: "openDialog",
      dialog: "new-book"
    }]
  },
  settings: {
    collections: ["books"]
  }
};

export default view;
