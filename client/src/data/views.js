
const view = {
  login: {
    name: "login",
    template: "login",
    modules: [
      {
        name: "login",
        type: "form",
        label: "Connection",
        onSubmit: [{action: "LOGIN"}],
        fields: [
          {name: "username", label: "Nom d'utilisateur", type: "text", width: {xs:12}},
          {name: "password", label: "Mot de passe", type: "password", width: {xs:12}},
          {name: "submit", type: "submit", label: "Connection", width:{xs:4}}
        ]
      }
    ],
    dialogs: []
  },
  authors: {
    name: "authors",
    defaultValues: [],
    modules: [
      {
        name: "listTable",
        type: "table",
        label: "List of books",
        onClickRow: [
          {action: "SET_DEFAULT_VALUES", module: "edit-book"},
          {action: "OPEN_DIALOG", dialog: "edit-book"}
        ],
        width: {xs: 12},
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
                action: "INSERT_RECORD",
                collection: "books",
                httpServer: "http://localhost:1337/",
              },
              {
                action: "CLOSE_DIALOG", dialog: "new-book"
              }
            ],
            fields: [
              {name: "name", label: "Nom", type: "text", width:{xs: 8}},
              {name: "price", label: "Prix", type: "number", width:{xs: 4}},
              {name: "submit", label: "Enregistrer", type: "submit", width: {xs:4}},
              {name: "cancel", label: "Annuler", type: "button", width: {xs:4}, onClick: [{
                action: "CLOSE_DIALOG", dialog: "new-book"
              }]}
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
            onSubmit: [
              {
                action: "MODIFY_DATA",
                collection: "books",
                httpServer: "http://localhost:1337/",
              },
              {
                action: "CLOSE_DIALOG", dialog: "edit-book"
              }
            ],
            fields: [
              {name: "name", label: "Nom", type: "text", width:{xs: 8}},
              {name: "price", label: "Prix", type: "number", width:{xs: 4}},
              {name: "submit", label: "Enregistrer", type: "submit", width: {xs:4}},
              {name: "delete", label: "Delete", type: "button", width: {xs:4}, onClick: [
                {action: "CLOSE_DIALOG", dialog: "edit-book"},
                {action: "DELETE_RECORD", collection: "books"}
              ]},
              {name: "cancel", label: "Annuler", type: "button", width: {xs:4}, onClick: [{
                action: "CLOSE_DIALOG", dialog: "edit-book"
              }]}
            ]
          }
        ]
      }
    ],
    actionButton: [{
      action: "LOGIN",
      dialog: "new-book"
    }]
  },
  settings: {
    collections: ["books"]
  }
};

export default view;
