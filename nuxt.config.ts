// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/google-fonts", "@pinia/nuxt"],
  colorMode: {
    preference: "dark",
  },
  googleFonts: {
    families: {
      "Ubuntu Mono": true,
      Poppins: true,
    },
  },
})
