import 'angular';
import 'angular-mocks';

import '../app/mocks/customMocks.module';

import '../app/main';

const testContext = require.context('../app/', true, /\.spec\.js$/);
testContext.keys().map(testContext);
