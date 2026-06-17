import { NextResponse } from 'next/server';
import { getContent, saveContent, type ContentData } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

// Simple admin token check. In production, use NextAuth or similar.
// Default dev token: "admin". Pass via x-admin-token header.
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'admin';

export async function POST(request: Request) {
  try {
    const token = request.headers.get('x-admin-token');
    if (token !== ADMIN_TOKEN) {
      return NextResponse.json(
        { ok: false, error: 'Unauthorized: invalid admin token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    // Merge with current content to avoid losing fields if partial update
    const current = await getContent();
    const next: ContentData = { ...current, ...body } as ContentData;
    await saveContent(next);

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
