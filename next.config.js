/** @type {import('next').NextConfig} */

const nextConfig = {
 reactStrictMode: true,
 


}

/* 
const nextConfig = {
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {

        //fix handlebars warnings
        config.resolve.alias = {
            ...config.resolve.alias,
            'handlebars/runtime': 'handlebars/dist/cjs/handlebars.runtime',
            'handlebars': 'handlebars/dist/cjs/handlebars.runtime',
        };
        // Important: return the modified config
        return config
    },
}




*/
module.exports = nextConfig
// const withNextIntl = require('next-intl/plugin')();

// module.exports = withNextIntl({
//     // Any other Next.js configuration ...
   
// }); 
