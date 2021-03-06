angular
  .module('webmakerApp.services', [])
  .constant('CONFIG', window.angularConfig)
  .filter('decodeURI', function () {
    return function (input) {
      return decodeURIComponent(input);
    };
  })
  .factory('wmNav', [
    '$rootScope',
    function ($rootScope) {

      var activePage = '';
      var activeSection = '';

      return {
        page: function (page) {
          if (page || page === '') {
            activePage = page;
            $rootScope.currentPageId = 'page-' + page;
          }
          return activePage;
        },
        section: function (section) {
          if (section || section === '') {
            activeSection = section;
            $rootScope.currentSectionId = section;
          }
          return activeSection;
        }
      };
    }
  ])
  .factory('weblit', [
    '$window',
    function ($window) {
      var weblit = new $window.WebLiteracyClient();
      return weblit;
    }
  ])
  .factory('wmAnalytics', [
    '$window',
    function ($window) {
      return $window.analytics;
    }
  ])
  .factory('makeapi', ['$q', '$window',
    function ($q, $window) {

      var makeapi = new $window.Make({
        apiURL: 'https://makeapi.webmaker.org'
      });

      return {
        makeapi: makeapi,
        tags: function (tags, callback) {
          var deferred = $q.defer();
          makeapi
            .sortByField('likes')
            .limit(4)
            .find({
              tags: [{
                tags: tags
              }],
              orderBy: 'likes'
            })
            .then(function (err, makes) {
              if (err) {
                deferred.reject(err);
              } else {
                deferred.resolve(makes);
              }
            });
          return deferred.promise;
        }
      };

    }
  ]);
