/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            dist: {
                files: [
                    { expand: true, cwd: 'bower_components/jquery/dist/', src: ['**'], dest: 'Scripts/' },
                    { expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: ['**'], dest: 'fonts/' },
                    { expand: true, cwd: 'bower_components/bootstrap/dist/js/', src: ['**'], dest: 'Scripts/' },
                    { expand: true, cwd: 'bower_components/jquery-validation/dist/', src: ['**'], dest: 'Scripts/' },
                    { expand: true, cwd: 'bower_components/jquery-validation-unobtrusive/src/', src: ['**'], dest: 'Scripts/' }
                ]
            }
        },
        less: {
            options: {
                ieCompat: true,
                strictMath: true
            },
            bootstrap: {
                src: 'less/_bootstrap.less',
                dest: 'Content/bootstrap.css'
            },
            theme: {
                src: 'less/_theme.less',
                dest: 'Content/bootstrap-theme.css'
            },
            site: {
                src: 'less/site.less',
                dest: 'Content/site.css'
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({ cascade: false })
                ]
            },
            bootstrap: {
                src: 'Content/bootstrap.css'
            },
            theme: {
                src: 'Content/bootstrap-theme.css'
            },
            site: {
                src: 'Content/site.css'
            }
        },
        cssmin: {
            options: {
                compatibility: 'ie9',
                level: {
                    1: {
                        specialComments: 'all'
                    }
                }
            },
            bootstrap: {
                src: 'Content/bootstrap.css',
                dest: 'Content/bootstrap.min.css'
            },
            theme: {
                src: 'Content/bootstrap-theme.css',
                dest: 'Content/bootstrap-theme.min.css'
            },
            site: {
                src: 'Content/site.css',
                dest: 'Content/site.min.css'
            }
        },
        uglify: {
            options: {
                compress: true,
                mangle: true,
                ie8: true
            },
            dist: {
                src: 'Scripts/main.js',
                dest: 'Scripts/main.min.js'
            }
        },
        modernizr: {
            dist: {
                crawl: false,
                customTests: [],
                dest: 'Scripts/modernizr-output.js',
                tests: [],
                options: [
                    'setClasses'
                ],
                uglify: true
            }
        },
        watch: {
            less: {
                files: ['less/**/*.less'],
                tasks: 'build:css'
            },
            js: {
                files: ['Scripts/**/*.js'],
                tasks: 'uglify'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-modernizr");
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build:css', ['less', 'postcss', 'cssmin']);
    grunt.registerTask('build', ['copy', 'build:css', 'uglify', 'modernizr']);
    grunt.registerTask('default', ['build', 'watch']);
};