/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['img.daisyui.com',"m.media-amazon.com"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images-eu.ssl-images-amazon.com",
        },
      ],
    },
  };

export default nextConfig;
