import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), tsconfigPaths(), svgr()],
    server: {
        host: true,
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: './index.html',
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.ts',
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'tests/'],
        },
    },
});
