
import React, { Suspense } from 'react'


import { getDictionary } from '@/data/dictionary';
import { Locale } from '@/i18n';
import LandingPage from '@/components/layout/landing/landingPage';
import { getServerSession } from 'next-auth';


const Home = async ({params: {lang} }
  : { params: {lang: Locale} }
) => {

   const session = await getServerSession();
   const {  metadata } = await getDictionary(lang)

  return (
    <div className="main-body app ">
<Suspense fallback="loading">
    <div className="main-body app ">
    <div className="horizontalMenucontainer">
    
      <div className="page">
        <div className="open">
        some text here lang = {lang}
        metadata = {metadata.title}
        page session = {JSON.stringify(session)}
        </div>
        <div className="main-survey-content" >
          <div className="side-app">
            <div className="main-container container-fluid">
             <LandingPage />
            </div>
          </div>
        </div>
 
      </div>
    </div>
  </div>
</Suspense>
      </div>
   
    
    
  )
}

export default Home


/*  */