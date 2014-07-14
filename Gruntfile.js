module.exports = function(grunt) {

  /**
   * Order of library dependencies
   */
  var libs = [
    'assets/vendor/jquery/dist/jquery.js',
    'assets/vendor/bootstrap-sass-official/assets/'+
      'javascripts/bootstrap.js',
    'assets/vendor/handlebars/handlebars.js',
    'assets/vendor/ember/ember.js',
    'assets/vendor/ember-data/ember-data.js',
    'public/temp/templates.js',
  ];

  /**
   * Order of source dependencies
   */
  var src = [
    'src/client/index.js',
    'src/client/models/*.js',
    'src/client/controllers/*.js',
    'src/client/routes.js',
  ];

  /**
   * all client side source
   */
  var paths = libs.concat(src);

  /**
   * configuration for grunt
   */
  grunt.initConfig({

    /**
     * Looks for common source of errors
     */
    jshint: {
      server: {
        src: [
          'src/server/**/*/js',
          'src/server/*.js',
          'Gruntfile.js'
        ],
        options: {
          jshintrc: './src/server/.jshintrc'
        }
      },
      browser: {
        src: ['src/client/**/*/js', 'src/client/*.js'],
        options: {
          jshintrc: './src/client/.jshintrc'
        }
      }
    },

    /**
     * Automatically builds project
     */
    watch: {
      sass: {
        files: ['Gruntfile.js', 'assets/sass/**/*.s*ss',
                'assets/sass/*.scss'],
        tasks: ['sass', 'clean:css', 'cssmin', 'clean:after']
      },
      node: {
        files: ['Gruntfile.js', 'src/server/**/*.js'],
        tasks: ['jshint']
      },
      browserjs: {
        files: ['Gruntfile.js', 'src/client/**/*.js'],
        tasks: [
          'jshint',
          'clean:js',
          'emberTemplates',
          'uglify:dev',
          'clean:after'
        ]
      },
      templates: {
        files: ['Gruntfile.js', 'assets/templates/**/*.hbs',
                'assets/templates/*.hbs'],
        tasks: [
          'emberTemplates',
          'uglify:dev',
          'clean:after'
        ]
      },
    },

    /**
     * Clumps all javascript into single file
     */
    uglify: {
      dev: {
        options: { beautify: true, mangle: false },
        files: { 'public/js/main.js': paths }
      },
      production: {
        options: { beautify: false, mangle: false },
        files: { 'public/js/main.js': paths }
      },
    },

    /**
     * compiles templates down into javascript
     */
    emberTemplates: {
      options: {
        templateName: function (sourceFile) {
          return sourceFile.replace(
            /assets\/templates\//, ''
          );
        }
      },
      'public/temp/templates.js': 'assets/templates/**/*.hbs'
    },

    /**
     * Compiles sass in css to public/temp
     */
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/sass',
          src: ['*.sass', '**/*.sass'],
          dest: './public/temp',
          ext: '.css'
        }]
      }
    },

    /**
     * Minifies css into public/css
     */
    cssmin: {
      'public/css/main.min.css': [
        'public/temp/*.css'
      ]
    },

    /**
     * removes files before and after builds
     */
    clean: {
      before: ['public/css', 'public/js'],
      js: ['public/js'],
      css: ['public/css'],
      after: ['public/temp']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  /**
   * is the default behaviour
   */
  grunt.registerTask('default', 'watch');

  /**
   * will run when running tests
   */
  grunt.registerTask('test', ['jshint']);

  /**
   * will build project once off
   */
  grunt.registerTask('build', [
    'clean:before',
    'sass',
    'cssmin',
    'emberTemplates',
    'uglify:production',
    'clean:after'
  ]);

};
