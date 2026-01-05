import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: '0.0.0.0', // Biar bisa diakses dari luar container
        hmr: {
            host: 'localhost', // Kasih tau browser connect ke localhost
        },
        watch: {
            usePolling: true, // PENTING: Paksa cek file di Windows
        },
    },
});