import type { Rule } from 'unocss'
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

const sizeMapping: Record<string, string> = {
  br: 'border-radius',
  fs: 'font-size',
  h: 'height',
  m: 'margin',
  mb: 'margin-bottom',
  ml: 'margin-left',
  mr: 'margin-right',
  mt: 'margin-top',
  p: 'padding',
  pb: 'padding-bottom',
  pl: 'padding-left',
  pr: 'padding-right',
  pt: 'padding-top',
  w: 'width',
}

function getSizeRules(Mapping: Record<string, string>): Rule<object>[] {
  return Object.keys(Mapping).map((key) => {
    const value = Mapping[key]
    return [new RegExp(`^${key}(\\d+)$`), ([, d]) => ({ [value]: `${d}px` })]
  })
}

export default defineConfig({
  content: {
    pipeline: {
      include: [/\.vue$/, /pages.json?$/],
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
  rules: getSizeRules(sizeMapping),
  transformers: [
    transformerDirectives(),
    transformerCompileClass(),
    transformerVariantGroup(),
  ],
})
