/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
      optimizeCss: false,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Disable name mangling/minification
      config.optimization.minimizer.forEach((minimizer) => {
        if (minimizer.constructor.name === 'TerserPlugin') {
          minimizer.options.terserOptions.mangle = false;
        }
      });
      
      return config;
    },
  };
  
  export default nextConfig;
  