import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/ui', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  ui: {
    colorMode: true
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  runtimeConfig: {
    public: {
      liffId: process.env.NUXT_PUBLIC_LIFF_ID
    }
  },
  fonts: {
    // บอกให้ไปเอาฟอนต์จาก Google Fonts
    provider: 'google',

    // default behavior สำหรับฟอนต์ทั้งหมดที่เราจะใช้
    defaults: {
      // Prompt มี weight 100-900 ทั้งปกติและเอียง
      // ใส่อันที่เราจะใช้จริง เพื่อลดขนาดไฟล์
      weights: [100, 300, 400, 500, 600, 700],
      styles: ['normal', 'italic'],
      // ภาษา เราอยากได้ไทยกับละติน
      subsets: ['thai', 'latin']
    },

    // ระบุว่าฟอนต์ Prompt คือฟอนต์หลักของโปรเจค
    families: [
      {
        name: 'Prompt',     // ต้องสะกดแบบนี้ตรงกับ Google Fonts
        provider: 'google', // ดึงจาก Google
        global: true        // สร้าง @font-face ให้ทั้งแอปอัตโนมัติ
      }
    ],
  },
  plugins: ['~/plugins/liff-init.client'],
  vite: {
    server: {
      allowedHosts: [
        'e7a9e8896a49.ngrok-free.app'
      ]
    },
    plugins: [
      tailwindcss()
    ]
  },
  app: {
    head: {
      title: 'LIFF App',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/logo-saijai-laundry-service.png' }]
    }
  }
})