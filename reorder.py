import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# We will split the HTML by `    <!-- ========== `
# Note: some blocks might have different number of '='
parts = re.split(r'(?=\s*<!-- =+ [A-Z0-9 &/-]+ =+ -->)', html)

# parts[0] is everything before the first block (which is HERO)
# Let's map them by their header name
blocks = {}
for p in parts:
    match = re.search(r'<!-- =+ ([A-Z0-9 &/-]+) =+ -->', p)
    if match:
        name = match.group(1).strip()
        blocks[name] = p
    else:
        blocks['TOP'] = p

# Check what we found
for name in blocks.keys():
    print("Found block:", name)

# Desired order:
ordered_names = [
    "TOP", # Contains everything up to Navigation
    "NAVIGATION", # If NAVIGATION was split
    "HERO SECTION",
    "ABOUT / INTRODUCTION",
    "ABOUT THE OWNER",
    "ROOMS & SUITES",
    "DINING EXPERIENCE",
    "GALLERY",
    "EXPERIENCES",
    "REVIEWS",
    "LOCATION / MAP",
    "BOOKING FORM",
    "AMENITIES",
    "EXPLORE TARKARLI",
    "CONTACT",
    "FOOTER",
    "FLOATING ACTIONS"
]

final_html = ""
for name in ordered_names:
    if name in blocks:
        final_html += blocks[name]

# Check if any blocks were left out
for name in blocks.keys():
    if name not in ordered_names:
        final_html += blocks[name]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(final_html)

print("Reordering complete.")
