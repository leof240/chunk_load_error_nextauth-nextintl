import 'server-only'
import type { Locale } from '@/i18n'




// get trasnlated content based on the locale
export const getDictionary = async (locale: Locale) => {
  try {
    return import(`@/data/${locale}.json`).then(module => module.default)
  } catch (error) {
    console.log(error)
    return import('@/data/en.json').then(module => module.default)
  }

}
