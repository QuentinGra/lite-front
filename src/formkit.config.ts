import { defaultConfig } from '@formkit/vue'
import { fr } from '@formkit/i18n'

const config: ReturnType<typeof defaultConfig> = defaultConfig({
  theme: 'genesis',
  locales: { fr },
  locale: 'fr'
})

export default config
