const fs = require('fs')
const lines = fs.readFileSync('src/components/GrowEnrollment.css', 'utf8').split(/\\r?\\n/)
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('@media (max-width: 1000px)')) {
    for (let j = i; j < lines.length; j++) {
      console.log(`${String(j + 1).padStart(3, '0')}: ${lines[j]}`)
    }
    break
  }
}
