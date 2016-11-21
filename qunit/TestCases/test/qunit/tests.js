/* globals $ */
/* eslint-env node, dirigible */
var QUnit = require("test/qunit/qunit");

QUnit.config.notrycatch  = false;

QUnit.module('Module 1:');

QUnit.test("Test 1", function(assert) {
	assert.ok(true, 'Passing assertion');
	assert.ok(false, 'Failing assertion');
});

QUnit.test("Test 2", function(assert) {
	assert.ok(true, 'Passing assertion');
});

QUnit.test('Test with mocks', function(assert){

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

require("core/globals").set("QUnit", QUnit);
require("test/qunit/reporters/qunit_console_reporter");

require("test/qunit/qunit_test_runner_svc").service(QUnit);
