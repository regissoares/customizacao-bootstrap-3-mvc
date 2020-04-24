/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. https://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
  grunt.initConfig({
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

    less: {
      options: {
        ieCompat: true,
        strictMath: true,
        sourceMap: true,
        outputSourceFiles: true
      },
      bootstrap: {
        options: {
          sourceMapURL: 'bootstrap.css.map',
          sourceMapFilename: 'Content/bootstrap.css.map'
        },
        src: 'less/_bootstrap.less',
        dest: 'Content/bootstrap.css'
      },
      theme: {
        options: {
          sourceMapURL: 'bootstrap-theme.css.map',
          sourceMapFilename: 'Content/bootstrap-theme.css.map'
        },
        src: 'less/_theme.less',
        dest: 'Content/bootstrap-theme.css'
      },
      site: {
        options: {
          sourceMapURL: 'site.css.map',
          sourceMapFilename: 'Content/site.css.map'
        },
        src: 'less/site.less',
        dest: 'Content/site.css'
      }
    },

    postcss: {
      options: {
        map: {
          inline: false,
          sourcesContent: true
        },
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
        compatibility: 'ie8',
        sourceMap: true,
        sourceMapInlineSources: true,
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

    modernizr: {
      dist: {
        crawl: false,
        customTests: [],
        dest: 'Scripts/modernizr.js',
        tests: [],
        options: [
          'setClasses'
        ],
        uglify: true
      }
    },

    copy: {
      fonts: {
        files: [
          { expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: ['**'], dest: 'fonts/' }
        ]
      },
      js: {
        files: [
          { expand: true, cwd: 'bower_components/jquery/dist/', src: ['**'], dest: 'Scripts/' },
          { expand: true, cwd: 'bower_components/bootstrap/dist/js/', src: ['**'], dest: 'Scripts/' },
          { expand: true, cwd: 'bower_components/jquery-validation/dist/', src: ['**'], dest: 'Scripts/' },
          { expand: true, cwd: 'bower_components/jquery-validation-unobtrusive/src/', src: ['**'], dest: 'Scripts/' }
        ]
      }
    },

    watch: {
      js: {
        files: 'Scripts/**/*.js',
        tasks: 'uglify'
      },
      less: {
        files: 'less/**/*.less',
        tasks: 'build:css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks("grunt-modernizr");
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build:css', ['less', 'postcss', 'cssmin']);
  grunt.registerTask('build', ['uglify', 'build:css', 'modernizr', 'copy']);
  grunt.registerTask('default', ['build', 'watch']);
};
