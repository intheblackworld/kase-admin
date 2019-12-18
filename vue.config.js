const path = require('path')
let dev_PATH = '/MOEA_People_web/'
let prd_PATH = '/MinePeople'
const PATH = process.env.NODE_ENV === 'development' ? dev_PATH : prd_PATH
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
  publicPath: PATH
}