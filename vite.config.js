import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command, mode }) => {
    const isWidget = mode === 'widget';

    return {
        plugins: [
            react(),
            tailwindcss()
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        build: isWidget ? {
            lib: {
                entry: path.resolve(__dirname, 'src/widget.jsx'),
                name: 'ChatWidget',
                fileName: (format) => `chat-widget.${format}.js`,
                formats: ['iife']
            },
            rollupOptions: {
                external: [],
                output: {
                    globals: {}
                }
            },
            cssCodeSplit: false,
            minify: 'terser'
        } : undefined
    }
})
