import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [{
            protocol: 'https',
            hostname: '**.backend.nmb.com.np',
        }]
    },
};

export default nextConfig;
