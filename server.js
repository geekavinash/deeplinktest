const express = require('express');
const app = express();
const path = require('path');
const port = 443; // or 80 in production

// JSON content
const contentPreprod = {
    "applinks": {
        "details": [
            {
                "appIDs": [
                    "8MRL5ZLUXW.in.goindigo.IndiGo.preprod",
                    "8MRL5ZLUXW.in.goindigo.IndiGo.preprod.debug"
                ],
                "components": [
                    {"/": "/test",
  "comment": "Allow /tess for Universal Link"},
                    {
                      "/": "/*",
                      "comment": "Allow all paths by default"
                    },
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
        "apps": [
            "8MRL5ZLUXW.in.goindigo.IndiGo.preprod"
        ]
    },
    "appclips": {
        "apps": [
            "8MRL5ZLUXW.in.goindigo.IndiGo.preprod"
        ]
    }
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

const prodExcp = {
  "applinks": {
    "apps": [],
    "details": [
      {
        "appIDs": [
          "QUMGU599JQ.in.goindigo.IndiGo",
          "QUMGU599JQ.in.goindigo.IndiGo.debug"
        ],
        "components": [
          { "/": "/flight-select-redirection.html", "exclude":true },
          { "/": "/hotels" }
        ]
      }
    ]
  },
  "webcredentials": {
    "apps": ["QUMGU599JQ.in.goindigo.IndiGo"]
  },
  "appclips": {
    "apps": ["QUMGU599JQ.in.goindigo.IndiGo.debug"]
  }
}


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
        "relation": [
            "delegate_permission/common.handle_all_urls"
        ],
        "target": {
            "namespace": "android_app",
            "package_name": "in.goindigo.android.debug",
            "sha256_cert_fingerprints": [
                "BA:71:8D:26:9F:0D:2E:D1:2A:5B:D6:93:7B:DD:59:DE:10:A1:5A:38:F7:0F:E9:3E:67:95:ED:D5:77:22:FF:23"
            ],
            "paths": [
                "/hotels*",
                "/flights*",
                "/web-check-in.html",
                "!/loyalty/*",
                "!/?ui-ux=oldui",
                "!/digiyatraapp",
                "/digiyatra"
            ]
        }
    },
    {
        "relation": [
            "delegate_permission/common.handle_all_urls"
        ],
        "target": {
            "namespace": "android_app",
            "package_name": "in.goindigo.android",
            "sha256_cert_fingerprints": [
                "52:95:4D:4F:59:41:A3:39:89:CD:D1:74:33:DE:67:E4:EA:3F:61:D1:E4:8B:9D:FA:BE:70:AD:E6:17:20:5B:E7"
            ],
            "paths": [
                "/hotels*",
                "/flights*",
                "/web-check-in.html",
                "!/loyalty/*",
                "!/?ui-ux=oldui",
                "!/digiyatraapp",
                "/digiyatra"
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
  const assetlinks = contentProdAndroid;
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(assetlinks));
});


// Serve apple-app-site-association
app.get('/apple-app-site-association', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(prodExcp));
});

app.get('/.well-known/apple-app-site-association', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(prodExcp));
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

  app.get('/location', (req, res) => {
    const filePath = path.join(__dirname, 'location.html');
    res.sendFile(filePath);
  });

app.get('/linkopener', (req, res) => {
  res.type('html').send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Link Opener</title>
  <style>
    :root { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
    body { margin: 0; padding: 40px 16px; display: grid; place-items: center; min-height: 100vh; background:#f7f7f8; }
    .wrap { width: 100%; max-width: 560px; background:#fff; border:1px solid #e6e6e7; border-radius:16px; padding:24px; box-shadow: 0 6px 24px rgba(0,0,0,0.06); }
    h1 { font-size: 20px; margin: 0 0 16px 0; }
    p { color:#555; margin:0 0 24px 0; }
    .btns { display: grid; gap:12px; }
    a.btn {
      display: inline-block; text-decoration: none; text-align: center;
      padding: 12px 14px; border-radius: 10px; border:1px solid #e2e2e3;
      background:#0b5fff; color:#fff; font-weight:600; letter-spacing:.2px;
    }
    a.btn.secondary { background:#fff; color:#0b5fff; }
    a.btn:hover { filter: brightness(0.96); }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>Open a link</h1>
    <p>Choose a destination to open in a new tab.</p>
    <div class="btns">
      <a class="btn" target="_blank" rel="noopener"
         href="https://deeeplink.itavinash.in/flight-select-redirection.html?flightNumber=2343&skyscanner_redirectid=WzDaBxyDQb6-CD82IM-bMw&cid=metasearch%7Cskyscanner#del/pnq/20250919/INR/100z">
        Flight select redirection
      </a>

      <a class="btn secondary" target="_blank" rel="noopener"
         href="https://deeplink.itavinash.in/hotels">
        Hotels
      </a>

      <a class="btn secondary" target="_blank" rel="noopener"
         href="https://deeplink.itavinash.in/flights">
        Flights
      </a>
    </div>
  </div>
</body>
</html>`);
});



// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
