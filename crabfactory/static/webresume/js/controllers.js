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
        resource_instance.remove = function(object) {
            resource.remove(object, function() {
                resource_instance.data.splice(resource_instance.data.indexOf(object), 1);
            });
        };
        resource_instance.update = function(education) {
            resource.update(education);
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

        $scope.save = function(education) {
            Education.update(education);
        };

        $scope.remove = function(education) {
            var r = confirm("You sure you want to remove this education?");
            if(r == true) {
                Education.remove(education);
            };
        };

        $scope.edit = function(education) {
            $scope.backup[education.id] = angular.copy(education);
        };

        $scope.cancel = function(education) {
            $scope.educations[$scope.educations.indexOf(education)] = $scope.backup[education.id];
        };
    });

