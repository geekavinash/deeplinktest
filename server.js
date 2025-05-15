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

const contentProd = {
  applinks: {
    apps: [],
    details: [
      {
        appIDs: [
          'QUMGU599JQ.in.goindigo.IndiGo',
          'QUMGU599JQ.in.goindigo.IndiGo.debug',
        ],
        components: [
          { '/': '/loyalty/*', exclude: true },
          { '/': '/hotels*' },
          { '/': '/flights*' },
          { '/': '/web-check-in.html' },
          { '/': '/digiyatra' }, // ✅ included
          { '/': '/digiyatraapp', exclude: true }, // ❌ excluded
          { '/': '/?ui-ux=oldui', exclude: true },
        ],
      },
    ],
  },
  webcredentials: {
    apps: ['QUMGU599JQ.in.goindigo.IndiGo'],
  },
  appclips: {
    apps: ['QUMGU599JQ.in.goindigo.IndiGo.debug'],
  },
};

const contentUat = {
  applinks: {
    apps:[],
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

const contentProdAndroid = [
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'in.goindigo.android',
        sha256_cert_fingerprints: [
          '76:C4:0A:97:84:E0:EA:6C:37:33:D0:7D:E6:2F:58:69:DC:EB:C5:C4:CF:2C:54:54:9C:62:2F:3B:F1:4E:66:00'
        ],
        paths: [
          '/hotels*',
          '/flights*',
          '/web-check-in.html',
          '!/loyalty/*',
          '!/?ui-ux=oldui'
        ]
      }
    },
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'in.goindigo.android.debug',
        sha256_cert_fingerprints: [
          '76:C4:0A:97:84:E0:EA:6C:37:33:D0:7D:E6:2F:58:69:DC:EB:C5:C4:CF:2C:54:54:9C:62:2F:3B:F1:4E:66:00'
        ],
        paths: [
          '/hotels*',
          '/flights*',
          '/web-check-in.html',
          '!/loyalty/*',
          '!/?ui-ux=oldui'
        ]
      }
    }
  ];


const contentUatAndroid = [
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'in.goindigo.android.uat',
        sha256_cert_fingerprints: [
          '76:C4:0A:97:84:E0:EA:6C:37:33:D0:7D:E6:2F:58:69:DC:EB:C5:C4:CF:2C:54:54:9C:62:2F:3B:F1:4E:66:00'
        ],
        paths: [
          '/hotels*',
          '/flights*',
          '/web-check-in.html',
          '!/loyalty/*',
          '!/?ui-ux=oldui'
        ]
      }
    },
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'in.goindigo.android.uat.debug',
        sha256_cert_fingerprints: [
          '76:C4:0A:97:84:E0:EA:6C:37:33:D0:7D:E6:2F:58:69:DC:EB:C5:C4:CF:2C:54:54:9C:62:2F:3B:F1:4E:66:00'
        ],
        paths: [
          '/hotels*',
          '/flights*',
          '/web-check-in.html',
          '!/loyalty/*',
          '!/?ui-ux=oldui'
        ]
      }
    }
  ];

// Serve assetlinks.json for Android
app.get('/.well-known/assetlinks.json', (req, res) => {
  const assetlinks = contentUatAndroid;
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(assetlinks));
});


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

// ✅ DigiYatra App Wallet Success Page
app.get('/digiyatraapp', (req, res) => {
  const { passInfo = '', m1 = '', redirectUrl = '' } = req.query;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>DigiYatra Pass Added</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; padding-top: 50px; }
        .info { margin-bottom: 30px; font-size: 18px; }
        .countdown { font-size: 24px; color: green; }
      </style>
    </head>
    <body>
      <div class="info">
        <p><strong>Pass Info:</strong> ${decodeURIComponent(passInfo)}</p>
        <p><strong>M1:</strong> ${decodeURIComponent(m1)}</p>
      </div>
      <div class="countdown" id="countdown">Successfully added DigiYatra pass to your wallet. Redirecting to your app in 3...</div>
      <script>
        let seconds = 3;
        const countdownEl = document.getElementById('countdown');
        const redirectUrl = "${decodeURIComponent(redirectUrl)}";
        const interval = setInterval(() => {
          seconds--;
          if (seconds > 0) {
            countdownEl.textContent = "Successfully added DigiYatra pass to your wallet. Redirecting to your app in " + seconds + "...";
          } else {
            clearInterval(interval);
            countdownEl.textContent = "Redirecting...";
            window.location.href = redirectUrl;
          }
        }, 1000);
      </script>
    </body>
    </html>
  `;

  res.send(html);
});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
