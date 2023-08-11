const securityHeaders = [
    {
      key: "Content-Security-Policy",
      value: "your-content-security-policy",
    },
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
      value: "your-referrer-policy",
    },
    {
      key: "Permissions-Policy",
      value: "your-permissions-policy",
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
  