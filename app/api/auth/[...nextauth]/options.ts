import { UserDto } from "@/types";
import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import * as bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: { label: "Username", type: "text" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              
                try {
                    const queryResult = await sql`select * from users where username = ${credentials?.username} limit 1`
                    const userDto: UserDto | undefined = queryResult.rows[0] as UserDto
                    if (userDto && credentials?.password) {
                        const isPasswordMatch = await bcrypt.compare(credentials.password, userDto.hash_password)
                        if (isPasswordMatch) {
                            const user: User = { 
                                id: userDto.uid,
                                uid: userDto.uid,
                                username: userDto.username,
                                phoneNumber: userDto.phone_number,
                                profilePicture: userDto.profile_picture
                            }
                            return user
                        } else {
                            throw new Error("Password doesn't match")
                        }
                    } else throw new Error("UserDto Undefined")
                } catch (error) {
                    console.error(error)
                    return null
                }
            }
        })
    ],
    callbacks: {

        jwt(param) {
            if(param.account?.provider === "credentials") {
                param.token.user = param.user
            }
            return param.token
        },

        async session({ session, token }) {
            if ("user" in token) {
                session.user = token.user;
            }
            return session;
        }

    }
}