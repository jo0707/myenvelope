// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: ["@nuxt/ui", "@nuxtjs/google-fonts", "@pinia/nuxt", "@vueuse/nuxt", "nuxt-mongoose"],
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
})
