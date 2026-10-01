import {readFileSync} from 'node:fs';
import {ProductionCatalog,validateCatalog} from '../../src/knowledge/production-catalog.mjs';
try {
 const data=JSON.parse(readFileSync(new URL('./catalog.json',import.meta.url),'utf8'));
 const c=new ProductionCatalog(data),[command,...args]=process.argv.slice(2);
 let result;
 if(command==='status')result=c.summary();
 else if(command==='validate')result=validateCatalog(data);
 else if(command==='search')result=c.search(args.join(' '));
 else if(command==='show')result=c.get(args[0]);
 else if(command==='plan')result=c.plan(args);
 else if(command==='ledger')result=c.ledgerRecords();
 else throw new Error('Usage: query.mjs status|validate|search <words>|show <id>|plan <ids...>|ledger');
 console.log(JSON.stringify(result,null,2));
} catch(e) {console.error(JSON.stringify({ok:false,error:e.message}));process.exitCode=1;}
