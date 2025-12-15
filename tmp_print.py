from pathlib import Path

lines = Path('src/components/GrowEnrollment.css').read_text().splitlines()
for i, line in enumerate(lines, 1):
    if '@media (max-width: 600px)' in line:
        for j in range(i, min(len(lines), i + 200)):
            print(f"{j+1:03d}: {lines[j]}")
        break
