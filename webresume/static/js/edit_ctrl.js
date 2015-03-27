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
        resource_instance.update = function(object) {
            resource.update(object);
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

app.service('Person', ['Resource', function(Resource) {
    var resource = Resource(urls.person + '/:id', {
        id: '@id',
    });
    resource.get();
    return resource;
}]);

app.controller('PersonCtrl',
               function($scope, Person) {
                   $scope.backup = {};
                   $scope.$watch(Person.list, function() {
                       $scope.person = Person.list()[0];
                       if(_.isUndefined($scope.person)) {
                           $scope.person = {};
                       }
                   });

                   $scope.save = function(person) {
                       if(_.isUndefined(person.id)) {
                           Person.create(person);
                       }
                       else {
                           Person.update(person);
                       }
                       $scope.editing = false;
                   };

                   $scope.edit = function(person) {
                       $scope.backup = angular.copy(person);
                   };

                   $scope.cancel = function() {
                       $scope.person = $scope.backup;
                   };
               });

app.service('Education', ['Resource', function(Resource) {
    var resource = Resource(urls.education + '/:id', {
        id: '@id',
    });
    resource.get();
    return resource;
}]);

app.controller('EducationCtrl',
               function($scope, Education) {
                   $scope.backup = [];
                   $scope.$watch(Education.list, function() {
                       $scope.educations = Education.list();
                   });

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

app.service('WorkExperience', ['Resource', function(Resource) {
    var resource = Resource(urls.work_experience + '/:id', {
        id: '@id',
    });
    resource.get();
    return resource;
}]);

app.controller('WorkExperienceCtrl',
               function($scope, WorkExperience) {
                   $scope.backup = [];
                   $scope.$watch(WorkExperience.list, function() {
                       $scope.work_experiences = WorkExperience.list();
                   });

                   $scope.add = function(new_work_experience) {
                       WorkExperience.create(new_work_experience);
                       $scope.new_work_experience = {};
                   };

                   $scope.save = function(work_experience) {
                       WorkExperience.update(work_experience);
                   };

                   $scope.remove = function(work_experience) {
                       var r = confirm("You sure you want to remove this work experience?");
                       if(r == true) {
                           WorkExperience.remove(work_experience);
                       };
                   };

                   $scope.edit = function(work_experience) {
                       $scope.backup[work_experience.id] = angular.copy(work_experience);
                   };

                   $scope.cancel = function(work_experience) {
                       $scope.work_experiences[$scope.work_experiences.indexOf(work_experience)] = $scope.backup[work_experience.id];
                   };
               });

app.service('Project', ['Resource', function(Resource) {
    var resource = Resource(urls.project + '/:id', {
        id: '@id',
    });
    resource.get();
    return resource;
}]);

app.controller('ProjectCtrl',
               function($scope, Project) {
                   $scope.backup = [];
                   $scope.$watch(Project.list, function() {
                       $scope.projects = Project.list();
                   });

                   $scope.add = function(new_project) {
                       Project.create(new_project);
                       $scope.new_project = {};
                   };

                   $scope.save = function(project) {
                       Project.update(project);
                   };

                   $scope.remove = function(project) {
                       var r = confirm("You sure you want to remove this work experience?");
                       if(r == true) {
                           Project.remove(project);
                       };
                   };

                   $scope.edit = function(project) {
                       $scope.backup[project.id] = angular.copy(project);
                   };

                   $scope.cancel = function(project) {
                       $scope.projects[$scope.projects.indexOf(project)] = $scope.backup[project.id];
                   };
               });
