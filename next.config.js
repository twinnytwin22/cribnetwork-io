const { v4: uuidv4 } = require('uuid');

const nonce = uuidv4()

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
      value: "accelerometer=(self), camera=(self), geolocation=(self), microphone=(self)",
    },
  ];
  
  module.exports = {
    async headers() {
      return [
        {
          source: "/(.*)",
          headers: securityHeaders,
        },
      ];
    },
  };
  