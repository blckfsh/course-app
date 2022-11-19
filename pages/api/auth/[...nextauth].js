import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import bcrypt from "bcryptjs";

const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials;
                const isEmailExisting = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URI}/api/user/${email}`);

                if (isEmailExisting.data.data.length > 0) {
                    let { _id, firstname, lastname, email, status } = isEmailExisting.data.data[0];
                    let hash = isEmailExisting.data.data[0].password;
                    let isPasswordMatch = await bcrypt.compare(password, hash);

                    console.log(isPasswordMatch);
                    if (isPasswordMatch == false) {                                     
                        throw new Error("invalid credentials");
                    }
                
                    // if everything is fine
                    return {
                        id: _id,
                        name: firstname + " " + lastname,
                        email,
                        status,
                        // role
                    };
                }
            },
        }),
    ],
    pages: {
        signIn: "/auth/signin",
        // error: '/auth/error',
        // signOut: '/auth/signout'
    },
    callbacks: {
        jwt(params) {
            // update token
            if (params.user?.role) {
                params.token.role = params.user.role;
            }
            // return final_token
            return params.token;
        },
    },
};

export default NextAuth(authOptions);