module.exports = function(grunt) {

  var libs = [
    'assets/vendor/jquery/dist/jquery.js',
    'assets/vendor/bootstrap/dist/js/bootstrap.js',
    'assets/vendor/handlebars/handlebars.js',
    'assets/vendor/ember/ember.js',
  ]; 

  var paths = libs;

  grunt.initConfig({ 
    // LINTING
    jshint: {
      node: {
        src: [ 
          'src/server/*.js',
          'src/server/**/*.js'
        ],
        options: {
          curly: false,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          boss: true,
          eqnull: true,
          browser: true,
          globals: {
            process: true,
            module: true,
            exports: true,
            require: true,
            console: true,
            __dirname: true
          }
        }
      },
      nodeTests: {
        src: [
          'test/server/*.js',
          'test/server/**/*.js'
        ],
        options: {
          curly: false,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          undef: true,
          boss: true,
          eqnull: true,
          browser: true,
          globals: {
            assert: true,
            process: true,
            describe: true,
            it: true,
            require: true,
            console: true
          }
        }
      },
      browser: {
        src: [
          'src/client/*.js',
          'src/client/**/*.js'
        ],
        globals: {
          window: true,
          alert: true,
          console: true
        }
      }
    },
    // TESTS
    // jasmine: {
    //   main: {
    //     src: 'static/js/test.js',
    //     options: {
    //       specs: 'assets/js/test/*.js',
    //       helpers: 'assets/js/test/*Helper.js'
    //     }
    //   }
    // },
    // mochacov: {
    //   all: ['test/*.js']
    // },

    // FILE WATCHING
    watch: {
      sass: {
        files: [
          'Gruntfile.js', 
          'assets/sass/**/*.sass',
          'assets/sass/**/*.scss',
        ],
        tasks: [
          'cssmin'
        ]
      },
      node: {
        files: [
          'Gruntfile.js', 
          'src/server/**/*.js',
        ],
        tasks: [
          'jshint:node',
          'jshint:nodeTests',
        ]
      },
      browserjs: {
        files: [
          'Gruntfile.js', 
          'src/client/**/*.js',
        ],
        tasks: [
          'jshint:browser',
          'clean:jsBefore',
          'uglify:dev',
        ]
      },
    },
    uglify: {
      dev: {
        options: {
          beautify: true,
          mangle: false
        },
        files: {
          'static/js/main.js': paths 
        }
      },
      production: {
        options: {
          beautify: false,
          mangle: false
        },
        files: {
          'static/js/main.js': paths 
        }
      },
    },
    cssmin: {
      'static/css/main.min.css': [
        'assets/vendor/bootstrap/dist/css/bootstrap.css'
      ]
    },
    clean: {
      before: [
        'static/css',
        'static/js' 
      ],
      jsBeforeTest: [
        'static/js/test.js'
      ],
      jsBefore: [
        'static/js' 
      ],
      cssBefore: [
        'static/css'
      ],
      after: [
        'static/temp'
      ]
    }
  });


  grunt.loadNpmTasks('grunt-compile-handlebars');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-mocha-cov');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');


  grunt.registerTask('default', 'watch');
  grunt.registerTask('test', ['jshint', 'mochacov', 'jasmine']);

  grunt.registerTask('build', [
    'clean:before', 'less', 'cssmin', 'uglify', 'clean:after'
  ]);

  grunt.registerTask('first_build', [
    'less', 'cssmin', 'uglify', 'clean:after'
  ]);

  grunt.registerTask('heroku:production', [
    'less', 'cssmin', 'uglify', 'clean:after'
  ]);

};
