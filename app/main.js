// Styles
import './assets/css/application.css';

// Modules
import core from './core/core.module';
import layout from './layout/layout.module';
import shared from './shared/shared.module';
import widgets from './widgets/widgets.module';
import logger from './shared/logger/logger.module';

angular.module('main', [
  core,
  layout,
  shared,
  widgets,
  logger
]);
