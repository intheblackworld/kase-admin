const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        // assets: path.resolve(__dirname, 'src/assets/'),
        // components: path.resolve(__dirname, 'src/components/'),
        // layouts: path.resolve(__dirname, 'src/layouts/'),
        // pages: path.resolve(__dirname, 'src/pages/'),
        // utils: path.resolve(__dirname, 'src/utils/'),
        // plugins: path.resolve(__dirname, 'src/middleware/'),
        // routers: path.resolve(__dirname, 'src/routers/'),
        // store: path.resolve(__dirname, 'src/store/'),
      },
    },
  
  }
}

// const path = require('path');
// function resolve (dir) {
//     return path.join(__dirname, dir)
// }
// module.exports = {
//     lintOnSave: true,
//     chainWebpack: (config)=>{
//         config.resolve.alias
//             .set('@$', resolve('src'))
//             .set('assets',resolve('src/assets'))
//             .set('components',resolve('src/components'))
//             .set('layouts',resolve('src/layouts'))
//             .set('pages',resolve('src/pages'))
//             .set('utils',resolve('src/utils'))
//             .set('middleware',resolve('src/middleware'))
//             .set('routers',resolve('src/routers'))
//             .set('store',resolve('src/store'))
//     }
// }