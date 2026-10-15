#!/usr/bin/env python3
"""Fetch publications associated with Pablo's ORCID in OpenAlex.
Requires OPENALEX_API_KEY in the environment. Does not publish this secret.
"""
import datetime as dt
import json
import os
import pathlib
import sys
import urllib.parse
import urllib.request

ORCID = '0000-0003-2594-2128'
ROOT = pathlib.Path(__file__).resolve().parents[1]
KEY = os.getenv('OPENALEX_API_KEY', '').strip()
if not KEY:
    sys.exit('OPENALEX_API_KEY is missing; keeping existing publications.json unchanged.')

def fetch_json(url):
    request = urllib.request.Request(url, headers={'Accept':'application/json','User-Agent':'PabloResearchWebsite/1.0 (mailto:povalle@iaa.es)'})
    with urllib.request.urlopen(request, timeout=25) as response:
        return json.load(response)

# Resolve author by ORCID rather than matching a common name.
author_url = 'https://api.openalex.org/authors/' + urllib.parse.quote('https://orcid.org/' + ORCID, safe='') + '?' + urllib.parse.urlencode({'api_key':KEY})
author = fetch_json(author_url)
author_id = author['id'].split('/')[-1]
works = []
for page in range(1, 11):
    params = urllib.parse.urlencode({
        'filter': 'author.id:' + author_id,
        'sort': 'publication_date:desc',
        'per_page': 100,
        'page': page,
        'api_key': KEY,
    })
    payload = fetch_json('https://api.openalex.org/works?' + params)
    for item in payload.get('results', []):
        title = (item.get('title') or '').strip()
        if not title:
            continue
        location = (item.get('primary_location') or {})
        source = (location.get('source') or {})
        doi = item.get('doi')
        url = doi if doi and doi.startswith('https://doi.org/') else item.get('id')
        # OpenAlex 'authorships' follows the publication's author order.
        authors = []
        for authorship in item.get('authorships', []):
            person = authorship.get('author') or {}
            name = (person.get('display_name') or '').strip()
            if name:
                authors.append({
                    'name': name,
                    'is_self': person.get('id', '').rstrip('/').split('/')[-1] == author_id,
                })
        works.append({
            'authors': authors,
            'title': title,
            'year': item.get('publication_year'),
            'venue': source.get('display_name') or item.get('type_crossref') or '',
            'url': url,
        })
    if len(payload.get('results', [])) < 100:
        break

# De-duplicate DOI/title, sorted by API publication date descending.
unique = []
seen = set()
for work in works:
    key = (work['url'] or work['title']).casefold()
    if key not in seen:
        seen.add(key)
        unique.append(work)
if not unique:
    sys.exit('No publications found; keeping existing publications.json unchanged.')
result = {'updated_at':dt.datetime.now(dt.timezone.utc).isoformat(),'source':'OpenAlex (author matched by ORCID)','orcid':ORCID,'works':unique}
(ROOT/'publications.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print(f'Updated {len(unique)} publications for {ORCID}.')
