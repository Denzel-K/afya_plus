"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/login');
      } 
      else if (status === 'authenticated' && session.user.role !== 'admin') {
        router.push('/unauthorized');
      }
    }, [status, router, session]);

    if (status === 'loading') {
      return (
        <div className="loading text-primary-azure text-center text-2xl">Loading...</div>
      );
    }

    if (status === 'authenticated' && session.user.role == 'admin') {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;