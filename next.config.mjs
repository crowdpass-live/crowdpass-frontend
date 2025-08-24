/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['ipfs.io', 'res.cloudinary.com'],
    },
      async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'payment=*, geolocation=*, microphone=*, camera=*, fullscreen=*'
          },
          {
            key: 'Feature-Policy',
            value: 'payment *; geolocation *; microphone *; camera *'
          }
        ],
      },
    ];
  },
  experimental: {
    esmExternals: false,
  },
  };
export default nextConfig;
