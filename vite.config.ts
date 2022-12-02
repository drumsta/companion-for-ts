import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const config = {
    plugins: [vue()],
};

// https://vitejs.dev/config/
export default defineConfig(config);
