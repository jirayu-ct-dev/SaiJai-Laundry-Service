import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { openAPI, customSession } from "better-auth/plugins";
import { PrismaClient, Role } from "@/generated/prisma/client";


const prisma = new PrismaClient();
export const auth = betterAuth({
    trustedOrigins: [
        "http://localhost:3000",
        "https://*.ngrok-free.app",
    ],
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    plugins: [
        customSession(async ({ user, session }) => {
            const dbUser = await prisma.user.findUnique({
                where: { id: user.id },
                select: { role: true },
            })

            return {
                session,
                user: {
                    ...user,
                    role: dbUser?.role || 'USER',
                },
            };
        }),
        openAPI(),
    ],
    emailAndPassword: {
        enabled: true
    },
    emailVerification: {
        //
    },
    socialProviders: {
        // google: {
        //     prompt: "select_account",
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        // },
        line: {
            clientId: process.env.LINE_CLIENT_ID as string,
            clientSecret: process.env.LINE_CLIENT_SECRET as string,
            // Optional: override redirect if needed
            redirectURI: "http://localhost:3000/api/auth/callback/line",
            // scopes are prefilled: ["openid","profile","email"]. Append if needed
        }
    },
});