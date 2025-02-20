// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['/assets/css/fonts.css'],
  modules: [
    '@vesp/nuxt-fontawesome',
  ],
  fontawesome: {
    icons: {
      solid: ['plane', 'circle-exclamation']
    },
    proIcons: {
      solid: ['arrow-turn-down-left']
    }
  }
})