import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials'
import jwt from 'jsonwebtoken'
import { NextAuthOptions } from "next-auth";

interface DecodedToken {
    email: string
    first_name: string
    last_name: string
    roles: number[]
    iat: number
    exp: number
}


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider(
            {
                name: "credentials",
                credentials: {
                    password: { label: "Password", type: "password" },
                    email: { label: "Email", type: "email" },
                },
                async authorize(credentials, req): Promise<any> {
                    if (!process.env.LOGIN_URL) {
                        throw new Error("LOGIN_URL is not defined in the environment variables.");
                    }
                    if (!process.env.JWT_SECRET) {
                        throw new Error("JWT_SECRET is not defined in the environment variables.");
                    }

                    try {
                        const response = await fetch(process.env.LOGIN_URL, {
                            method: "POST",
                            body: JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password,
                            }),
                            headers: { "Content-Type": "application/json" },
                        });

                        if (response.status === 404) {
                            return { error: 'error_404' };
                        } else if (response.status === 401) {
                            return { error: 'error_401' };
                        } else if (response.status !== 200) {
                            return { error: 'error' };
                        }

                        const jwtResponse = await response.json();
                        const decodedToken = jwt.verify(jwtResponse.access_token, process.env.JWT_SECRET) as DecodedToken
                        console.log("this is the decoded token:", decodedToken)
                        const access_token = jwtResponse.access_token;

                        return {
                            ...credentials,
                            access_token,
                            first_name: decodedToken.first_name,
                            last_name: decodedToken.last_name,
                            roles: decodedToken.roles
                        } as any
                    } catch (e) {
                        return null;
                    }
                }
            })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (user?.error === 'error_401') {
                throw new Error('Invalid Username or Password.')
            } else if (user?.error === 'error_404') {
                throw new Error('Error 404 - Page Not Found.')
            } else if (user?.error === 'error') {
                throw new Error('An Unknown Error Has Occured.')
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    access_token: user.access_token,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    roles: user.roles,
                };
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.access_token = token.access_token,
                    session.user = {
                        // ...session.user,
                        first_name: token.first_name,
                        last_name: token.last_name,
                        roles: token.roles,
                    }
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/accounts/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development"
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }