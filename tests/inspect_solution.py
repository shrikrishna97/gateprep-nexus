from bs4 import BeautifulSoup

with open("C:/Users/welcome/.gemini/antigravity/scratch/question-001.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
main_content = soup.find('main', class_='content')

# Find all children after the first callout
callout = main_content.find('div', class_='callout')
siblings_after = callout.find_next_siblings()

print("--- SIBLINGS AFTER THE ANSWER CALLOUT ---")
for idx, sibling in enumerate(siblings_after):
    print(f"\nSibling {idx+1} | Tag: {sibling.name} | Class: {sibling.get('class')}")
    print(str(sibling)[:1000])
