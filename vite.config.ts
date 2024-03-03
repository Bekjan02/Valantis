import * as path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      utils: `${path.resolve(__dirname, './src/utils')}`,
      api: `${path.resolve(__dirname, './src/api')}`,
      types: `${path.resolve(__dirname, './src/types')}`,
      constants: `${path.resolve(__dirname, './src/constants')}`,
      hooks: `${path.resolve(__dirname, './src/hooks')}`,
      components: `${path.resolve(__dirname, './src/components')}`,
    },
  },
});
