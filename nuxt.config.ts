import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  ssr: false,
  site: {
    url: 'https://erranders.org',
    name: 'Errander',
    description: 'Manage your store, track orders, and grow your campus business with Errander.',
    defaultLocale: 'en',
  },

  devServer: {
    port: 3004,
    host: 'localhost'
  },

  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      firebaseVapidKey: process.env.NUXT_PUBLIC_FIREBASE_VAPID_KEY,
    }
  },

  nitro: {
    prerender: {
      routes: ['/', '/404.html', '/200.html'],
      ignore: ['/dynamic-routes', '/api'],
      failOnError: false
    }
  },

  imports: {
    dirs: [
      'composables',
      'composables/**'
    ]
  },

  postcss: {
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      title: 'Errander - Vendor Portal',
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },

        // ✅ SEO meta
        {
          name: "description",
          content: 'Manage your store, track orders, and grow your campus business with Errander.'
        },
        {
          name: "keywords",
          content: 'Errander vendor, merchant portal, campus food sales, grow your business'
        },
        { name: "author", content: "Errander" },

        // ✅ Open Graph (for social previews)
        { property: "og:title", content: "Errander — Vendor Portal" },
        {
          property: "og:description",
          content:
            "Manage your store, track orders, and grow your campus business with Errander. A seamless hub for all your merchant operations.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://erranders.org" },
        { property: "og:image", content: "https://erranders.org/og-image.jpg" },

        // ✅ Twitter meta
        { name: "twitter:card", content: "summary_large_image" },
        { property: "twitter:url", content: "https://erranders.org" },
        { name: "twitter:title", content: "Errander — Vendor Portal" },
        {
          name: "twitter:description",
          content:
            "Manage your store, track orders, and grow your campus business with Errander. A seamless hub for all your merchant operations.",
        },
        { name: "twitter:image", content: "https://erranders.org/og-image.jpg" },
      ],

      link: [
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "manifest", href: "/site.webmanifest" }
      ],

      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js",
          type: "text/javascript",
        },
      ],
    },
  },

  build: {
    transpile: ["lucide-vue-next"],
  },

  css: ["/assets/css/main.css", "/assets/font/stylesheet.css"],

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxtjs/seo",
  ],

  compatibilityDate: "2025-11-01"
});