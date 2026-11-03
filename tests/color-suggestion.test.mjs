import assert from 'node:assert/strict';import fs from 'node:fs';import ts from 'typescript';
const code=ts.transpileModule(fs.readFileSync(new URL('../src/color-suggestion.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {BASIC_COLORS,suggestColor,splitColors}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
for(const c of BASIC_COLORS){const rgb=[1,3,5].map(i=>parseInt(c.hex.slice(i,i+2),16));const result=suggestColor(rgb);assert.equal(result.name,c.name);assert.equal(result.hex,c.hex);assert.equal(result.alternatives.length,2);assert.ok(!result.alternatives.includes(c.name))}
assert.equal(suggestColor([0,0,0]).name,'Preto');assert.equal(suggestColor([255,255,255]).name,'Branco');assert.deepEqual(splitColors(' Preto, , Verde sálvia, Preto '),['Preto','Verde sálvia']);
console.log('18 palette references, black/white and stored color-name normalization passed; no physical-color accuracy guarantee is asserted.');
