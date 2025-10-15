import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pmapublic2.s3.ap-south-1.amazonaws.com",
                pathname: "/**", // allow all paths
            },
        ],
    },
};

export default nextConfig;
