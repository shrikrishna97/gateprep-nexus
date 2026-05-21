import json

with open("C:/Users/welcome/.gemini/antigravity/scratch/parsed_questions.json", "r", encoding="utf-8") as f:
    data = json.load(f)

print(f"Total questions loaded: {len(data)}")
for i, q in enumerate(data):
    print(f"\n======================================")
    print(f"Index: {i} | Subject: {q['subject']}")
    print(f"URL: {q['url']}")
    print(f"Lines (First 15 lines):")
    for line in q['lines'][:15]:
        print(f"  {line}")
    if len(q['lines']) > 15:
        print("  ...")
