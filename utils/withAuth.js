"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const withAuth = (WrappedComponent, allowedRoles = []) => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'unauthenticated') {
        router.push('/login');
      } else if (status === 'authenticated' && !allowedRoles.includes(session.user.role)) {
        router.push('/unauthorized'); // Or redirect to a different page if unauthorized
      }
    }, [status, router, session, allowedRoles]);

    if (status === 'loading') {
      return (
        <div className="loading text-primary-azure text-center text-2xl">Loading...</div>
      );
    }

    if (status === 'authenticated' && allowedRoles.includes(session.user.role)) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;


// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';

// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     useEffect(() => {
//       if (status === 'unauthenticated') {
//         router.push('/login');
//       }
//     }, [status, router]);

//     if (status === 'loading') {
//       return (
//         <div className="loading text-primary-azure text-center text-2xl">Loading...</div>
//       );
//     }

//     if (status === 'authenticated') {
//       return <WrappedComponent {...props} />;
//     }

//     return null;
//   };
// };

// export default withAuth;
