# NoPaths

[![Build Status](https://travis-ci.org/SeriousAlexej/NoPaths.svg?branch=master)](https://travis-ci.org/SeriousAlexej/NoPaths)

This module removes valid filename paths from input string (filenames are kept).

## Installation

	'npm install nopaths'

## Usage
	
```js
var nopaths = require('nopaths');

var somePath = 'Hey, /home/username/Documents/sweet.txt was not touched!';
nopaths(somePath) === 'Hey, sweet.txt was not touched!'; //true, if /home/username/Documents/ exists
```

## Tests

	'npm test'
