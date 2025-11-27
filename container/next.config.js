const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'container',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          catalogo: 'catalogo@http://localhost:3001/_next/static/chunks/remoteEntry.js',
          carrinho: 'carrinho@http://localhost:3002/_next/static/chunks/remoteEntry.js',
        },
        exposes: {},
        shared: {
          react: { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
        },
      })
    );
    return config;
  },
};

module.exports = nextConfig;