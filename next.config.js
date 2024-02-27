/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache');
const prod = process.env.NODE_ENV === 'production'
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: prod ? false : true,
  // runtimeCaching,
});

const nextConfig = withPWA({});
module.exports = nextConfig;