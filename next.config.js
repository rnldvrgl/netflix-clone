/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['upload.wikimedia.org', 'uhdtv.io', 'mango.blender.org', 'commondatastorage.googleapis.com', 'download.blender.org'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            },
            {
                protocol: 'https',
                hostname: 'uhdtv.io',
            },
            {
                protocol: 'https',
                hostname: 'mango.blender.org',
            },
            {
                protocol: 'https',
                hostname: 'commondatastorage.googleapis.com',
            },
        ],
        experimental: {
            serverActions: true,
        },
    },
}

module.exports = nextConfig
