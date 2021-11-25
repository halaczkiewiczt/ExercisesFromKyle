const fakeAjax = (url,cb) => {
	const fake_responses = {
		'file1': 'The first text',
		'file2': 'The middle text',
		'file3': 'The last text'
	};
	const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log(`Requesting: ${url}`);

	setTimeout(() => cb(fake_responses[url]), randomDelay);
}

const output = text => {
	console.log(text);
}

const getFile = file => 
	new Promise(resolve => {
			fakeAjax(file, resolve);
	});

const promise1 = getFile('file1');
const promise2 = getFile('file2');
const promise3 = getFile('file3');

promise1
	.then(output)
	.then(() => promise3)
	.then(output)
	.then(() => promise2)
	.then(output)
	.then(() => output('Complete!'))
