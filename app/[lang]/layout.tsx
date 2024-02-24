
import LandingPage from "@/components/layout/landing/landingPage";
import { Locale } from "@/i18n";
import { getServerSession } from "next-auth";
import Image from "next/image";


export default  function Home({ params: { lang } }
  : { params: { lang: Locale } }) {

//server session: {session ? JSON.stringify(session) : "No session"}
  return (
    <main >
      <div >
        Main Page Lang
       
       
      </div>
<div> lang = {lang}</div>
     <LandingPage />

    </main>
  );
}
