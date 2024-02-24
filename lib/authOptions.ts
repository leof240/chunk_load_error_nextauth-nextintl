// auth/[...nextauth].js
import { prisma } from '@/server/db/client'
//import Providers from 'next-auth/providers';
//import  bcrypt  from 'bcrypt';
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import { LoginError } from '@/lib/Error';

import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt'
    },
    providers: [
        GoogleProvider({
            profile(profile) {


                if (profile) {
                    profile.id = profile.sub
                    profile.role = 10
                    profile.image = profile.picture

                    //console.log("Profile Google: ", profile);
                }


                return profile;
            },
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
                otp: {}
            },
            async authorize(credentials): Promise<any> {
                //console.log("authorize cred: ", credentials)


                // check to see if email and password / otp are there
                if (!credentials?.email || (!credentials?.password && !credentials?.otp)) {

                    throw new LoginError('Email and password are required')
                }

                const user = {
                    email: credentials.email
                    ,role: 10
                    , admin: false
                    , emailVerified: true

                }
                
                // if password matches

                return user;


            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: ({ token, user }) => {
            //console.log("token callback: ", token)
            if (user) {
                const u = user as unknown as any
                return {
                    ...token,
                    randomKey: u.randomKey
                    , role: u.role || 10
                    , admin: u.admin || false
                    , emailVerified: u.emailVerified || false
                }
            }
            return token
        }
        , session: ({ session, token }) => {
            //console.log("session callback: ", session)
            if (session?.user) {
                session.user.jti = token.jti as string
                session.user.role = token.role as number
                session.user.admin = token.admin as boolean
                session.user.emailVerified = token.emailVerified as boolean
            }

            return session
        },
        async signIn({ profile, user, credentials }) { // used only for google sign in and other social providers
            // console.log("sign in: ", profile)
            // console.log("user: ", user)
            // console.log("credentials: ", credentials)
            if (profile?.email) { // if user is signing in with google or other social provider
                const user = await prisma.user.findUnique({
                    where: {
                        email: profile?.email
                    },
                    include: {
                        registration: true
                    }

                });

                if (user) {
                    // update user with new image and name
                    const updatedUser = await prisma.user.update({
                        where: {
                            email: profile.email
                        },
                        data: {
                            image: profile.image,
                            emailVerified: true,
                            name: profile.name
                        }
                    })

                    if (updatedUser)
                        return true
                }

                // create new user with only specific fields
                const newUser = await prisma.user.create({
                    data: {
                        email: profile.email,
                        role: 10,
                        image: profile.image,
                        name: profile.name,

                        emailVerified: true
                    }
                })

                if (newUser)
                    return true
            }
            else if(credentials?.email) { // if user is signing in with email and password or otp
                if(user.emailVerified || credentials.otp) { // if user is verified or signing in with otp
                    return true
                }
                else {
                    //console.log("credentials: ", credentials)
                    //console.log("user: ", user)
                    throw new LoginError("Email not verified, please check your email for the verification link")
                }
            }

            


            return true // always sign in (credentials are checked in authorize callback)
        }
        /* ,
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
          } 


          jwt({ user = {}, token }) {
      return {
          ...token,
          user
       };
    },
        */
    }

}



declare module "next-auth" {

    interface Session extends DefaultSession {
        user: User
        ;
    }

    interface User extends DefaultUser {
        email: string;
        role: number;
        admin: boolean;
        emailVerified: boolean;
        jti: string;
    }

}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT extends DefaultJWT {
        /** OpenID ID Token */
        role: number
        admin: boolean
        emailVerified: boolean
    }
}
