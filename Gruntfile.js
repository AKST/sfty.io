module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');



  /**
   * configuration for grunt
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    proj: {
      browserJs: {
        main: 'src/client/index.js',
        prepareTests: 'test/client/init.jsx',
        src: [
          'src/client/__init__.js',
          'src/client/config.js',
          'src/client/errors/*.{js,jsx}',
          'src/client/util/*.{js,jsx}',
          'src/client/views/*.{js,jsx}'
        ],
        testSrc: 'test/client/{,*/}*.js',
        testRun: 'test/client/run.js',
        libraries: [
          'assets/vendor/jquery/dist/jquery.min.js',
          'assets/vendor/sifter/sifter.min.js',
          'assets/vendor/microplugin/src/microplugin.js',
          'assets/vendor/selectize/dist/js/selectize.min.js',

          'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.min.js',
          'assets/vendor/react/react.js',
          'assets/vendor/react-bootstrap/react-bootstrap.min.js',
          'assets/vendor/underscore/underscore.js',
          'assets/vendor/class-extender/index.js',

          'node_modules/mori/mori.js',
          'node_modules/async/lib/async.js',
          'node_modules/es6-promise/promise.js',
        ],
        testLibraries: [
          'assets/vendor/mocha/mocha.js',
          'assets/vendor/chai/chai.js',
        ],
        reactSrcOut: 'temp/react-out.js',
        reactMainOut: 'temp/react-main.js',
        srcFiles: [
          '<%= proj.browserJs.reactSrcOut %>',
          '<%= proj.browserJs.reactMainOut %>',
        ],  
        testFiles: [
          '<%= proj.browserJs.reactSrcOut %>',
          '<%= proj.browserJs.testLibraries %>',
          '<%= proj.browserJs.prepareTests %>',
          '<%= proj.browserJs.testSrc %>',
          '<%= proj.browserJs.testRun %>',
        ],
        srcOut: 'public/js/main.js',
        testOut: 'public/js/test.js',
      },
      serverJs: 'src/server/{,*/}*.js',
      serverTests: 'test/server/{,*/}*.js',
      sass: {
        main: 'assets/sass/init.sass',
        all: 'assets/sass/{,*/}*.{sass,scss}',
        path: [
          'assets/vendor/bootstrap-sass-official/assets/stylesheets/',
          'assets/vendor/bootstrap-sass-official/assets/stylesheets/bootstrap',
        ],
        out: 'temp/css/main.css'
      },
      css: {
        main: [
          'assets/vendor/selectize/dist/css/selectize.css',
          'assets/vendor/selectize/dist/css/selectize.bootstrap3.css',
          '<%= proj.sass.out %>',
        ],
        test: 'assets/vendor/mocha/mocha.css',
        mainOut: 'public/css/main.min.css',
        testOut: 'public/css/mocha.css'
      },
      tempFiles: [
        '<%= proj.sass.out %>',
        '<%= proj.browserJs.reactSrcOut %>',
        '<%= proj.browserJs.reactMainOut %>'
      ]
    },

    /**
     * Automatically builds project
     */
    watch: {
      main: {
        files: 'Gruntfile.js',
        tasks: [
          'sass', 
          'cssmin:dev', 
          'jshint',
          'react',
          'uglify:dev',
          'concat:dev',
          'mochaTest',
          'connect',
          'mocha',
        ]
      },
      sass: {
        files: '<%= proj.sass.all %>',
        tasks: [
          'sass', 
          'cssmin:dev', 
          //'clean:after'
        ]
      },
      node: {
        files: [
          '<%= proj.serverTests %>',
          '<%= proj.serverJs %>',
        ],
        tasks: ['jshint', 'mochaTest']
      },
      browserjs: {
        files: [
          '<%= proj.browserJs.src %>',
          '<%= proj.browserJs.testSrc %>',
          '<%= proj.browserJs.main %>',
          '<%= proj.browserJs.prepareTests %>',
        ],
        tasks: [
          'jshint',
          //'clean:js',
          'react',
          'uglify:dev',
          'concat:dev',
          'clean:after',
          'connect',
          'mocha',
        ]
      }
    },

    /**
     * Looks for common source of errors
     */
    jshint: {
      server: {
        src: [
          '<%= proj.serverJs %>',
          'Gruntfile.js'
        ],
        options: {
          jshintrc: './src/server/.jshintrc'
        }
      },
      browser: {
        src: [
          '<%= proj.browserJs.src %>',
          '<%= proj.browserJs.main %>',
        ],
        options: {
          jshintrc: './src/client/.jshintrc'
        }
      },
      test: {
        src: [
          '<%= proj.browserJs.testSrc %>',
          '<%= proj.browserJs.prepareTests %>',
        ],
        options: {
          jshintrc: './test/client/.jshintrc'
        }      
      },
      serverTest: {
        src: [
          '<%= proj.serverTests %>',
        ],
        options: {
          jshintrc: './test/server/.jshintrc'
        }      
      }
    },

    /**
     * Compiles react jsx files
     */
    react: {
      output: {
        files: {
          '<%= proj.browserJs.reactSrcOut %>': '<%= proj.browserJs.src %>',
          '<%= proj.browserJs.reactMainOut %>': '<%= proj.browserJs.main %>',
        }
      }
    },

    /**
     * Clumps all javascript into single file
     */
    uglify: {
      dev: {
        options: { beautify: true, mangle: false },
        files: { 
          '<%= proj.browserJs.srcOut %>': '<%= proj.browserJs.srcFiles %>',
          '<%= proj.browserJs.testOut %>': '<%= proj.browserJs.testFiles %>',
        }
      },
      production: {
        options: { beautify: false, mangle: false },
        files: { 
          '<%= proj.browserJs.srcOut %>': '<%= proj.browserJs.srcFiles %>',
        }
      },
    },

    /**
     * Clumps all javascript into single file
     */
    concat: {
      dev: {
        files: { 
          '<%= proj.browserJs.srcOut %>': [
            '<%= proj.browserJs.libraries %>',
            '<%= proj.browserJs.srcFiles %>'
          ],
          '<%= proj.browserJs.testOut %>': [
            '<%= proj.browserJs.libraries %>',
            '<%= proj.browserJs.testFiles %>'
          ],
        }
      },
      production: {
        files: { 
          '<%= proj.browserJs.srcOut %>': [
            '<%= proj.browserJs.libraries %>',
            '<%= proj.browserJs.srcFiles %>'
          ],
        }
      },
    },

    /**
     * Server Tests
     * https://github.com/pghalliday/grunt-mocha-test
     */
    mochaTest: {
      server: {
        src: 'test/server/{,*/}*.js',
      },
    },

    connect: {
      test: {
        options: {
          base: 'public',
          timeout: 10000,
          port: 8080,
          reporter: 'Nyan'
        }
      }
    },

    /**
     * Client Tests
     * https://github.com/kmiyashiro/grunt-mocha
     */
    mocha: {
      client: {
        options: { 
          urls: ['http://0.0.0.0:8080/test.html'],
          log: true, 
        }
      },
    },

    /**
     * Compiles sass in css to public/temp
     */
    sass: {
      dist: {
        files: {
          '<%= proj.sass.out %>': '<%= proj.sass.main %>'
        },
        options: {
          loadPath: '<%= proj.sass.path %>' 
        }
      }
    },

    /**
     * Minifies css into public/css
     */
    cssmin: {
      dev: {
        files: { 
          '<%= proj.css.mainOut %>': '<%= proj.css.main %>',
          '<%= proj.css.testOut %>': '<%= proj.css.test %>',
        }
      },
      production: {
        files: { 
          '<%= proj.css.mainOut %>': '<%= proj.css.main %>'
        }
      }
    },

    /**
     * removes files before and after builds
     */
    clean: {
      after: 'temp'
    }

  });

  /**
   * is the default behaviour
   */
  grunt.registerTask('default', [
    'build',
    'watch'
  ]);

  /**
   * will run when running tests
   */
  grunt.registerTask('test', [
    'jshint',
    'mochaTest',
    'connect',
    'mocha',
  ]);

  /**
   * will build project once off
   */
  grunt.registerTask('build', [
    'sass',
    'cssmin:production',
    'react',
    'uglify:production',
    'concat:production',
    'clean:after'
  ]);

};
