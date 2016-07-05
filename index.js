'use strict';

var fs = require('fs');

function isDirectory(path)
{
	let isDir = false;
	try
	{
		isDir = fs.statSync(path).isDirectory();
	}
	catch(e) {}
	
	return isDir;
}

function isUnixLike()
{
	return process.platform !== 'win32';
}

/**
 * Removes valid filesystem paths from input string (filenames are kept).
 * @param {String} inputStr
 * @return {String}
 */
module.exports = function(inputStr)
{
	if(typeof inputStr !== "string")
		throw new TypeError("input argument should be a string, but got " + typeof inputStr);
	
	let inStrCopy = inputStr;
	let returnStr = "";
	let prevMatchedEnd = -1;
	let matched = {};
	let accumPath = "";
	let trimStart = 0;
	let trimEnd = 0;
	let posOffset = 0;
	//          [path-root]   delim   path-elem (followed by delim or EOL)   'global' flag is omitted deliberately
	const pathElement = isUnixLike() ? /(?:~|\.{1,2})?(\/|\\{1,2})[^\/]+(?=(?:\1|$))/
	                    /*windows*/  : /(?:[a-zA-Z]:|\.{1,2})?(\/|\\{1,2})[^\/\\:*?"<>|]+(?=(?:\1|$))/;
	
	while(matched = pathElement.exec(inputStr))
	{		
		if(prevMatchedEnd !== matched.index + posOffset) //there is something between 2 matches
		{
			trimEnd = matched.index + posOffset;
			returnStr += inStrCopy.substring(trimStart, trimEnd);
			trimStart = trimEnd;
			accumPath = ""; //path is not valid anymore, reset
		}
		
		if(isDirectory(accumPath + matched[0]))
		{
			accumPath += matched[0];
			prevMatchedEnd = posOffset + matched.index + matched[0].length;
			trimStart = prevMatchedEnd + 1; //current match is still a part of valid path, shift trim position to skip it
			posOffset = prevMatchedEnd;
			inputStr = inputStr.substring(matched.index + matched[0].length); //replace match to avoid loop
		} else {
			//save last 2 chars, as they might be part of [path-root] of next match
			posOffset = matched.index + matched[0].length - 2;
			inputStr = inputStr.substring(matched.index + matched[0].length - 2);
		}
	}
	
	returnStr += inStrCopy.substring(trimStart); //last bit of string
	
	return returnStr;
}
