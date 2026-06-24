import { NextResponse } from 'next/server';
import { getContent, saveContent, type ContentData } from '@/lib/content-store';

export const dynamic = 'force-dynamic';

function checkAuth(request: Request): boolean {
  const auth = request.headers.get('x-admin-auth');
  if (!auth) return false;
  try {
    const decoded = Buffer.from(auth, 'base64').toString('utf-8');
    const [login, password] = decoded.split(':');
    const expectedLogin = process.env.ADMIN_LOGIN || 'admin';
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin';
    return login === expectedLogin && password === expectedPassword;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json(
      { ok: false, error: 'Unauthorized: invalid credentials' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
    }

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
