import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import dotenv from "dotenv";
dotenv.config();

const __dirname = new URL(".", import.meta.url).pathname;
const vuefirePkg = JSON.parse(
  readFileSync(resolve(__dirname, "node_modules/vuefire/package.json"), "utf-8")
);
const nuxtVuefirePkg = JSON.parse(
  readFileSync(
    resolve(__dirname, "node_modules/nuxt-vuefire/package.json"),
    "utf-8"
  )
);

export default defineNuxtConfig({
  // If you set ssr to false, you can't prerender pages
  ssr: true,
  devtools: { enabled: true },
  modules: ["nuxt-vuefire"],

  app: {
    head: {
      title: "Nuxt + VueFire",
      link: [
        {
          href: "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css",
          rel: "stylesheet",
        },
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/vuefire.svg",
        },
      ],
    },
  },

  css: ["@/assets/style.css"],

  vuefire: {
    auth: true,
    emulators: {
      enabled: false,
    },
    // app check is intentionally disabled as the app below doesn't exist
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
  },

  runtimeConfig: {
    public: {
      // to show the versions in the app
      vuefireVersion: vuefirePkg.version,
      nuxtVuefireVersion: nuxtVuefirePkg.version,
    },
  },

  routeRules: {
    "/": { isr: true },
    // deactivate any routes you want here
    "/login": { ssr: false },
    "/api/**": { cors: true },
  },

  experimental: {
    payloadExtraction: false,
  },
});
