/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'payment=*, geolocation=*, microphone=*, camera=*, fullscreen=*'
          },
        ],
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.optimization = {
      ...config.optimization,
      concatenateModules: false,
    };

    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      },
    };

    return config;
  },
  swcMinify: true,
  experimental: {
    esmExternals: 'loose',
    forceSwcTransforms: true,
  },
};

export default nextConfig;