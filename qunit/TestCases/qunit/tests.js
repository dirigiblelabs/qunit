/* globals $ */
/* eslint-env node, dirigible */
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

require("core/globals").set("QUnit", QUnit);
require("qunit/reporters/qunit_console_reporter");

require("qunit/qunit_test_runner_svc").service(QUnit);
