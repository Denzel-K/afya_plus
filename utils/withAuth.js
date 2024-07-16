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
    }, [status, router]);

    if (status === 'loading') {
      return (
        <div className="loading text-primary-azure text-center text-2xl">Loading...</div>
      );
    }

    if (status === 'authenticated') {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
