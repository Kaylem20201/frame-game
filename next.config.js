// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: '_next',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.dustloop.com",
        port: "",
      },
    ],
  },
  /* experimental: {
		forceSwcTransforms: true,
	}, */
};

module.exports = nextConfig;
