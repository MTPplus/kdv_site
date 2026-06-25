# КРАН-ДВ — Next.js + Admin

Production-ready Next.js 16 app with built-in content admin panel.

## Quick deploy with Docker

```bash
# 1. Clone
git clone https://github.com/MTPplus/kdv_site.git
cd kdv_site

# 2. (Optional) Override admin credentials
echo "ADMIN_LOGIN=myuser" > .env
echo "ADMIN_PASSWORD=strong-password" >> .env

# 3. Build & run on port 80
docker compose up -d --build

# 4. Verify
curl http://localhost/
```

Site: `http://your-server-ip/`
Admin: `http://your-server-ip/#admin` (default: admin / admin)

## Persistent data

Two volumes mounted from host:
- `./data/` → content.json (admin-edited text)
- `./public/uploads/` → admin-uploaded images

Backup = copy these two directories.

## Change admin password

Create `.env` next to `docker-compose.yml`:
```env
ADMIN_LOGIN=myuser
ADMIN_PASSWORD=strong-password-here
```

## Architecture

- Next.js 16 standalone (single container, port 3000 internally)
- Content stored in JSON file (`/app/data/content.json`)
- Media stored on disk (`/app/public/uploads/`)
- Auth: base64(login:password) via `x-admin-auth` header
- No external database needed
