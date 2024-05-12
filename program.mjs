import { spawn } from 'node:child_process';
import fs from 'node:fs';

const readStream = fs.createReadStream('bigfile.txt');
const process = spawn('node', ['./number_formatter.mjs', 'out.txt', '$']);
readStream.pipe(process.stdin);

process.stdout.on('data', data => {
	console.log(data.toString());
});

process.on('close', code => {
	if (code === 0) {
		console.log('The file has been formatted');
	} else {
		console.error('An error occurred');
	}
});
