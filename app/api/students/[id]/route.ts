import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { getStudentById } from '@/lib/students-store';
import { isAdmin } from '@/lib/admin-config';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession();

        if (!session?.user?.email || !isAdmin(session.user.email)) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const student = getStudentById(id);

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        return NextResponse.json(student);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
