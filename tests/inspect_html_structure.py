from bs4 import BeautifulSoup
import re

with open("C:/Users/welcome/.gemini/antigravity/scratch/question-001.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
main_content = soup.find('main', class_='content')
if not main_content:
    main_content = soup.find(id='quarto-document-content')

print("--- OUTER HTML OF MAIN CONTAINER ---")
print(str(main_content)[:1200] + "\n...")

print("\n--- DETAILED TAG ANALYSIS ---")
# Print child elements and their classes
for child in main_content.find_all(recursive=False):
    print(f"Tag: {child.name} | Class: {child.get('class')} | ID: {child.get('id')}")
    # If it is a paragraph or div, let's show its raw content
    text_snippet = child.get_text().strip()[:200]
    print(f"  Snippet: {text_snippet}")
    
    # If this child has grandchildren, let's show them briefly
    for gchild in child.find_all(recursive=False):
        print(f"    G-Tag: {gchild.name} | Class: {gchild.get('class')} | ID: {gchild.get('id')}")
        print(f"      G-Snippet: {gchild.get_text().strip()[:100]}")
