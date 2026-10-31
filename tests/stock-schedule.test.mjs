import {readFile,writeFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';
import assert from 'node:assert/strict';
const file=join(tmpdir(),'dolce-stock-schedule-test.mjs');
await writeFile(file,ts.transpileModule(await readFile(new URL('../src/stock-schedule.ts',import.meta.url),'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText);
const {stockSchedule,reviewLabel}=await import(pathToFileURL(file));
const d=s=>Date.parse(s+'-03:00');
const cases=[
 ['weekday before opening','2026-10-30T08:59:00',null,false,'2026-10-30T09:00:00'],
 ['Friday opening','2026-10-30T09:00:00',null,true,'2026-10-31T09:00:00'],
 ['Friday closing','2026-10-30T18:00:00',null,false,'2026-10-31T09:00:00'],
 ['Saturday morning','2026-10-31T09:00:00',null,true,'2026-11-02T09:00:00'],
 ['Saturday closing','2026-10-31T13:00:00',null,false,'2026-11-02T09:00:00'],
 ['Sunday','2026-11-01T11:00:00',null,false,'2026-11-02T09:00:00'],
];
for(const [name,now,review,open,next] of cases){const r=stockSchedule(d(now),review);assert.equal(r.open,open,name);assert.equal(r.nextOpening,d(next),name);assert.equal(r.due,null,name)}
let r=stockSchedule(d('2026-10-30T10:30:00'),'2026-10-30T10:00:00-03:00');assert.equal(r.minutes,30);assert.equal(r.pending,false);
r=stockSchedule(d('2026-10-30T11:00:00'),'2026-10-30T10:00:00-03:00');assert.equal(r.pending,true);
r=stockSchedule(d('2026-10-31T09:01:00'),'2026-10-30T17:00:00-03:00');assert.equal(r.pending,true);assert.equal(r.due,d('2026-10-31T09:00:00'));
r=stockSchedule(d('2026-10-31T12:45:00'),'2026-10-31T12:30:00-03:00');assert.equal(r.due,d('2026-11-02T09:00:00'));assert.equal(r.pending,false);
assert.match(reviewLabel(null,d('2026-10-31T12:45:00')),/Aguardando/);
assert.match(reviewLabel('2026-10-31T11:00:00-03:00',d('2026-10-31T12:45:00')),/hoje às 11:00/);
assert.match(reviewLabel('2026-10-30T17:00:00-03:00',d('2026-10-31T09:00:00')),/em 30\/10 às 17:00/);
console.log('13 business-hour, overdue, timezone and truthful-label checks passed');
