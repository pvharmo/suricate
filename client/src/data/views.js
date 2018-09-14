const view = {authors:
  {
    "name": "authors",
    "includes": ["\\.(js|jsx)$"],
    "modules": [
      {"name": "form", "type": "form", "label": "Form", "fields": [
        {name: "prenom", label: "Prénom", type: "text", width:{xs: 4}},
        {name: "nom", label: "Nom", type: "text", width:{xs: 4}},
        {name: "sexe", label: "Sexe", type: "select", width:{xs: 2}, items: [
          {label: "Homme", value: "H"},
          {label: "Femme", value: "F"},
          {label: "Autre", value: "A"}
        ]},
        {name: "date_naissance", label: "Date de naissance", type: "date", width: {xs: 2}},
        {name: "adresse", label: "Adresse", type: "text", width: {xs: 4}},
        {name: "code_postal", label: "Code postal", type: "text", width: {xs:2}},
        {name: "ville", label: "Ville", type: "text", width: {xs:2}},
        {name: "telephone", label: "Téléphone", type: "text", width: {xs: 4}},
        {name: "courriel", label: "Courriel", type: "text", width: {xs: 4}}
      ], data: []},
      {name: "listTable", type: "table", label: "List of books", columns: [
        {name: "name", label: "Nom", numeric: false},
        {name: "price", label: "Prix", numeric: true}
      ]}
    ]
  }
}

export default view
