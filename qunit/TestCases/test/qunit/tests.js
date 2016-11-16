/* globals $ */
/* eslint-env node, dirigible */
var q = require("test/qunit/qunit_svc");

q.QUnit.config.notrycatch  = true;

q.QUnit.module('Module 1');

q.QUnit.test("Test 1", function(assert) {
	assert.ok(true, 'Passing assertion');
	assert.ok(false, 'Failing assertion');
});

q.QUnit.service();