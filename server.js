// server.js
const express = require('express');
const app = express();
const port = 443; // 80 or 443 in production

const contentPreprod = {
    "applinks": {
    "apps": [],
    "details": [
        {
            "appID": "8MRL5ZLUXW.in.goindigo.IndiGo.preprod",
            "paths": ["*"]
        },
        {
            "appID": "8MRL5ZLUXW.in.goindigo.IndiGo.preprod.debug",
            "paths": ["*"]
        }
    ]
    }
};

const contentUat = {

  "applinks": {
    "details": [
      {
        "appIDs": ["QUMGU599JQ.in.goindigo.IndiGo.uat", "QUMGU599JQ.in.goindigo.IndiGo.uat.debug"],
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
            "*": "*cid=metasearch|googleflights*",
            "exclude": true,
            "comment": "Excludes any URL with the keyword cid=metasearch|googleflights in the query parameters."
          },
          {
            "*": "*cid=metasearch|skyscanner*",
            "exclude": true,
            "comment": "Excludes any URL with the keyword cid=metasearch|skyscanner in the query parameters."
          },
          {
            "*": "*cid=metasearch|wego*",
            "exclude": true,
            "comment": "Excludes any URL with the keyword cid=metasearch|wego in the query parameters."
          }
        ]
      }
    ]
  },
  "webcredentials": {
    "apps": ["QUMGU599JQ.in.goindigo.IndiGo.uat"]
  },
  "appclips": {
    "apps": ["QUMGU599JQ.in.goindigo.IndiGo.uat.debug"]
  }
}

// Serve at /apple-app-site-association
app.get('/apple-app-site-association', (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Required
  res.status(200).send(JSON.stringify(contentUat));
});

// Serve at /.well-known/apple-app-site-association
app.get('/.well-known/apple-app-site-association', (req, res) => {
  res.setHeader('Content-Type', 'application/json'); // Required
  res.status(200).send(JSON.stringify(contentUat));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

