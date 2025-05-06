const express = require('express');
const app = express();
const path = require('path');
const port = 443; // or 80 in production

// JSON content
const contentPreprod = {
  applinks: {
    apps: [],
    details: [
      {
        appID: '8MRL5ZLUXW.in.goindigo.IndiGo.preprod',
        paths: ['*'],
      },
      {
        appID: '8MRL5ZLUXW.in.goindigo.IndiGo.preprod.debug',
        paths: ['*'],
      },
    ],
  },
};

const contentUat = {
  applinks: {
    details: [
      {
        appIDs: [
          'QUMGU599JQ.in.goindigo.IndiGo.uat',
          'QUMGU599JQ.in.goindigo.IndiGo.uat.debug',
        ],
        components: [
          { '/': '/loyalty/*', exclude: true },
          { '/': '/hotels*' },
          { '/': '/flights*' },
          { '/': '/web-check-in.html' },
          { '/': '/?ui-ux=oldui', exclude: true },
        ],
      },
    ],
  },
  webcredentials: {
    apps: ['QUMGU599JQ.in.goindigo.IndiGo.uat'],
  },
  appclips: {
    apps: ['QUMGU599JQ.in.goindigo.IndiGo.uat.debug'],
  },
};

// Serve apple-app-site-association
app.get('/apple-app-site-association', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(contentUat));
});

app.get('/.well-known/apple-app-site-association', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(contentUat));
});

// Serve static HTML pages
app.get('/', (req, res) => {
  res.send('<h1>Home Page</h1>');
});

app.get('/hotels', (req, res) => {
  res.send('<h1>Hotels Page</h1>');
});

app.get('/flights', (req, res) => {
  res.send('<h1>Flights Page</h1>');
});

app.get('/web-check-in.html', (req, res) => {
  res.send('<h1>Web Check-In Page</h1>');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
