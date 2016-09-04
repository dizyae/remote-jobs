module.exports = {
  env: {
    browser: true,
    jasmine: true
  },
  extends: 'google',
  globals: {
    angular: true,
    inject: true
  },
  parserOptions: {
    'ecmaVersion': 5
  },
  plugins: [
    'angular',
    'jasmine'
  ],
  root: true,
  rules: {
    // General JavaScript Rules
    'max-len': [
      'error', 120
    ],
    'max-nested-callbacks': ['error', 10],
    'require-jsdoc': 0,
    // Angular Specific Rules
    'angular/angularelement': 1,
    'angular/controller-as': 2,
    'angular/controller-as-route': 2,
    'angular/controller-as-vm': [2, 'vm'],
    'angular/controller-name': [2, '/[A-Z].*Controller$/'],
    'angular/deferred': 0,
    'angular/definedundefined': 2,
    'angular/di': [2, 'function'],
    'angular/di-order': [0, true],
    'angular/directive-name': 0,
    'angular/component-limit': [0, 1],
    'angular/document-service': 2,
    'angular/empty-controller': 1,
    'angular/file-name': 0,
    'angular/filter-name': 0,
    'angular/foreach': 0,
    'angular/function-type': 0,
    'angular/interval-service': 2,
    'angular/json-functions': 2,
    'angular/log': 2,
    'angular/module-getter': 2,
    'angular/module-name': 2,
    'angular/module-setter': 2,
    'angular/no-angular-mock': 0,
    'angular/no-controller': 0,
    'angular/no-cookiestore': 2,
    'angular/no-jquery-angularelement': 2,
    'angular/no-private-call': 2,
    'angular/no-service-method': 2,
    'angular/no-services': [2, ['$http', '$resource', 'Restangular']],
    'angular/on-watch': 2,
    'angular/rest-service': 0,
    'angular/service-name': 2,
    'angular/timeout-service': 2,
    'angular/typecheck-array': 2,
    'angular/typecheck-date': 2,
    'angular/typecheck-function': 2,
    'angular/typecheck-number': 2,
    'angular/typecheck-object': 2,
    'angular/typecheck-string': 2,
    'angular/watchers-execution': [0, '$digest'],
    'angular/window-service': 2,
    'no-use-before-define': 0
  },
  settings: {
    angular: 1
  }
};