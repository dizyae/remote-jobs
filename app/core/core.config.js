configure.$inject = ['$logProvider'];

export function configure($logProvider) {
  $logProvider.debugEnabled = true;
}
