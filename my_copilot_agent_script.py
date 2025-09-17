# my_copilot_agent_script.py
import os

# Example: Create or modify a file
readme_path = "README.md"

if os.path.exists(readme_path):
    with open(readme_path, "a") as f:
        f.write("\n\n<!-- Updated by Copilot Agent -->")
    print(f"Updated {readme_path}")
else:
    with open(readme_path, "w") as f:
        f.write("# Project Readme\n\n<!-- Created by Copilot Agent -->")
    print(f"Created {readme_path}")

print("Agent execution completed successfully!")
