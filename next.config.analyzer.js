/**
 * Next.js Configuration with Bundle Analyzer
 * Use: ANALYZE=true npm run build
 */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

const nextConfig = require('./next.config');

module.exports = withBundleAnalyzer(nextConfig);
