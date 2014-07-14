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
  var browserSrc = [
    'src/client/index.js',
    'src/client/models/*.js',
    'src/client/controllers/*.js',
    'src/client/views/*.js',
    'src/client/routes.js',
  ];

  /**
   * all client side source
   */
  var paths = libs.concat(browserSrc);

  /**
   * configuration for grunt
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    project: {
      clientJs: browserSrc,
      serverJs: './src/server/{,*/}*.js',
      sass: './assets/sass/{,*/}*.{sass,scss}', 
      templates: './assets/templates/{,*/}*.hbs',
      bootsass: './assets/vendor/bootstrap-sass-official/assets/stylesheets',
      temp: {
        dir: './public/temp',
        css: '<%= project.temp.dir %>/{,*/}*.css',
      },
      dist: {
        dir: './public',
        css: '<%= project.dist.dir %>/css/main.min.css',
      },
      assets: {
        dir: './assets',
      }
    },

    /**
     * Looks for common source of errors
     */
    jshint: {
      server: {
        src: [
          '<%= project.serverJs %>',
          'Gruntfile.js'
        ],
        options: {
          jshintrc: './src/server/.jshintrc'
        }
      },
      browser: {
        src: '<%= project.clientJs %>',
        options: {
          jshintrc: './src/client/.jshintrc'
        }
      }
    },

    /**
     * Automatically builds project
     */
    watch: {
      main: {
        files: 'Gruntfile.js',
        tasks: [
          'sass', 
          'clean:css', 
          'cssmin:dev', 
          'jshint',
          'clean:js',
          'emberTemplates',
          'uglify:dev',
          'clean:after'
        ]
      },
      sass: {
        files: '<%= project.sass %>',
        tasks: [
          'sass', 
          'clean:css', 
          'cssmin:dev', 
          'clean:after'
        ]
      },
      node: {
        files: '<%= project.serverJs %>',
        tasks: ['jshint']
      },
      browserjs: {
        files: '<%= project.clientJs %>',
        tasks: [
          'jshint',
          'clean:js',
          'emberTemplates',
          'uglify:dev',
          'clean:after'
        ]
      },
      templates: {
        files: '<%= project.templates %>',
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
          return sourceFile
            .replace(/.\/assets\/templates\//, '');
        }
      },
      '<%= project.temp.dir %>/templates.js': '<%= project.templates %>'
    },

    /**
     * Compiles sass in css to public/temp
     */
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/sass',
          src: '{,*/}*.{sass,scss}',
          dest: '<%= project.temp.dir %>',
          ext: '.css'
        }],
        options: {
          style: 'expanded',
          loadPath: [
            '<%= project.bootsass %>/mixins',
            '<%= project.bootsass %>' 
          ]
        }
      }
    },

    /**
     * Minifies css into public/css
     */
    cssmin: {
      dev: {
        expand: true,
        files: { '<%= project.dist.css %>': ['<%= project.temp.css %>'] }
      },
      production: {
        expand: false,
        files: { '<%= project.dist.css %>': ['<%= project.temp.css %>'] }
      }
    },

    /**
     * removes files before and after builds
     */
    clean: {
      before: 'public/{css,js}',
      js: 'public/js',
      css: 'public/css',
      after: 'public/other'
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
    'cssmin:production',
    'emberTemplates',
    'uglify:production',
    'clean:after'
  ]);

};
