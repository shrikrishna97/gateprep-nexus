from bs4 import BeautifulSoup

with open("C:/Users/welcome/.gemini/antigravity/scratch/question-001.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
main_content = soup.find('main', class_='content')
if not main_content:
    main_content = soup.find(id='quarto-document-content')

# Find all callout divs
callouts = main_content.find_all('div', class_='callout')
print(f"Total callouts found: {len(callouts)}")

for idx, callout in enumerate(callouts):
    print(f"\n--- Callout {idx+1} ---")
    header = callout.find('div', class_='callout-header')
    header_text = header.get_text().strip() if header else "No Header"
    print(f"Header: {header_text}")
    
    body = callout.find('div', class_='callout-body')
    if not body:
        # Sometimes callout-contents or direct contents
        body = callout.find(class_=lambda c: c and 'contents' in c)
    
    if body:
        print("Body HTML:")
        print(str(body)[:1500])
    else:
        print("Body not found, printing callout html:")
        print(str(callout)[:1000])
