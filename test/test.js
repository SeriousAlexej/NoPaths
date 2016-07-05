var should = require('chai').should(),
	nopaths = require('../index'),
	path = require('path');

describe('#nopaths', function(){
	
	it('Home dir', function(){
		let str1 = 'I didn\'t know it was your table, ';
		let str2 = ' it\'s laid for a great many more than three.';
		nopaths(str1 + process.env.HOME + path.sep + str2).should.equal(str1 + str2);
	});
	
	it('Path entries', function(){
		let pathDirs = process.env.PATH.split(path.delimiter);
		for(let i=0; i<pathDirs.length; ++i)
		{
			if(pathDirs[i][pathDirs[i].length-1] != path.sep)
				pathDirs[i] = pathDirs[i] + path.sep;
			nopaths(pathDirs[i]).should.equal('');
		}
	});
	
	it('Path with updir', function(){
		// unix-specific
		if(process.platform !== 'win32')
		{
			nopaths('~/../../dev/').should.equal('');
		}
		else //win-specific
		{
			nopaths(process.env.HOME + '\\..\\').should.equal('');
		}
	});
	
	it('Relative path', function(){
		nopaths('././').should.equal('');
	});
	
});
