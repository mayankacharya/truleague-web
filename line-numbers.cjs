const fs = require('fs');
const lines = fs.readFileSync('src/components/IntegratedDashboard.css','utf8').replace(/\r/g,'').split('\n');
