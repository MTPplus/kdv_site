#!/usr/bin/env python3
"""Extract main content from each saved dvkran page for inspection."""
import re
from pathlib import Path

SCRIPTS = Path('/home/z/my-project/scripts')

PAGES = [
    ('dvkran_o-kompanii.html', 'О компании'),
    ('dvkran_products.html', 'Продукция'),
    ('dvkran_service.html', 'Услуги'),
    ('dvkran_project.html', 'Проекты'),
    ('dvkran_vacancy.html', 'Вакансии'),
    ('dvkran_news.html', 'Новости'),
    ('dvkran_kontakty.html', 'Контакты'),
]

def extract_main(html: str) -> str:
    # Get content between <main> and </main>
    m = re.search(r'<main[^>]*>(.*?)</main>', html, re.S)
    if not m:
        return ''
    body = m.group(1)
    # Strip scripts
    body = re.sub(r'<script.*?</script>', '', body, flags=re.S)
    # Strip inline style tags
    body = re.sub(r'<style.*?</style>', '', body, flags=re.S)
    return body.strip()

out = []
for fname, label in PAGES:
    p = SCRIPTS / fname
    if not p.exists():
        out.append(f'=== {label} ({fname}) NOT FOUND ===')
        continue
    html = p.read_text(encoding='utf-8', errors='replace')
    main = extract_main(html)
    out.append(f'\n\n========== {label} ({fname}) ==========\n')
    out.append(main)

(SCRIPTS / 'pages_extracted.txt').write_text('\n'.join(out), encoding='utf-8')
print('Saved to', SCRIPTS / 'pages_extracted.txt')
print('Total length:', sum(len(x) for x in out))
