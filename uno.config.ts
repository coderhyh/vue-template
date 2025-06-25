import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTagify,
  presetUno,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

// https://github.com/unocss/unocss

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.vue$/],
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      autoInstall: true,
      prefix: 'i-',
    }),
    presetTagify({
      extraProperties: { display: 'block' },
      prefix: 'un-',
    }),
  ],
  rules: [
  ],
  shortcuts: {
    center: 'flex justify-center items-center',
  },
  theme: {
    colors: {},
  },
  transformers: [
    transformerDirectives(),
    transformerCompileClass(),
    transformerVariantGroup(),
  ],
})
