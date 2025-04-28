// server.js
const express = require('express');
const app = express();
const port = 443; // 80 or 443 in production

const content = {
  applinks: {
    apps: [],
    details: [
      {
        appID: "QUMGU599JQ.in.goindigo.IndiGo.uat",
        paths: ["*"],
      },
      {
        appID: "QUMGU599JQ.in.goindigo.IndiGo.uat.debug",
        paths: ["*"],
      },
    ],
  },
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
