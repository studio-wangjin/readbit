import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Disable public-api rule for files in the shared layer
    files: ['./src/shared/**'],
    rules: {
      'fsd/public-api': 'off',
    },
  },
]) 