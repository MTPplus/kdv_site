#!/usr/bin/env python3
"""Download all needed images from dvkran.ru to public/images/dvkran/."""
import re
import os
import subprocess
from pathlib import Path
from urllib.parse import urlparse

SCRIPTS = Path('/home/z/my-project/scripts')
PUBLIC = Path('/home/z/my-project/public/images/dvkran')
PUBLIC.mkdir(parents=True, exist_ok=True)

urls = (SCRIPTS / 'image_urls.txt').read_text(encoding='utf-8').splitlines()
urls = [u.strip() for u in urls if u.strip()]

# Add images referenced only in JS (product-5..8) and theme logos
extras = [
    'https://dvkran.ru/wp-content/uploads/2023/09/product-5.png',
    'https://dvkran.ru/wp-content/uploads/2023/09/product-6.png',
    'https://dvkran.ru/wp-content/uploads/2023/09/product-7.png',
    'https://dvkran.ru/wp-content/uploads/2023/09/product-8.png',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/logo.svg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/footer-logo.svg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/mobile-logo.svg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/menu-open.svg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/menu-close.svg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/vk.svg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/vk-black.svg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/arrow-left.svg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/arrow-right.svg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/favicons/favicon.ico',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/favicons/apple-touch-icon.png',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/hero.jpg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/hero.png',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/face-bg.jpg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/face-bg.png',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/face.jpg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/background.jpg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/background.png',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/ato-top.svg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/to-top.svg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/director.jpg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/director.png',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/atyasov.jpg',
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/atyasov.png',
]
for e in extras:
    if e not in urls:
        urls.append(e)

UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

results = {'ok': 0, 'fail': 0, 'fails': []}
for url in urls:
    # Build local path
    parsed = urlparse(url)
    # Strip /wp-content/uploads/ and /wp-content/themes/mikrotermplus/images/
    rel = parsed.path.lstrip('/')
    # Replace slashes with dashes for a flat namespace
    if rel.startswith('wp-content/uploads/'):
        rel = rel[len('wp-content/uploads/'):]
    elif rel.startswith('wp-content/themes/mikrotermplus/images/'):
        rel = rel[len('wp-content/themes/mikrotermplus/images/'):]
    elif rel.startswith('wp-content/themes/mikrotermplus/'):
        rel = rel[len('wp-content/themes/mikrotermplus/'):]
    # Flat file name
    flat = rel.replace('/', '__')
    out = PUBLIC / flat
    if out.exists() and out.stat().st_size > 0:
        results['ok'] += 1
        continue
    r = subprocess.run([
        'curl', '-sL', '-A', UA, '-o', str(out), url
    ], capture_output=True, text=True, timeout=60)
    if out.exists() and out.stat().st_size > 0:
        results['ok'] += 1
    else:
        results['fail'] += 1
        results['fails'].append(url)

# Write URL -> filename mapping
mapping = {}
for url in urls:
    parsed = urlparse(url)
    rel = parsed.path.lstrip('/')
    if rel.startswith('wp-content/uploads/'):
        rel = rel[len('wp-content/uploads/'):]
    elif rel.startswith('wp-content/themes/mikrotermplus/images/'):
        rel = rel[len('wp-content/themes/mikrotermplus/images/'):]
    elif rel.startswith('wp-content/themes/mikrotermplus/'):
        rel = rel[len('wp-content/themes/mikrotermplus/'):]
    flat = rel.replace('/', '__')
    mapping[url] = f'/images/dvkran/{flat}'

(SCRIPTS / 'image_mapping.json').write_text(
    __import__('json').dumps(mapping, ensure_ascii=False, indent=2),
    encoding='utf-8'
)
print(f"Downloaded: {results['ok']}, Failed: {results['fail']}")
if results['fails']:
    print('Failed URLs:')
    for u in results['fails']:
        print('  ', u)
