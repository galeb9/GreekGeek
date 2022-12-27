const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    manifestOptions: {
      name: "Greek Geek",
      short_name: "GG",
      icons: [
        {"src":"./img/icons/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}
      ],
      background_color: "#E6EEFA",
    }
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_animations.scss";
        `
      }
    }
  }
})
