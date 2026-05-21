import urllib.request
from bs4 import BeautifulSoup
import collections

url = "https://iitmbsc-student-projects.github.io/gate-da/"
print(f"Fetching homepage: {url}")
try:
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
    
    soup = BeautifulSoup(html, 'html.parser')
    
    # Let's list all links and group them by directory prefix
    groups = collections.defaultdict(list)
    for a in soup.find_all('a', href=True):
        href = a['href']
        text = a.get_text().strip()
        
        # Determine prefix
        clean_href = href.replace('./', '')
        parts = clean_href.split('/')
        if len(parts) > 1:
            prefix = parts[0]
            groups[prefix].append((href, text))
        else:
            groups['root'].append((href, text))
            
    print(f"Total categories: {len(groups)}")
    for category, items in groups.items():
        print(f"\n--- Category: {category} (Total items: {len(items)}) ---")
        # Print first 5 items and last item
        for item in items[:5]:
            print(f"  {item[0]} -> {item[1]}")
        if len(items) > 5:
            print("  ...")
            print(f"  {items[-1][0]} -> {items[-1][1]}")
            
except Exception as e:
    print(f"Error: {e}")
