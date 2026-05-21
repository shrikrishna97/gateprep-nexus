import os
from bs4 import BeautifulSoup

def parse_question(filepath):
    print(f"\n=================== PARSING {os.path.basename(filepath)} ===================")
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()
        
    soup = BeautifulSoup(html, 'html.parser')
    main_content = soup.find('main', class_='content')
    if not main_content:
        main_content = soup.find(id='quarto-document-content')
        
    if not main_content:
        print("Error: Main content not found")
        return
        
    # Categories
    categories = [el.text.strip() for el in main_content.find_all(class_='quarto-category')]
    print(f"Categories: {categories}")
    
    # Title
    title_el = main_content.find('h1', class_='title') or soup.find('h1')
    title = title_el.text.strip() if title_el else "Question"
    print(f"Title: {title}")
    
    # Question text before first callout
    first_callout = main_content.find('div', class_='callout')
    
    question_html_parts = []
    question_text_parts = []
    
    for child in main_content.find_all(recursive=False):
        if child == first_callout:
            break
        if child.name == 'header' or 'quarto-title-block' in child.get('class', []) or child.get('id') == 'title-block-header':
            continue
        if child.name == 'ul' and 'task-list' in child.get('class', []):
            continue
            
        question_html_parts.append(str(child))
        question_text_parts.append(child.text)
        
    question_html = ''.join(question_html_parts).strip()
    question_text = '\n'.join(question_text_parts).strip()
    
    print("\n--- Question HTML Snippet ---")
    print(question_html[:500] + "\n...")
    
    # Parse options
    options = []
    task_list = main_content.find('ul', class_='task-list')
    if task_list:
        for li in task_list.find_all('li'):
            options.append(li.text.strip())
    print(f"\nOptions: {options}")
    
    # Parse callouts
    callouts = main_content.find_all('div', class_='callout')
    answer_callout = None
    solution_callout = None
    hint_callout = None
    
    for callout in callouts:
        title_container = callout.find(class_='callout-title-container')
        if title_container:
            text = title_container.text.lower()
            if 'answer' in text:
                answer_callout = callout
            elif 'solution' in text or 'soluton' in text:
                solution_callout = callout
            elif 'hint' in text:
                hint_callout = callout
                
    correct_idxs = []
    nat_answer = ""
    q_type = "MCQ"
    
    if answer_callout:
        list_items = answer_callout.find_all('li')
        checked_inputs = answer_callout.find_all('input', checked=True)
        all_inputs = answer_callout.find_all('input')
        
        # Check in list items
        if list_items:
            for idx, li in enumerate(list_items):
                inp = li.find('input')
                # BeautifulSoup parses checked attribute as existing or not
                if inp and (inp.has_attr('checked') or inp.get('checked') is not None):
                    correct_idxs.append(idx)
            
            # If not found using has_attr, look at input values
            if not correct_idxs:
                for idx, inp in enumerate(all_inputs):
                    if inp.has_attr('checked') or inp.get('checked') is not None:
                        correct_idxs.append(idx)
        else:
            body = answer_callout.find(class_='callout-body-container') or answer_callout
            nat_answer = body.text.strip()
            q_type = "NAT"
            
    if q_type != "NAT":
        if len(correct_idxs) > 1:
            q_type = "MSQ"
        elif len(correct_idxs) == 1:
            q_type = "MCQ"
        else:
            if options:
                q_type = "MCQ"
                correct_idxs = [0]
            else:
                q_type = "NAT"
                if answer_callout:
                    nat_answer = answer_callout.text.strip()
                    
    if q_type == "NAT" and nat_answer:
        # clean
        nat_answer = re.sub(r'^(NoteAnswer|Answer|Note)\s+', '', nat_answer, flags=re.IGNORECASE).strip()
        
    print(f"Type: {q_type}")
    print(f"Correct Indices: {correct_idxs}")
    print(f"NAT Answer: '{nat_answer}'")
    
    if solution_callout:
        body = solution_callout.find(class_='callout-body-container') or solution_callout
        sol_html = str(body)[:200]
        print(f"Solution HTML snippet: {sol_html}...")
        
    if hint_callout:
        body = hint_callout.find(class_='callout-body-container') or hint_callout
        hint_html = str(body)[:200]
        print(f"Hint HTML snippet: {hint_html}...")

for filename in ['question-001.html', 'question-002.html', 'question-003.html']:
    path = f"C:/Users/welcome/.gemini/antigravity/scratch/{filename}"
    if os.path.exists(path):
        parse_question(path)
