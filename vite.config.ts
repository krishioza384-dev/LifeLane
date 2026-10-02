import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { voiceHandoverPlugin } from './server/voiceHandoverPlugin';

export default defineConfig({
  plugins: [react(), voiceHandoverPlugin()],
});