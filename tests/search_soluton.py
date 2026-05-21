from bs4 import BeautifulSoup
import re

with open("C:/Users/welcome/.gemini/antigravity/scratch/question-002.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
matches = soup.find_all(string=re.compile(r'Soluton|Solution', re.IGNORECASE))
print(f"Total string matches: {len(matches)}")

for idx, match in enumerate(matches):
    print(f"\nMatch {idx+1}:")
    parent = match.parent
    print(f"Parent Tag: {parent.name} | Class: {parent.get('class')}")
    
    # Grand-parent
    gparent = parent.parent
    print(f"G-Parent Tag: {gparent.name} | Class: {gparent.get('class')}")
    print("G-Parent HTML:")
    print(str(gparent)[:1200])
