import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */

import { domains } from '@/constants/domains';

const patterns = domains.map((domain) => ({ hostname: domain }));

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: patterns,
  },
};

export default nextConfig;
