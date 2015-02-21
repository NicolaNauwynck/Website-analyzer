angular.module("umbraco").controller("Analyze.MainController", function ($scope, $http, entityResource, analyzeService) {
    $scope.load = function () {
        analyzeService.getAllNodes().success(function (data) {
            console.log(data);
            $scope.allNodes = data;

            var publishedNodes = [];
            var unpublishedNodes = [];
            var trashedNodes = [];

            $.each(data, function (index, value) {
                if (value.status == "Published") {
                    publishedNodes.push(value);
                } else if (value.status == "Unpublished") {
                    unpublishedNodes.push(value);
                } else {
                    trashedNodes.push(value);
                }
            });
            $scope.publishedNodes = publishedNodes;
            $scope.unpublishedNodes = unpublishedNodes;
            $scope.trashedNodes = trashedNodes;

            $scope.publishedPercent = ((publishedNodes.length / data.length) * 100).toFixed(2);
            $scope.unpublishedPercent = ((unpublishedNodes.length / data.length) * 100).toFixed(2);
            $scope.trashedPercent = ((trashedNodes.length / data.length) * 100).toFixed(2);

            var ctx = document.getElementById("myChart").getContext("2d");
            var data = [
                {
                    value: publishedNodes.length,
                    color: "#F7464A",
                    highlight: "#FF5A5E",
                    label: "Published"
                },
                {
                    value: unpublishedNodes.length,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Unpublished"
                },
                {
                    value: trashedNodes.length,
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: "Trashed"
                }
            ]
            var pieChart = new Chart(ctx).Pie(data);

            setTimeout(function () {
                $('.analyze header').data("isOpen", false);
                $('.analyze header').click(function () {
                    if (!$(this).data("isOpen")) {
                        $(this).closest('section').children('table').css("display", "table");
                        $(this).data("isOpen", true);
                    } else {
                        $(this).closest('section').children('table').css("display", "none");
                        $(this).data("isOpen", false);
                    }
                });
            }, 1000);
        });
    }

    $scope.load();
});
