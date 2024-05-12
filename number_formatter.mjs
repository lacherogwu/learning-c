import { stdin } from 'node:process';
import fs from 'node:fs';

const [outputFile, prefix] = process.argv.slice(2);
const writeStream = fs.createWriteStream(outputFile);

for await (const items of readItems(stdin)) {
	const transformed = items.map(item => `${prefix}${item}`).join(' ') + ' ';
	const ok = writeStream.write(transformed);
	if (!ok) {
		await new Promise(resolve => writeStream.once('drain', resolve));
	}
}

async function* readItems(input) {
	let leftover = '';
	for await (const chunk of input) {
		const data = leftover + chunk.toString();
		const items = data.split(' ');
		leftover = items.pop();
		yield items;
	}
}
