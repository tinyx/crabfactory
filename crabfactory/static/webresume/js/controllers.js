app.factory('Resource', ['$resource', function($resource) {
    return function(url, params, methods) {
        var defaults = {
            'create': { method: 'POST' },
            'remove': { method: 'DELETE' },
            'update': { method: 'PUT' },
            'list': { method: 'GET', isArray: true },
        }

        methods = angular.extend(defaults, methods);
        var resource = $resource(url, params, methods);
        return {
            data: [],
            create: function(object) {
                //object.user = null;
                resource.create(object, function(object_with_id) {
                    this.data.push(object_with_id);
                });
            },
            remove: function(index) {
                resource.remove(data[index], function() {
                    this.data.splice(index, 1);
                });
            },
            update: function(index) {
                resource.update(object[index]);
            },
            get: function() {
                var result = resource.list(function() {
                    this.data = result;
                });
            },
            list: function() {
                return this.data;
            },
        };
    }
}]);

app.service('Education', ['Resource', function(Resource) {
    return Resource(urls.education + '/:id', {
        id: '@id',
    });
}]);

app.controller('EducationCtrl',
    function($scope, Education) {
        $scope.educations = [];

        $scope.$watch(Education.list, function() {
            $scope.educations = Education.list();
        });
        $scope.add = function(education) {
            Education.create(education, function(education_with_id) {
                console.log("Create education succeed.");
            });
        };
    });

