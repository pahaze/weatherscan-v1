const express = require("express")
const fs = require('fs')
const path = require('path')

const readFiles = express();

readFiles.get('/readfiles', (req, res) => {
	const isFile = fileName => {
		return fs.lstatSync(path.join("main", fileName)).isFile();
	};
	
	const isMusicFile = fileName => {
		return fileName.endsWith(".mp3") || fileName.endsWith(".m4a") || fileName.endsWith(".opus") || fileName.endsWith(".ogg") || fileName.endsWith(".wav");
	};

	res.send(fs.readdirSync("main/music", {recursive: true}).map(fileName => {
		return path.join("music", fileName);
	}).filter(isFile).filter(isMusicFile));
});

readFiles.listen(8082, function() {
	console.log("Read Files Function open on port 8082");
});
