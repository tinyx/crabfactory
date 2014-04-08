app.factory('Resource', ['$resource', function($resource) {
    return function(url, params, methods) {
        var defaults = {
            'create': { method: 'POST' },
            'delete': { method: 'DELETE' },
            'update': { method: 'PUT' },
            'get': { method: 'GET', isArray: true },
        }

        methods = angular.extend(defaults, methods);
        var resource = $resource(url, params, methods);

        resource.prototype.$save = function() {
            if(!this.id) {
                return this.$create();
            }
            else {
                return this.$update();
            }
        }
    }
}]);

app.service('Skill', ['Resource', function($resource) {
    return $resource(urls.skill + '/:id', {
                        id: '@id',
                        person: '@person'
                     });
}]);
app.controller('SkillCtrl',
    function($scope, Skill) {
        $scope.$on('got_person', function(event, args) {
            var skills = Skill.get({ person: args.person }, function() {
                $scope.skills = skills;
            });
        });
    });

app.service('Education', ['Resource', function($resource) {
    return $resource(urls.education + '/:id', {
                        id: '@id',
                        person: '@person'
                     });
}]);
app.controller('EducationCtrl',
    function($scope, Education) {
        $scope.$on('got_person', function(event, args) {
            var educations = Education.get({ person: args.person }, function() {
                $scope.educations = educations;
            });
        });
    });

app.service('WorkExperience', ['Resource', function($resource) {
    return $resource(urls.work_experience + '/:id', {
                        id: '@id',
                        person: '@person'
                     });
}]);
app.controller('WorkExperienceCtrl',
    function($scope, WorkExperience) {
        $scope.$on('got_person', function(event, args) {
            var work_experiences = WorkExperience.get({ person: args.person }, function() {
                $scope.work_experiences = work_experiences;
            });
        });
    });

app.service('Project', ['Resource', function($resource) {
    return $resource(urls.project + '/:id', {
                        id: '@id',
                        person: '@person'
                     });
}]);
app.controller('ProjectCtrl',
    function($scope, Project) {
        $scope.$on('got_person', function(event, args) {
            var projects = Project.get({ person: args.person }, function() {
                $scope.projects = projects;
            });
        });
    });

