import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getAllStudents, getAnalytics } from '@/lib/students-store';
import { isAdmin } from '@/lib/admin-config';

export async function GET() {
    try {
        const session = await getServerSession();

        if (!session?.user?.email || !isAdmin(session.user.email)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const students = getAllStudents();
        const analytics = getAnalytics();

        return NextResponse.json({ students, analytics });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
