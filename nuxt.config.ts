// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css','vuesax/dist/vuesax.css','boxicons/css/boxicons.min.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      COLLECTION_PAYS: process.env.COLLECTION_PAYS,
      COLLECTION_PROFILE : process.env.COLLECTION_PROFILE, 
      DATABASE_ID: process.env.DATABASE_ID,
      COLLECTION_ID: process.env.COLLECTION_ID,
      PROJECT_ID: process.env.PROJECT_ID,
      APPWRITE_URL: process.env.APPWRITE_URL,
      APPWRITE_API_KEY: process.env.APPWRITE_API_KEY,
    },
  }
})
