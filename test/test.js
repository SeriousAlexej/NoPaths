var should = require('chai').should(),
	nopaths = require('../index'),
	path = require('path');

describe('#nopaths', function(){
	
	it('Home dir', function(){
		let str1 = 'I didn\'t know it was your table, ';
		let str2 = ' it\'s laid for a great many more than three.';
		nopaths(str1 + process.env.HOME + path.sep + str2).should.equal(str1 + str2);
	});
	
	it('Std entries', function(){
		
		// unix-specific
		if(process.platform !== 'win32')
		{
			nopaths('Hey /dev/').should.equal('Hey ');
		}
		else //win-specific
		{
			nopaths('Hey ' + process.env.APPDATA + path.sep).should.equal('Hey ');
		}
	});
	
	it('Path with updir', function(){
		// unix-specific
		if(process.platform !== 'win32')
		{
			nopaths('./../').should.equal('');
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
