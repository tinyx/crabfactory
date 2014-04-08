app.controller('SkillCtrl',
    function($scope, $resource) {
        var Skill = $resource( urls.skill + ':id',
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
        var WorkExperience = $resource( urls.work_experience + ':id',
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
        $scope.$on('got_person', function(event, args) {
            var work_experiences = WorkExperience.get({ person: args.person }, function() {
                $scope.work_experiences = work_experiences;
            });
        });
    });

app.controller('ProjectCtrl',
    function($scope, $resource) {
        var Project = $resource( urls.project + ':id',
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
        $scope.$on('got_person', function(event, args) {
            var projects = Project.get({ person: args.person }, function() {
                $scope.projects = projects;
            });
        });
    });

app.controller('PersonCtrl',
    function($scope, $resource, $rootScope) {
        var Person = $resource( urls.person,
            { user_id: user_id },
            { 'get': { method: 'GET', isArray: true }}
        );

        // Get the person object first, then initialize all the resources
        var person = Person.get({ user_id: user_id }, function() {
            $scope.person = person[0];
            person = person[0].id;
            $rootScope.$broadcast('got_person', { person: person });
                /*
                var neu = educations[0];
                neu.name = 'NEU';
                Education.put({
                    'id': neu.id,
                }, neu);
                */
        });
    }
);
