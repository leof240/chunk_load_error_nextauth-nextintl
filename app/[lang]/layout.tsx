import '@/styles/globals.scss'




import { getServerSession } from 'next-auth';

// locale imports
import { Locale, i18nConfig } from "@/i18n";
import  SessionProvider from  '@/components/context/AuthProvider'






export default async function RootLayout({ children, params: { lang } }
  : { children: React.ReactNode, params: { lang: Locale } }) {

  if (!lang || !i18nConfig.locales.includes(lang)) {
    lang = 'en'
  }


  const session = await getServerSession();

   // <html lang="en"> 
  return (
    <html lang={lang}> 

      <body suppressHydrationWarning={true}>
        <SessionProvider session={session}>
      layout session = {JSON.stringify(session)}
          {children}
      </SessionProvider>
      </body>
    </html>
  )
}
