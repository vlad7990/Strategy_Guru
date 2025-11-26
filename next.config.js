/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Turbopack configuration (Next.js 16 default)
  turbopack: {},

  // Exclude backend directory from Next.js file tracing
  experimental: {
    outputFileTracingExcludes: {
      '*': ['./backend/**/*', 'backend/**/*', './backend'],
    },
  },

  // Webpack configuration to exclude backend files
  webpack: (config, { isServer }) => {
    // Add rule to ignore backend directory
    config.module.rules.push({
      test: /backend[\/\\].*\.(ts|tsx|js|jsx)$/,
      loader: 'ignore-loader',
    });

    // Exclude backend from module resolution
    if (config.externals) {
      if (typeof config.externals === 'function') {
        const originalExternals = config.externals;
        config.externals = async (context, request, callback) => {
          if (request.includes('/backend/') || request.startsWith('backend/')) {
            return callback();
          }
          return originalExternals(context, request, callback);
        };
      } else if (Array.isArray(config.externals)) {
        config.externals.push(function ({ request }, callback) {
          if (request && (request.includes('/backend/') || request.startsWith('backend/'))) {
            return callback();
          }
          callback();
        });
      }
    }

    return config;
  },

  // Skip TypeScript errors during build if backend files are still picked up
  typescript: {
    // Only ignore errors from backend directory
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
