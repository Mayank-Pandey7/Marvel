const { execSync } = require('child_process');
const fs = require('fs');

console.log('=== Staging files ===');
execSync('git add -A', { stdio: 'inherit' });

console.log('=== Committing ===');
try {
  execSync('git commit -m "add What If and Marvel Zombies to multiverse timeline"', { stdio: 'inherit' });
} catch (e) {
  console.log('Commit note:', e.message);
}

console.log('=== Pushing ===');
try {
  execSync('git push', { stdio: 'inherit' });
  console.log('=== PUSH SUCCESSFUL ===');
} catch (e) {
  console.error('Push error:', e.message);
}
