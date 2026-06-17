#!/usr/bin/env python3
"""Extract unique image URLs from all saved dvkran HTML pages."""
import re
import json
from pathlib import Path

SCRIPTS = Path('/home/z/my-project/scripts')
pages = list(SCRIPTS.glob('dvkran_*.html'))

img_pattern = re.compile(r'(?:src|srcset)="(https://dvkran\.ru/[^"\s]+\.(?:png|jpg|jpeg|svg|gif|webp|ico))"', re.I)
urls = set()
for p in pages:
    html = p.read_text(encoding='utf-8', errors='replace')
    for m in img_pattern.finditer(html):
        u = m.group(1).split(' ')[0]
        urls.add(u)

# Also add a few known theme images
extra = [
    'https://dvkran.ru/wp-content/themes/mikrotermplus/images/dev/resmap.png',
]
for u in extra:
    urls.add(u)

# Also fetch svg icons res1..res8 from theme path
for i in range(1, 9):
    urls.add(f'https://dvkran.ru/wp-content/themes/mikrotermplus/images/dev/res{i}.svg')

urls = sorted(urls)
(SCRIPTS / 'image_urls.txt').write_text('\n'.join(urls), encoding='utf-8')
print(f'Found {len(urls)} unique image URLs')
for u in urls[:5]:
    print(' ', u)
print('...')
for u in urls[-5:]:
    print(' ', u)
