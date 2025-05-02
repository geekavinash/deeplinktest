// server.js
const express = require('express');
const app = express();
const port = 443; // 80 or 443 in production

const content = {

  "applinks": {
    "details": [
      {
        "appIDs": ["8MRL5ZLUXW.in.goindigo.IndiGo.preprod", "8MRL5ZLUXW.in.goindigo.IndiGo.preprod.debug"],
        "components": [
          {
            "/": "/loyalty/*",
            "exclude": true,
            "comment": "Matches any URL with a path that starts with /loyalty or anything after it and instructs the system not to open it as a universal link."
          },
          {
            "/": "hotels*",
            "exclude": true,
            "comment": "Matches any URL with a path that starts with /hotels or anything after it and instructs the system not to open it as a universal link."
          },
          {
            "/": "/?ui-ux=oldui",
            "exclude": true,
            "comment": "Matches any URL with the query parameter ui-ux=oldui and excludes it from universal links."
          },
          {
            "/": "/",
            "exclude": false,
            "comment": "."
          }
        ]
      }
    ]
  },
  "webcredentials": {
    "apps": ["8MRL5ZLUXW.in.goindigo.IndiGo.preprod"]
  },
  "appclips": {
    "apps": ["8MRL5ZLUXW.in.goindigo.IndiGo.preprod"]
  }
};

// Serve at /apple-app-site-association
app.get('/apple-app-site-association', (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Required
  res.status(200).send(JSON.stringify(content));
});

// Serve at /.well-known/apple-app-site-association
app.get('/.well-known/apple-app-site-association', (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Required
  res.status(200).send(JSON.stringify(content));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
