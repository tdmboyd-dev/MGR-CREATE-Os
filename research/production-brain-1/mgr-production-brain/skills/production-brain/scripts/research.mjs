import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {ProductionCatalog,validateCatalog} from './catalog.mjs';
try {
  const data=JSON.parse(readFileSync(fileURLToPath(new URL('../assets/production-knowledge.json',import.meta.url)),'utf8'));
  const catalog=new ProductionCatalog(data);
  const [command,...args]=process.argv.slice(2);
  let result;
  if(command==='status')result=catalog.summary();
  else if(command==='validate')result=validateCatalog(data);
  else if(command==='search')result=catalog.search(args.join(' '));
  else if(command==='show')result=catalog.get(args[0]);
  else if(command==='plan')result=catalog.plan(args);
  else if(command==='ledger')result=catalog.ledgerRecords();
  else throw new Error('Usage: research.mjs status|validate|search <words>|show <track>|plan <tracks...>|ledger');
  process.stdout.write(JSON.stringify(result,null,2)+'\n');
} catch(error) {process.stderr.write(JSON.stringify({ok:false,error:error.message})+'\n');process.exitCode=1;}
