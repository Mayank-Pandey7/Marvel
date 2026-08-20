const fs = require('fs');

const content = fs.readFileSync('data/darkFamilyTree.ts', 'utf8');

const nodeRegex = /{\s*id:\s*"([^"]+)",[\s\S]*?name:\s*"([^"]+)",[\s\S]*?x:\s*(-?\d+),\s*y:\s*(-?\d+),/g;
const nodes = {};
let m;
while ((m = nodeRegex.exec(content)) !== null) {
  nodes[m[1]] = { id: m[1], name: m[2], x: parseInt(m[3]), y: parseInt(m[4]) };
}

const connRegex = /{\s*id:\s*"([^"]+)",\s*fromId:\s*"([^"]+)",\s*toId:\s*"([^"]+)",\s*type:\s*"([^"]+)"/g;
const conns = [];
while ((m = connRegex.exec(content)) !== null) {
  conns.push({ id: m[1], fromId: m[2], toId: m[3], type: m[4] });
}

console.log('--- Checking all partner connections ---');
const partners = conns.filter(c => c.type === 'partner');
for (const p of partners) {
  console.log(`Partner: ${p.fromId} <-> ${p.toId}`);
}

console.log('\n--- Checking all child connections ---');
const children = conns.filter(c => c.type === 'child');
for (const c of children) {
  const pConn = partners.find(p => p.fromId === c.fromId || p.toId === c.fromId);
  if (!pConn) {
    console.log(`Child without partner connection on parent: ${c.fromId} -> ${c.toId} (${c.id})`);
  }
}
