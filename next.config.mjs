import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
 // reactStrictMode: true,

 // async redirects() {
 //   return [
 //     {
 //     source: '/:locale/',
 //     destination: '/:locale/homepage',
 //     permanent: true, // Set to `false` for temporary redirects
 //   },
 //   ];
 // },
  eslint: {
    ignoreDuringBuilds: true, // Disable ESLint checks during build
  },
  typescript: {
    ignoreBuildErrors: true, // Skip type checking during builds
  },
  images: {
    domains: ['s3.amazonaws.com'],
  },
}

export default withNextIntl(nextConfig)
