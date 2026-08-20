const fs = require('fs');

const content = fs.readFileSync('data/darkFamilyTree.ts', 'utf8');

const nodeRegex = /{\s*id:\s*"([^"]+)",[\s\S]*?x:\s*(-?\d+),\s*y:\s*(-?\d+),/g;
const nodes = {};
let m;
while ((m = nodeRegex.exec(content)) !== null) {
  nodes[m[1]] = { id: m[1], x: parseInt(m[2]), y: parseInt(m[3]) };
}

const connRegex = /{\s*id:\s*"([^"]+)",\s*fromId:\s*"([^"]+)",\s*toId:\s*"([^"]+)",\s*type:\s*"([^"]+)"/g;
const conns = [];
while ((m = connRegex.exec(content)) !== null) {
  conns.push({ id: m[1], fromId: m[2], toId: m[3], type: m[4] });
}

console.log('Total nodes:', Object.keys(nodes).length);
console.log('Total conns:', conns.length);

const CARD_W = 110;
const CARD_H = 142;

for (const conn of conns) {
  if (conn.type === 'child' || conn.type === 'creator') {
    const fromNode = nodes[conn.fromId];
    const toNode = nodes[conn.toId];
    if (!fromNode || !toNode) continue;

    const partnerConn = conns.find(c => c.type === 'partner' && (c.fromId === conn.fromId || c.toId === conn.fromId));
    let startX = fromNode.x + CARD_W / 2;
    if (partnerConn) {
      const p1 = nodes[partnerConn.fromId];
      const p2 = nodes[partnerConn.toId];
      if (p1 && p2 && Math.abs(p1.y - p2.y) < 30) {
        const leftP = p1.x < p2.x ? p1 : p2;
        const rightP = p1.x < p2.x ? p2 : p1;
        startX = (leftP.x + CARD_W + rightP.x) / 2;
      }
    }
    const endX = toNode.x + CARD_W / 2;
    const diff = Math.abs(startX - endX);
    if (diff > 0 && diff <= 30) {
      console.log(`Small alignment offset in ${conn.id}: from ${conn.fromId} (${startX}) to ${conn.toId} (${endX}), diff: ${diff}px`);
    }
  }
}
