var app = angular.module('apiApp', ['ui.router']);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('about',
            {
                url: '/about',
                templateUrl: 'partials/api_v1/about.html',
                controller: 'aboutCtrl'
            })
        .state('doc',
            {
                url: '/doc/:docID',
                templateUrl: 'partials/api_v1/doc.html',
                controller: 'docCtrl'
            });
    $urlRouterProvider.otherwise('/about');
});
// ['$routeProvider', function ($routeProvider) {
//     $routeProvider
//         .when('/about',
//             {
//                 templateUrl: 'partials/api_v1/about.html',
//                 controller: 'aboutCtrl'
//             }
//         )
//         .when('/doc/:docID',
//             {
//                 templateUrl: 'partials/api_v1/doc.html',
//                 controller: 'docCtrl'
//             }
//         )
//         .otherwise({redirectTo: '/about'})
// }]

app.controller('apiCtrl', function ($scope, $document, apiService, $state) {
    // $(document).ready(function () {
    //
    // });
    $document.ready(function () {
        initCollapse();
        initScrollSpy();
        reqChapterList();
    });

    $scope.showChapter = function (chapterID) {
        $state.go('doc', {docID: chapterID});
    };

    $scope.$on("marked", function (event, data) {
        $.each($scope.chapters, function (index, val) {
            if (data == val._id) {
                $scope.chapters[index].marked = !$scope.chapters[index].marked;
                return;
            }
        });
    });
    //向子级发送广播
    // $scope.$broadcast("someEvent", {});

    function reqChapterList() {
        apiService.getChapterList()
            .success(function (res) {
                $scope.chapters = res;
            })
            .error(function (res) {
                console.log(res);
            });
    }

    function initCollapse() {
        $('.button-collapse').sideNav(
            {
                menuWidth: 300,
                edge: 'left',
                closeOnclick: false,
                draggable: true
            }
        )
    }

    function initScrollSpy() {
        setTimeout(function () {
            $('.toc-wrapper').pushpin(
                {
                    top: $('#index-banner').height()
                }
            )
        }, 100);
        $('.scrollspy').scrollSpy();
    }
})
    .controller('aboutCtrl', function ($scope, $document) {
        $document.ready(function () {
            initScrollSpy();
        });

        function initScrollSpy() {
            setTimeout(function () {
                $('.toc-wrapper').pushpin(
                    {
                        top: $('#index-banner').height()
                    }
                )
            }, 100);
            $('.scrollspy').scrollSpy();
        }
    })
    .controller('docCtrl', function ($scope, $document, $state, $stateParams, apiService) {
        $(document).ready(function () {
            getDocs($stateParams.docID);
            // initScrollSpy();
        });

        $scope.test = function () {

        };

        $scope.markChapter = function () {
            if (!$scope.chapter)
                return;

            apiService
                .updateChapter($scope.chapter._id, {marked: !$scope.chapter.marked})
                .success(function (res) {
                    $scope.chapter.marked = !$scope.chapter.marked;
                    //向父级发送广播
                    $scope.$emit('marked', $scope.chapter._id);
                })
                .error(function (err) {
                    Materialize.toast(err.msg, 2000);
                });
        };

        function getDocs(chapterID) {
            apiService.getDocByChapterID(chapterID)
                .success(function (res) {
                    $scope.chapter = res;
                    setTimeout(function () {
                        initScrollSpy();
                        Prism.highlightAll();
                        // var block = document.getElementById('some-code')
                        // Prism.highlightElement(block);
                        //
                        //     // Using JQuery
                        // Prism.highlightElement($('#some-code')[0]);
                    }, 50);
                    console.log(res);
                })
                .error(function (res) {
                    console.log(res);
                });
        }

        function initScrollSpy() {
            setTimeout(function () {
                $('.toc-wrapper').pushpin(
                    {
                        top: $('#index-banner').height()
                    }
                )
            }, 100);
            $('.scrollspy').scrollSpy();
        }
    });

app.service('apiService', function ($http) {
    return {
        getChapterList: function () {
            return $http.get('/api_v1/v1/chapters');
        },
        getDocByChapterID: function (chapterID) {
            return $http.get('./api_v1/v1/chapters/' + chapterID + '/docs');
        },
        updateChapter: function (chapterID, data) {
            return $http.put('./api_v1/v1/chapters/' + chapterID, data);
        },
        formatJson: function (txt, compress/*是否为压缩模式*/) {/* 格式化JSON源码(对象转换为JSON文本) */
            var indentChar = '    ';
            if (/^\s*$/.test(txt)) {
                alert('数据为空,无法格式化! ');
                return;
            }
            try {
                var data = eval('(' + txt + ')');
            }
            catch (e) {
                alert('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
                return;
            }
            var draw = [], last = false, This = this, line = compress ? '' : '\n', nodeCount = 0, maxDepth = 0;

            var notify = function (name, value, isLast, indent/*缩进*/, formObj) {
                nodeCount++;
                /*节点计数*/
                for (var i = 0, tab = ''; i < indent; i++)tab += indentChar;
                /* 缩进HTML */
                tab = compress ? '' : tab;
                /*压缩模式忽略缩进*/
                maxDepth = ++indent;
                /*缩进递增并记录*/
                if (value && value.constructor == Array) {/*处理数组*/
                    draw.push(tab + (formObj ? ('"' + name + '":') : '') + '[' + line);
                    /*缩进'[' 然后换行*/
                    for (var i = 0; i < value.length; i++)
                        notify(i, value[i], i == value.length - 1, indent, false);
                    draw.push(tab + ']' + (isLast ? line : (',' + line)));
                    /*缩进']'换行,若非尾元素则添加逗号*/
                } else if (value && typeof value == 'object') {/*处理对象*/
                    draw.push(tab + (formObj ? ('"' + name + '":') : '') + '{' + line);
                    /*缩进'{' 然后换行*/
                    var len = 0, i = 0;
                    for (var key in value)len++;
                    for (var key in value)notify(key, value[key], ++i == len, indent, true);
                    draw.push(tab + '}' + (isLast ? line : (',' + line)));
                    /*缩进'}'换行,若非尾元素则添加逗号*/
                } else {
                    if (typeof value == 'string') value = '"' + value + '"';
                    draw.push(tab + (formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ',') + line);
                }
            };
            var isLast = true, indent = 0;
            notify('', data, isLast, indent, false);
            return draw.join('');
        }
    }
});
app.filter('reqFilter', function (apiService) {
    return function (request, params) {
        var result = '';
        if (params == 'res') {
            if (request.name) {
                result = ('//' + request.name + '\n');
            }
            result += (request.code + ' ' + request.status);

            if (request.body) {
                result += ('\n' + apiService.formatJson(request.body));
            }
        } else if (params == 'req') {

            $.each(request.body.urlencoded, function (index, val) {
                result = result + val.key + ':' + val.value + '\n';
            });
            if (request.body.raw) {
                result += ( request.body.raw);
            }

            if (request.body.urlencoded.length = 0 && !request.body.raw) {
                result = '';
            }

        } else {
            var a = document.createElement('a');
            a.href = request.url;
            result = request.method + ' ' + a.pathname + ' ' + 'HTTP/1.1' + '\n'
                + 'HOST:' + ' ' + a.host;

            $.each(request.header, function (index, val) {
                result = result + '\n' + val.key + ':' + val.value;
            });

        }
        return result;
    }
});