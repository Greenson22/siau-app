import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-ignore - Opsi ini diperlukan untuk HMR di lingkungan cloud
    allowedDevOrigins: ["*.cloudworkstations.dev"],
  },
};


// const nextConfig: NextConfig = {
//   /* config options here */
// };

// module.exports = {
//   allowedDevOrigins: [
//     'local-origin.dev', 
//     '*.local-origin.dev',
//     "*.cloudworkstations.dev"
//   ],
// }

// export default nextConfig;
