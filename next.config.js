
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com']
    },
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname
    }
    // webpack: (config) => {
    //     config.resolve.alias = {
    //         ...config.resolve.alias,
    //         '__dirname': __dirname,
    //       };
    // }
}

module.exports = nextConfig
