const mainMenu = [
    {"name": "tables", "label": "Tables", "type": "collapse", "link": "/tables", "submenu": [
      {"name": "authors", "label": "Authors", "type": "link", "link": "/authors"},
      {"name": "books", "label": "Books", "type": "link", "link": "/books"}
    ]},
    {"name": "views", "label": "Views", "type": "collapse", "link": "/views", "submenu": [
      {"name": "authors-view", "label": "Authors", "type": "link", "link": "/authors-view"},
      {"name": "books-view", "label": "Books", "type": "link", "link": "/books-view"},
    ]},
    {"name": "users", "label": "Users", "type": "link", "link": "/users"},
    {"name": "roles", "label": "Roles", "type": "link", "link": "/roles"}
  ]

export default mainMenu;
