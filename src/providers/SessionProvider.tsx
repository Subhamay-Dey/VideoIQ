"use client";

import React, { ReactNode } from "react";
import {SessionProvider as NextAuthSessionProvider} from "next-auth/react";

interface Props {
    children?: ReactNode
}

function SessionProvider({children}: Props) {
    return (
        <NextAuthSessionProvider>
            {children}
        </NextAuthSessionProvider>
    )
}

export default SessionProvider