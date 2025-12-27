
import projects from './app/assets/data/projects.json'
import { quasarOptions } from './quasar-options'
declare module '@nuxt/schema' {
  interface NuxtConfig {
    quasar?: typeof quasarOptions
  }
}

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    nitro: {
        preset: 'vercel',
        prerender: {
            routes: [
                '/', 
                ...projects.map(p => `/projects/${p.projectName}`)
            ]
        }
    },
    app:{
        head: {
            title: 'Hudson Kennedy - Portfolio Desenvolvedor Full-Stack',
            htmlAttrs: {
                lang: 'pt-BR',
            },
            meta: [
                { name: 'theme-color', content: '#d52627' },
                { name: 'description', content: 'Portfolio de Hudson Kennedy - Desenvolvedor Full-Stack especializado em React, Vue, Angular, Node.js e tecnologias modernas.' },
                { name: 'keywords', content: 'Hudson Kennedy, desenvolvedor, full-stack, React, Vue, Angular, Node.js, JavaScript, TypeScript, portfolio' }
            ],
        },
    },

    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxt/fonts', 'nuxt-quasar-ui', '@pinia/nuxt', '@nuxt/image'],
    quasar: quasarOptions,
    css: [
        '~/assets/styles/variables.css',
        '~/assets/styles/style.css'
    ]
})
