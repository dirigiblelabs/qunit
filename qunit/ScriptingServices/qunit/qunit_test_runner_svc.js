/* globals $ */
/* eslint-env node, dirigible */
(function(){
"use strict";
	exports.service = function(QUnit){
		var _QUnit = QUnit || require('core/globals').get('QUnit');
		var svc_reporter = require("qunit/reporters/qunit_svc_reporter");
		require("test/test_runner_svc").service({
			"execute": function(){
					_QUnit.load();
				},
			"serviceReporter": svc_reporter 
		});	
	};
})();
