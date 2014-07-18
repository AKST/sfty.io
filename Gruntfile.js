module.exports = function(grunt) {
  
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');



  /**
   * configuration for grunt
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    proj: {
      browserJs: {
        main: 'src/client/index.jsx',
        prepareTests: 'test/client/init.jsx',
        src: [
          'src/client/__init__.js',
          'src/client/util/*.{js,jsx}',
          'src/client/models/*.{js,jsx}',
          'src/client/collections/*.{js,jsx}',
          'src/client/controllers/*.{js,jsx}',
          'src/client/views/*.{js,jsx}'
        ],
        testSrc: 'test/client/{,*/}*.js',
        testRun: 'test/client/run.js',
        libraries: [
          'assets/vendor/jquery/dist/jquery.js',
          'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js',
          'assets/vendor/react/react.js',
          'assets/vendor/react-bootstrap/react-bootstrap.js',
          'assets/vendor/underscore/underscore.js',
          'assets/vendor/backbone/backbone.js',
          'assets/vendor/backbone.localStorage/backbone.localStorage.js',
          'assets/vendor/class-extender/index.js',
        ],
        testLibraries: [
          'assets/vendor/mocha/mocha.js',
          'assets/vendor/chai/chai.js',
        ],
        reactSrcOut: 'temp/react-out.js',
        reactMainOut: 'temp/react-main.js',
        srcFiles: [
          '<%= proj.browserJs.libraries %>',
          '<%= proj.browserJs.reactSrcOut %>',
          '<%= proj.browserJs.reactMainOut %>',
        ],  
        testFiles: [
          '<%= proj.browserJs.libraries %>',
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
        main: '<%= proj.sass.out %>',
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
          'connect',
          'mocha',
          'mochaTest',
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
        files: '<%= proj.serverJs %>',
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
  grunt.registerTask('default', 'watch');

  /**
   * will run when running tests
   */
  grunt.registerTask('test', [
    'jshint',
    'mocha',
    'mochaTest',
  ]);

  /**
   * will build project once off
   */
  grunt.registerTask('build', [
    'sass',
    'cssmin:production',
    'react',
    'uglify:production',
    'clean:after'
  ]);

};
