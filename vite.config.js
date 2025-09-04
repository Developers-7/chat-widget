// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
    const isWidget = mode === "widget";

    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
        build: isWidget
            ? {
                lib: {
                    entry: path.resolve(__dirname, "src/widget.jsx"),
                    name: "ChatWidget",
                    fileName: () => `chat-widget.iife.js`,
                    formats: ["iife"],
                },
                rollupOptions: {
                    external: [],
                    output: {
                        globals: {},
                        // Ensure CSS is inlined
                        inlineDynamicImports: true,
                    },
                },
                cssCodeSplit: false,
                minify: "terser",
                // Output to public directory for immediate use
                outDir: "dist",
                emptyOutDir: true,
            }
            : {
                // Regular app build
                outDir: "dist",
            },
        publicDir: isWidget ? false : "public",
    };
});
