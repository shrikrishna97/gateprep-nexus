import urllib.request
from bs4 import BeautifulSoup
import re
import os
import json

targets = [
    ("linear_algebra", "linear_algebra/bank/question-001.html"),
    ("linear_algebra", "linear_algebra/bank/question-002.html"),
    ("machine_learning", "machine_learning/bank/question-001.html"),
    ("machine_learning", "machine_learning/bank/question-002.html"),
    ("prob_stats", "prob_stats/bank/question-001.html"),
    ("prob_stats", "prob_stats/bank/question-002.html"),
    ("calculus", "calculus/bank/question-001.html"),
    ("dbms", "dbms/bank/question-001.html"),
    ("pdsa", "pdsa/bank/question-001.html"),
    ("gate_2025", "papers/GATE-2025/question-01.html"),
]

def clean_text(text):
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

parsed_questions = []

for subject, relative_path in targets:
    url = f"https://iitmbsc-student-projects.github.io/gate-da/{relative_path}"
    print(f"Fetching: {url}")
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        )
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            
        soup = BeautifulSoup(html, 'html.parser')
        main_content = soup.find('main', class_='content')
        if not main_content:
            main_content = soup.find(id='quarto-document-content')
            
        if main_content:
            # Let's save the raw text lines
            text_lines = [line.strip() for line in main_content.get_text('\n').split('\n') if line.strip()]
            
            # Let's save the HTML snippet to extract LaTeX and options
            # Save parsed details
            parsed_questions.append({
                "subject": subject,
                "url": url,
                "relative_path": relative_path,
                "lines": text_lines
            })
            print(f"  Successfully parsed {len(text_lines)} lines")
        else:
            print("  Failed to find main content")
    except Exception as e:
        print(f"  Error: {e}")

# Save all parsed questions as JSON for easy reading
out_path = "C:/Users/welcome/.gemini/antigravity/scratch/parsed_questions.json"
with open(out_path, "w", encoding="utf-8") as out_f:
    json.dump(parsed_questions, out_f, indent=2)
print(f"\nSaved all results to {out_path}")
