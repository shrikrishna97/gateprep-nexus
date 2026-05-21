from bs4 import BeautifulSoup

with open("C:/Users/welcome/.gemini/antigravity/scratch/question-001.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
main_content = soup.find('main', class_='content')
callout = main_content.find('div', class_='callout')
print(str(callout))
