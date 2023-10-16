const { hostname } = require("os");
const { v4: uuidv4 } = require("uuid");

const nonce = uuidv4();

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "same-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(self), camera=(self), geolocation=(self), microphone=(self)",
  },
  {
    key: 'Access-Control-Allow-Origin',
    value: '*', // Replace with the origin of cribmusic.xyz
  },
  {
    key: 'Access-Control-Allow-Methods',
    value: 'GET, POST, PUT, DELETE, OPTIONS',
  },
  {
    key: 'Access-Control-Allow-Headers',
    value: 'X-Requested-With, Content-Type, Authorization',
  },
];

const nextConfig = {
  experimental: {
  //  appDir: true,
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol:'https',
        hostname: 'cdn.sanity.io'
      }
    ],
    domains: ["cdn.sanity.io"],
    loader: "custom",
    loaderFile: "./lib/providers/sanity/imageLoader.tsx",
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/api/(.*)",
        // Headers
        headers: [
          // Allow for specific domains to have access or * for all
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
            // DOES NOT WORK
            // value: process.env.ALLOWED_ORIGIN,
          },
          // Allows for specific methods accepted
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          // Allows for specific headers accepted (These are a few standard ones)
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      }
    ];
  },
};

module.exports = nextConfig;
