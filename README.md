# qunit
QUnit module for testing JavaScript services in Dirigible 

Usage
<pre>
var QUnit = require("qunit/qunit");

QUnit.config.notrycatch  = false;

QUnit.module('Module 1:');

QUnit.test("Test 1", function(assert) {
	assert.ok(true, 'Passing assertion');
	assert.ok(false, 'Failing assertion');
});

QUnit.test("Test 2", function(assert) {
	assert.ok(true, 'Passing assertion');
});

require("qunit/qunit_test_runner_svc").service(QUnit);
</pre>

Provides two result reporters. One to support the test runner service and one that outputs to the console. Both can be used together.
To enable the console reporter:
<pre>
require("core/globals").set("QUnit", QUnit);
require("qunit/reporters/qunit_console_reporter");
</pre>

Can be complemented also with JsMockito, JsHamcrest assertions for mocks:

1. add dependency to the JsMockito/JsHamcrest library in the project.json
<pre>
"dependencies": [
        {
            "guid":"jsmockito",
            "type": "git",
            "url": "https://github.com/dirigiblelabs/jsmockito.git",
            "branch":"master"
    	}
	]
</pre>

2. load and use
<pre>
QUnit.test('Test with hamcrest assertions', function(assert){

	var mockito = require('jsmockito/jsmockito').JsMockito;
	var hamcrest = require('jsmockito/jshamcrest').JsHamcrest;
	hamcrest.Integration.QUnit({scope: QUnit});
	
	var mockedFunc = mockito.mockFunction();
	
	//stubbing
	mockito.when(mockedFunc)(0).thenReturn('f');
	mockito.when(mockedFunc)(1).thenThrow('An exception');
	mockito.when(mockedFunc)(2).then(function() { return 1+2; });
	
	//the following returns "f"
	QUnit.assertThat(mockedFunc(0), QUnit.equalTo('f'), undefined, assert);
	
	//the following throws exception 'An exception'
	var ex;
	try {
	  mockedFunc(1);
	} catch (e) {
	  ex = e;
	}
	QUnit.assertThat(ex, QUnit.equalTo('An exception'), undefined, assert);
	
	//the following invokes the stub method, which returns 3
	QUnit.assertThat(mockedFunc(2), QUnit.equalTo(3), undefined, assert);
});
</pre>
