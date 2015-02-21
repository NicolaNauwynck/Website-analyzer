angular.module("umbraco.services").factory("analyzeService", function ($http) {
    return {
        getAllNodes: function () {
            return $http.get("/umbraco/backoffice/api/Analyze/GetAllNodes");
        }
    };
});