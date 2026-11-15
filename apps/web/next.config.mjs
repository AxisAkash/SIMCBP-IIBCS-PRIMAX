/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Workspace packages are shipped as TypeScript source; Next transpiles them.
  transpilePackages: [
    '@simcbp/design-tokens',
    '@simcbp/types',
    '@simcbp/i18n',
    '@simcbp/branding',
  ],
};

export default nextConfig;
