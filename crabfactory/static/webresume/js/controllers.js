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
        var resource_instance = {};
        resource_instance.data = [];
        resource_instance.create = function(object) {
            resource.create(object, function(object_with_id) {
                resource_instance.data.push(object_with_id);
            });
        };
        resource_instance.remove = function(index) {
            resource.remove(resource_instance.data[index], function() {
                resource_instance.data.splice(index, 1);
            });
        };
        resource_instance.update = function(index) {
            resource.update(resource_instance.data[index]);
        };
        resource_instance.get = function() {
            var result = resource.list(function() {
                resource_instance.data = result;
            });
        };
        resource_instance.list = function() {
            return resource_instance.data;
        };
        return resource_instance;
    }
}]);

app.service('Education', ['Resource', function(Resource) {
    return Resource(urls.education + '/:id', {
        id: '@id',
    });
}]);

app.controller('EducationCtrl',
    function($scope, Education) {
        $scope.backup = [];
        $scope.$watch(Education.list, function() {
            $scope.educations = Education.list();
        });

        Education.get();

        $scope.add = function(new_education) {
            Education.create(new_education);
            $scope.new_education = {};
        };

        $scope.save = function(index) {
            Education.update(index);
        };

        $scope.remove = function(index) {
            var r = confirm("You sure you want to remove this education?");
            if(r == true) {
                Education.remove(index);
            };
        };

        $scope.edit = function(index) {
            $scope.backup[index] = angular.copy($scope.educations[index]);
        };

        $scope.cancel = function(index) {
            $scope.educations[index] = $scope.backup[index];
        };
    });

