'use client';

import { useSession } from 'next-auth/react';
import { isAdmin } from '@/lib/admin-config';

export function useAdmin() {
    const { data: session, status } = useSession();

    const email = session?.user?.email;
    const isAdminUser = isAdmin(email);

    return {
        isAdmin: isAdminUser,
        isLoading: status === 'loading',
        session,
        user: session?.user,
    };
}
