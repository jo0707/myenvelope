// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxt/ui", "@nuxtjs/google-fonts", "@pinia/nuxt", "@vueuse/nuxt", "nuxt-mongoose", "nuxt-security"],
  colorMode: {
    preference: "dark",
  },
  googleFonts: {
    families: {
      "Ubuntu Mono": true,
      Poppins: true,
      Tangerine: true,
    },
  },
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: "models",
  },
  routeRules: {
    "/api/envelope": {
      security: {
        rateLimiter: {
          tokensPerInterval: 5,
          interval: 10000,
        },
      },
    },
  },
})
