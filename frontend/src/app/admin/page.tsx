'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/dashboard');
    localStorage.removeItem('analysisField');
  }, []);
  return (
    <article className="flex h-4/5 w-full flex-col items-center justify-center">
      
    </article>
  );
}
