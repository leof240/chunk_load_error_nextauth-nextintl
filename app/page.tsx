import LandingPage from "@/components/layout/landing/landingPage";
import { getServerSession } from "next-auth";
import Image from "next/image";


export default async function Home() {

  const session = await getServerSession();


  return (
    <main >
      <div >
       Main Page Root 
        server session: {session ? JSON.stringify(session) : "No session" }
      </div>

      <div >
        <Image
         
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
 <LandingPage />
     
    </main>
  );
}
