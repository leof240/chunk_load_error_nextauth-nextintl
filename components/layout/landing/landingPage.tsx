'use client'
import React from 'react';
//import CountDown from 'reactjs-countdown';

// component

// images

// css
//import '@/public/assets/scss/comingsoon.module.scss';

import {signIn, signOut, useSession} from 'next-auth/react'

const LandingPage = () => {


    return (
        <div className=" ">
           
            <div className="">
                <div className="row ">
                    <div className="col-12">
                        <div className="" >
                        <h3>EMEA Data Maturity Benchmark Assessment & Report</h3>
                            <h2>Coming Soon</h2> 
                        </div>
                    </div>
                    
                  
                </div>
                <div className="row">
                <div className="col-6">
                      <button onClick={() => {
                        signIn('credentials', {
      email: 'leof240@gmail.com',
      password: 'fra',
      redirect: false,
    })}
    
}>Sign in with Email</button>
                    </div>
                    <div className="col-6">
                      <button onClick={() => {
                        signOut()}
    
}>Sign Out</button>
                    </div>
                    </div>
            </div>
        </div>
    )
}




export default LandingPage;

