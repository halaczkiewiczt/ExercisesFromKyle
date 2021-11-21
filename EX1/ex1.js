function fakeAjax(url,cb) {
	const fake_responses = {
		"file1": "The first text",
		"file2": "The middle text",
		"file3": "The last text"
	};
	const randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

	console.log("Requesting: " + url);

	setTimeout(function(){
		cb(fake_responses[url]);
	},randomDelay);
}

function handlePriniting() {
	for (let i = 0; i < filesToLoad.length; i++) {
		const file = filesToLoad[i];
		if(!file.loaded) {
			break;
		} else {
			if(!file.printed) {
				console.log(file.text);
				file.printed = true;
				filesToLoad.length - 1 === i && console.log('Completed!');
			}
		}
	}
}

function getFile(url) {
	fakeAjax(url,function(text){
		const file = filesToLoad.find(file => file.url === url);
		file.loaded = true;
		file.text = text;
		handlePriniting();
	});
}

const filesToLoad = [
	{ url: 'file1', loaded: false, printed: false, text: '' },
	{ url: 'file2', loaded: false, printed: false, text: '' },
	{ url: 'file3', loaded: false, printed: false, text: '' }
]

filesToLoad.forEach(file => getFile(file.url));
