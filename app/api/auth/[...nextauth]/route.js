import NextAuth from "next-auth";
import KeycloakProvider from 'next-auth/providers/keycloak'
import { jwtDecode } from "jwt-decode";
import { encrypt } from "@/utils/encryption";

export const authOptions = {
    providers: [
        KeycloakProvider({
            clientId: `${process.env.DEMO_FRONTEND_CLIENT_ID}`,
            clientSecret: `${process.env.DEMO_FRONTEND_CLIENT_SECRET}`,
            issuer: `${process.env.AUTH_ISSUER}`,
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.decoded = jwtDecode(account.access_token);
                token.access_token = account.access_token;
                token.id_token = account.id_token;
                token.expires_at = account.expires_at;
                token.refresh_token = account.refresh_token;
                return token;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client
            session.access_token = encrypt(token.access_token)
            session.id_token = encrypt(token.id_token)
            session.roles = token.decoded.realm_access.roles
            return session;
        },
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}