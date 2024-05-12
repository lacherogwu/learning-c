import { stdin } from 'node:process';
import fs from 'node:fs';

const [outputFile, prefix] = process.argv.slice(2);
const writeStream = fs.createWriteStream(outputFile);

for await (const item of readItems(stdin)) {
	const transformed = `${prefix}${item}`;
	const ok = writeStream.write(transformed);
	if (!ok) {
		await new Promise(resolve => writeStream.once('drain', resolve));
	}
}

async function* readItems(input) {
	for await (const chunk of input) {
		const data = chunk.toString();
		let index = 0;
		let item = '';
		while (index < data.length) {
			const char = data[index++];
			if (char === ' ') {
				if (item) {
					yield item;
					item = '';
				}
				yield char;
			} else {
				item += char;
			}
		}
		if (item) {
			yield item;
		}
	}
}
