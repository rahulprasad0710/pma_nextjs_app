import React, { ReactNode } from "react";

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//     title: "Rooms",
//     description: "Luxury Rooms",
// };

const Layout = ({ children }: { children: ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
