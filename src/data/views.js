
const view = {
  main: "authors",
  login: {
    name: "login",
    template: "login",
    modules: [ "login"],
    dialogs: []
  },
  authors: {
    name: "authors",
    defaultValues: [],
    modules: ["listTable"],
    dialogs: [
      {
        name: "new-book",
        open: false,
        title: "Nouveau livre",
        modules: ["new-book"]
      },
      {
        name: "edit-book",
        open: false,
        title: "Éditer le livre",
        modules: ["edit-book"]
      }
    ],
    actionButton: [{
      action: "OPEN_DIALOG",
      dialog: "new-book"
    }]
  },
  settings: {
    collections: ["books"]
  }
};

export default view;
