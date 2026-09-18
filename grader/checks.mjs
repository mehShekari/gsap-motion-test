import fs from 'node:fs';
import path from 'node:path';

const root = process.argv[2] || process.cwd();
const files = [];
function walk(dir){
  if(!fs.existsSync(dir)) return;
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    if(['node_modules','.git','dist'].includes(entry.name)) continue;
    const p=path.join(dir,entry.name);
    if(entry.isDirectory()) walk(p); else files.push(p);
  }
}
walk(root);
const source=files.filter(f=>/\.(js|jsx|ts|tsx|css)$/.test(f)).map(f=>fs.readFileSync(f,'utf8')).join('\n');
const checks={
  uses_gsap:/\bgsap\b/i.test(source),
  uses_reduced_motion:/prefers-reduced-motion/.test(source),
  uses_transform_or_opacity:/\b(transform|opacity)\b/.test(source),
  has_hover:/mouseenter|mouseleave|pointerenter|pointerleave|hover/i.test(source),
  cleanup_signal:/contextSafe|revert\(|kill\(|cleanup|useEffect\(/i.test(source),
  avoids_framer_motion:!/@?framer-motion/.test(source),
  avoids_layout_animation:!/(width|height|top|left|margin|padding)\s*[:=]/i.test(source)
};
console.log(JSON.stringify({root,files:files.map(f=>path.relative(root,f)),checks},null,2));
