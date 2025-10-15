import * as originalSchema from "@/db/schema";

import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { db } from "@/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const schemaForAuth = {
    ...originalSchema,
    // user: originalSchema.userCustomer,
    // employee: originalSchema.user,
};

export const auth = betterAuth({
    user: {
        modelName: "userCustomer",
        additionalFields: {
            associatedInternalCompanyId: {
                type: "number",
                required: true,
                default: 1,
            },
            isAccountByAdmin: {
                type: "boolean",
                required: true,
                default: false,
            },

            mobileNumber: {
                type: "string",
                required: true,
                default: "8888",
            },
        },
    },

    emailAndPassword: {
        enabled: true,
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schemaForAuth,
    }),

    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    // Modify user data before creation
                    return {
                        data: {
                            ...user,
                            associatedInternalCompanyId: 1,
                            isAccountByAdmin: false,
                        },
                    };
                },
            },
        },
    },

    // logger: {
    //     disabled: false,
    //     disableColors: false,
    //     level: "error",
    //     log: (level, message, ...args) => {
    //         // Custom logging implementation
    //         console.log(`[${level}] ${message}`, ...args);
    //     },
    // },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});
