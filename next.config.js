const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @param {string} phase */
module.exports = (phase) => ({
  // Keep local dev assets separate so a production build cannot invalidate
  // stylesheets being served by a running development server.
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next-dev' : '.next',
  outputFileTracingRoot: __dirname,
  allowedDevOrigins: ["*.preview.same-app.com"],
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_COMPLAINTS_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_COMPLAINTS_STORAGE_BUCKET ||
      process.env.SUPABASE_STORAGE_BUCKET ||
      "complaint-attachments",
  },
  images: {
    unoptimized: true,
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
});
