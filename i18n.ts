import {notFound} from "next/navigation";
import {getRequestConfig} from 'next-intl/server';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';
 
// Can be imported from a shared config

 
export default getRequestConfig(async ({locale}) => {

  // Validate that the incoming `locale` parameter is valid -- if not, use the default locale
  if (!i18nConfig.locales.includes(locale as any)) 
    locale = i18nConfig.defaultLocale;
 
  return {
    messages: (await import(`@/data/${locale}.json`)).default
  };
});

export const locales = ['en', 'fr', 'pl', 'it']
export const localePrefix = 'always'; // Default

export const i18nConfig = {
  locales: locales,
  defaultLocale: 'en',
  localePrefix: localePrefix,
};


  
  export type Locale = (typeof i18nConfig)['locales'][number]



  
  export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation({ locales, localePrefix });