import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
const PUBLIC_PREFIX = '/uploads';
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/bmp',
  'image/x-icon',
  'image/vnd.microsoft.icon',
]);
const ALLOWED_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico']);

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
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { ok: false, error: 'No file provided (expected form field "file")' },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { ok: false, error: `File too large: ${file.size} bytes (max ${MAX_SIZE})` },
        { status: 413 }
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      const ext = path.extname(file.name).toLowerCase();
      if (!ALLOWED_EXTS.has(ext)) {
        return NextResponse.json(
          { ok: false, error: `Unsupported file type: ${file.type || ext}` },
          { status: 415 }
        );
      }
    }

    const originalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 80);
    const ext = path.extname(originalName).toLowerCase() || '.png';
    const base = path.basename(originalName, ext) || 'image';
    const slug = base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'image';
    const id = crypto.randomBytes(6).toString('hex');
    const filename = `${slug}-${id}${ext}`;

    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

    const publicUrl = `${PUBLIC_PREFIX}/${filename}`;
    return NextResponse.json({
      ok: true,
      url: publicUrl,
      filename,
      size: file.size,
      type: file.type || ext,
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    const entries = await fs.readdir(UPLOAD_DIR, { withFileTypes: true });
    const files = entries
      .filter((e) => e.isFile())
      .map((name) => ({
        url: `${PUBLIC_PREFIX}/${name.name}`,
        filename: name.name,
      }))
      .sort((a, b) => a.filename.localeCompare(b.filename));
    return NextResponse.json({ ok: true, files });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
