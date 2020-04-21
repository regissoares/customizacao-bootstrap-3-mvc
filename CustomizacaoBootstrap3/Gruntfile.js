/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            dist: {
                files: [
                    { expand: true, cwd: 'bower_components/jquery/dist/', src: ['**'], dest: 'js/' },
                    { expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: ['**'], dest: 'fonts/' },
                    { expand: true, cwd: 'bower_components/bootstrap/dist/js/', src: ['**'], dest: 'js/' },
                    { expand: true, cwd: 'bower_components/jquery-validation/dist/', src: ['**'], dest: 'js/' },
                    { expand: true, cwd: 'bower_components/jquery-validation-unobtrusive/src/', src: ['**'], dest: 'js/' }
                ]
            }
        },
        less: {
            options: {
                ieCompat: true,
                strictMath: true
            },
            dist: {
                src: 'less/style.less',
                dest: 'css/style.css'
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({ cascade: false })
                ]
            },
            dist: {
                src: 'css/style.css'
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
            dist: {
                src: 'css/style.css',
                dest: 'css/style.min.css'
            }
        },
        uglify: {
            options: {
                compress: true,
                mangle: true,
                ie8: true
            },
            dist: {
                src: 'js/scripts.js',
                dest: 'js/scripts.min.js'
            }
        },
        watch: {
            less: {
                files: ['less/**/*.less'],
                tasks: 'build:css'
            },
            js: {
                files: ['js/**/*.js'],
                tasks: 'uglify'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build:css', ['less', 'postcss', 'cssmin']);
    grunt.registerTask('build', ['copy', 'build:css', 'uglify']);
    grunt.registerTask('default', ['build', 'watch']);
};