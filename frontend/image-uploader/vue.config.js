const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      '/upload': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: { '^/upload': '' },
      },
    },
  },
  transpileDependencies: true
})
