import type { NextConfig } from 'next';
import { domains } from '@/constants/domains';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: domains, // 허용할 호스트를 추가
  },
};

export default nextConfig;
