#!/usr/bin/env python3
"""Extract individual files from the compass codebase export."""

import os
import re

SOURCE = "/Users/danielkovac/Downloads/compass-northern-rivers-codebase.txt"
OUTPUT_DIR = "/Users/danielkovac/Desktop/compass-site"

def main():
    with open(SOURCE, "r", encoding="utf-8") as f:
        content = f.read()

    # Pattern: line of ='s, then FILE: path, then line of ='s
    # Split on FILE: markers
    pattern = r"^={10,}\nFILE:\s+(.+)\n={10,}$"
    parts = re.split(pattern, content, flags=re.MULTILINE)

    # parts[0] is the header before the first FILE: marker
    # Then alternating: filename, content, filename, content, ...
    file_count = 0
    for i in range(1, len(parts), 2):
        filepath = parts[i].strip()
        file_content = parts[i + 1] if i + 1 < len(parts) else ""

        # Strip leading/trailing blank lines from file content
        file_content = file_content.strip("\n")

        full_path = os.path.join(OUTPUT_DIR, filepath)
        dir_name = os.path.dirname(full_path)
        if dir_name:
            os.makedirs(dir_name, exist_ok=True)

        with open(full_path, "w", encoding="utf-8") as out:
            out.write(file_content)
            if file_content and not file_content.endswith("\n"):
                out.write("\n")

        file_count += 1

    print(f"Extracted {file_count} files to {OUTPUT_DIR}")

if __name__ == "__main__":
    main()
