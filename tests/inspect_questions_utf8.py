import json

with open("C:/Users/welcome/.gemini/antigravity/scratch/parsed_questions.json", "r", encoding="utf-8") as f:
    questions = json.load(f)

md_content = []
md_content.append("# IITM GATE-DA Questions Summary\n")

for i, q in enumerate(questions):
    md_content.append(f"## [{i+1}] Subject: {q['subject']}")
    md_content.append(f"**URL:** {q['url']}")
    md_content.append("**Content Lines:**\n")
    for j, line in enumerate(q['lines']):
        # Clean line to ensure it doesn't break MD
        clean_line = line.replace('\u200b', '').strip()
        md_content.append(f"{j+1}. {clean_line}")
    md_content.append("\n" + "="*40 + "\n")

out_path = "C:/Users/welcome/.gemini/antigravity/scratch/questions_summary.md"
with open(out_path, "w", encoding="utf-8") as out_f:
    out_f.write('\n'.join(md_content))

print(f"Generated summary at: {out_path}")
