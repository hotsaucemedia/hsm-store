'use strict';

// Javascript (EcmaScript), is a prototype based language for OOP, as opposed to Java which is class based
// The following will expose a HsmTest object when we require the module

// There is a good tutorial explaining prototype-based javascript for OOP at the link below
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Details_of_the_Object_Model

function HsmStore()
{
	// the local variable somedata is considered "private"
	// it is only accessible from the scope of this function
	var somePrivateData = "test from npm module!";

	this.displayLogMessage = function()
	{
		console.log(somePrivateData);
	}

	// member variables are considered "public"
	this.somePublicData = "another message!";


	// setter method
	this.setPublicMessage = function(newValue)
	{
		this.somePublicData = newValue;
	}

	this.displayPublicLogMessage = function()
	{
		console.log(this.somePublicData);
	}
}

module.exports = new HsmStore();