app.controller('PersonCtrl',
    function($scope, $resource, $rootScope) {
        var Person = $resource( urls.person + '/:id',
            { id: '@id' },
            {
                'post': { method: 'POST' },
                'put': { method: 'PUT' },
                'get': { method: 'GET', isArray: true },
            }
        );
        $scope.save = function(person) {
            if(person.id) {
                Person.put(person, function() {
                    console.log("Succeed");
                });
            }
            else {
                Person.post(person, function() {
                    console.log("Succeed");
                });
            }
        }

        // Get the person object first, then initialize all the resources
        var person = Person.get({ user_id: user_id }, function() {
            if(!_.isEmpty(person)) {
                $scope.person = person[0];
                person = person[0].id;
                $rootScope.$broadcast('got_person', { person: person });
            }
        });
    }
);
/*
app.controller('SkillCtrl',
    function($scope, $resource) {
        var Skill = $resource( urls.skill + '/:id',
        {
            id: '@id',
            person: '@person',
        },
        {
            'post': { method: 'POST' },
            'delete': { method: 'DELETE' },
            'put': { method: 'PUT' },
            'get': { method: 'GET', isArray: true },
        }
        );
        $scope.add = function(skill) {
            skill.person = $scope.person;
            Skill.post(skill, function(skill_with_id) {
                console.log("Succeed");
                skill.id = skill_with_id.id;
                $scope.skills.push(skill);
                $scope.new_skill = {};
            });
        };
        $scope.save = function(index) {
            Skill.put($scope.skills[index], function() {
                console.log("Succeed");
            });
        };
        $scope.remove = function(index) {
            Skill.delete($scope.skills[index], function() {
                console.log("Succeed");
                $scope.skills.splice(index, 1);
            })
        }
        $scope.$on('got_person', function(event, args) {
            var skills = Skill.get({ person: args.person }, function() {
                $scope.skills = skills;
            });
        });
    });

app.controller('EducationCtrl',
    function($scope, $resource) {
        var Education = $resource( urls.education + '/:id',
        {
            id: '@id',
        },
        {
            'post': { method: 'POST' },
            'delete': { method: 'DELETE' },
            'put': { method: 'PUT' },
            'get': { method: 'GET', isArray: true },
        }
        );
        $scope.add = function(education) {
            education.person = $scope.person;
            Education.post(education, function(education_with_id) {
                console.log("Succeed");
                education.id = education_with_id.id;
                $scope.educations.push(education);
                $scope.new_education = {};
            });
        };
        $scope.save = function(index) {
            Education.put($scope.educations[index], function() {
                console.log("Succeed");
            });
        };
        $scope.remove = function(index) {
            Education.delete($scope.educations[index], function() {
                console.log("Succeed");
                $scope.educations.splice(index, 1);
            })
        }
        $scope.$on('got_person', function(event, args) {
            var educations = Education.get({ person: args.person }, function() {
                $scope.educations = educations;
                $scope.person = args.person;
            });
        });
    });

app.controller('WorkExperienceCtrl',
    function($scope, $resource) {
        var WorkExperience = $resource( urls.work_experience + '/:id',
        {
            id: '@id',
            person: '@person',
        },
        {
            'post': { method: 'POST' },
            'delete': { method: 'DELETE' },
            'put': { method: 'PUT' },
            'get': { method: 'GET', isArray: true },
        }
        );
        $scope.add = function(work_experience) {
            work_experience.person = $scope.person;
            WorkExperience.post(work_experience, function(work_experience_with_id) {
                console.log("Succeed");
                work_experience.id = work_experience_with_id.id;
                $scope.work_experiences.push(work_experience);
                $scope.new_work_experience = {};
            });
        };
        $scope.save = function(index) {
            WorkExperience.put($scope.work_experiences[index], function() {
                console.log("Succeed");
            });
        };
        $scope.remove = function(index) {
            WorkExperience.delete($scope.work_experiences[index], function() {
                console.log("Succeed");
                $scope.work_experiences.splice(index, 1);
            })
        }
        $scope.$on('got_person', function(event, args) {
            var work_experiences = WorkExperience.get({ person: args.person }, function() {
                $scope.work_experiences = work_experiences;
            });
        });
    });

app.controller('ProjectCtrl',
    function($scope, $resource) {
        var Project = $resource( urls.project + '/:id',
        {
            id: '@id',
            person: '@person',
        },
        {
            'post': { method: 'POST' },
            'delete': { method: 'DELETE' },
            'put': { method: 'PUT' },
            'get': { method: 'GET', isArray: true },
        }
        );
        $scope.add = function(project) {
            project.person = $scope.person;
            Project.post(project, function(project_with_id) {
                console.log("Succeed");
                project.id = project_with_id.id;
                $scope.projects.push(project);
                $scope.new_project = {};
            });
        };
        $scope.save = function(index) {
            Project.put($scope.projects[index], function() {
                console.log("Succeed");
            });
        };
        $scope.remove = function(index) {
            Project.delete($scope.projects[index], function() {
                console.log("Succeed");
                $scope.projects.splice(index, 1);
            })
        }
        $scope.$on('got_person', function(event, args) {
            var projects = Project.get({ person: args.person }, function() {
                $scope.projects = projects;
            });
        });
    });

app.controller('PersonCtrl',
    function($scope, $resource, $rootScope) {
        var Person = $resource( urls.person + '/:id',
            { id: '@id' },
            {
                'post': { method: 'POST' },
                'put': { method: 'PUT' },
                'get': { method: 'GET', isArray: true },
            }
        );
        $scope.save = function(person) {
            if(person.id) {
                Person.put(person, function() {
                    console.log("Succeed");
                });
            }
            else {
                Person.post(person, function() {
                    console.log("Succeed");
                });
            }
        }

        // Get the person object first, then initialize all the resources
        var person = Person.get({ user_id: user_id }, function() {
            if(!_.isEmpty(person)) {
                $scope.person = person[0];
                person = person[0].id;
                $rootScope.$broadcast('got_person', { person: person });
            }
        });
    }
);
*/
