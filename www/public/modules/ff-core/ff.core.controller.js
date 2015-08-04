module.exports = ['$scope', '$location', 'ffToken', '$window', '$rootScope', '$http', 'ffCoreService', ffCoreController] 


/**
 * Represents the core controller, wrapping the 
 * whole app to assist with common features. 
 *
 * @ngdoc directive
 * @name ffCoreController
 * @see ff.coreModule
 */
function ffCoreController($scope, $location, ffToken, $window, $rootScope, $http, ffCoreService) {
  var vm = this; 
  var code;
  debugger;
  vm.formatDate = formatDate;
 
  ffCoreService.clearAll();
  loadToken();
  clearUrl();

  function formatDate(date){
    var dateOut = new Date(date);
    return dateOut;
  };
  
  function loadToken(){
    if(!$window.location.search) return;
    
    code = getParameterByName('code');
    $http.get('/authorize/?code='+ code)
         .success(getToken)
         .error(failToGetToken);
  }

  function getToken(data){
    vm.token = $rootScope.token = data.access_token;
    loadUserInfo();
  }
  
  function failToGetToken(error){
    vm.errorMessage = error;
  }

  function loadUserInfo(){
    ffCoreService.getUserInfo(updateUserInfo);
  }

  function updateUserInfo(userInfo){
    vm.userInfo = userInfo;
  }

  function clearUrl(){
    history.pushState("", document.title, $window.location.pathname);
    //$window.location.href = '/#/';
  }

  function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec($window.location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
}
