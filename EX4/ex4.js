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

// **************************************
// The old-n-busted callback way

const getFile = file => 
	new Promise(resolve => {
			fakeAjax(file, resolve);
	});


['file1', 'file2', 'file3']
	.map(getFile)
	.reduce((acc, promise) => acc.then(() => promise).then(output), Promise.resolve())
	.then(() => output('Complete!'));