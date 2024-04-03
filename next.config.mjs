/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['m.media-amazon.com','firebasestorage.googleapis.com'],
        remotePatterns:[{hostname:'img.clerk.com'},{hostname:'firebasestorage.googleapis.com'}]
      },
};

export default nextConfig;
