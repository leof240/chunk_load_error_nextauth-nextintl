'use client'
import React from 'react';

import { signIn, signOut, useSession } from 'next-auth/react'

interface LoginButtonProps {
    metadata: any;
}

const LoginButton: React.FC<LoginButtonProps> = ({ metadata }) => {
    return (
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
    );
};

export default LoginButton;