"""Self-contained static site checks. Run: python3 tests/check_site.py"""
from pathlib import Path
import re
import shutil
import subprocess
import sys

ROOT=Path(__file__).resolve().parents[1]
REQUIRED=['index.html','AGENTS.md','README.md','.nojekyll','assets/app.js','assets/styles.css','assets/favicon.svg','data/notes.js','docs/AI_CONTINUATION_EXAMPLE.md','docs/SUBMISSION_TEMPLATE.md']
def check(ok,msg):
    if not ok: raise AssertionError(msg)
    print('✓ '+msg)
def main():
    for item in REQUIRED: check((ROOT/item).is_file(),'Required file: '+item)
    html=(ROOT/'index.html').read_text(encoding='utf8')
    app=(ROOT/'assets/app.js').read_text(encoding='utf8')
    data=(ROOT/'data/notes.js').read_text(encoding='utf8')
    agents=(ROOT/'AGENTS.md').read_text(encoding='utf8')
    check('lang="zh-Hant"' in html,'Traditional Chinese page')
    check(all('id="'+i+'"' in html for i in ['searchInput','notesGrid','detailView','themeToggle','savedFilter']),'Essential UI hooks')
    check(all(x in html for x in ['./assets/styles.css','./assets/app.js','./data/notes.js']),'Relative static asset paths')
    check(not re.search(r'''(?:src|href)=["']/assets/''',html),'No root-absolute assets')
    check('escapeHTML' in app,'HTML escaping')
    check('window.SEMI_NOTES' in data,'Note data source')
    check(len(agents)>3000,'Detailed AGENTS rules')
    node=shutil.which('node')
    if node:
      for f in ['assets/app.js','data/notes.js']:
        r=subprocess.run([node,'--check',str(ROOT/f)],capture_output=True,text=True)
        check(r.returncode==0,'JS syntax: '+f+(' '+r.stderr if r.returncode else ''))
      js="""const fs=require('fs'),vm=require('vm'),ctx={window:{}};vm.runInNewContext(fs.readFileSync(process.argv[1],'utf8'),ctx);
const n=ctx.window.SEMI_NOTES,ids=new Set(),cats=['材料與能帶','載子與傳輸','元件與接面','寬能隙材料'];
if(!Array.isArray(n)||n.length<9)throw Error('At least nine notes required');
for(const item of n){if(!item.id||ids.has(item.id)||!cats.includes(item.chapter))throw Error('Bad note id/chapter');ids.add(item.id);
for(const k of ['title','subtitle','summary','level','pitfall'])if(typeof item[k]!=='string'||!item[k].trim())throw Error('Missing '+k);
if(!Number.isInteger(item.minutes)||item.minutes<=0||!Array.isArray(item.tags)||item.tags.length<2||!Array.isArray(item.points)||item.points.length<3||!Array.isArray(item.formulas)||item.formulas.length<1||!item.check?.question||!item.check?.answer)throw Error('Incomplete note '+item.id);}
if(!cats.every(c=>n.some(x=>x.chapter===c)))throw Error('Missing chapter');
console.log('Validated '+n.length+' unique notes across four chapters');"""
      r=subprocess.run([node,'-e',js,str(ROOT/'data/notes.js')],capture_output=True,text=True)
      check(r.returncode==0,'Data schema '+(r.stderr if r.returncode else ''))
      print(r.stdout.strip())
    else: print('! Node.js not found; syntax and data checks skipped')
    print('ALL CHECKS PASSED')
if __name__=='__main__':
  try: main()
  except AssertionError as e: print('FAILED: '+str(e),file=sys.stderr);sys.exit(1)
