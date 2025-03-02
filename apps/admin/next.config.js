/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true, // Disables ESLint checks during builds
    },
    typescript: {
        ignoreBuildErrors: true,
    },
  };
  
  export default nextConfig;
  