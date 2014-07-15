module.exports = function(grunt) {

  /**
   * configuration for grunt
   */
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    project: {
      clientJs: [
        'src/client/index.jsx',
        'src/client/models/*.{js,jsx}',
        'src/client/controllers/*.{js,jsx}',
        'src/client/views/*.{js,jsx}',
      ],
      clientLibsJs: [
        'assets/vendor/react/react.min.js',
        'assets/vendor/jquery/dist/jquery.js',
        'assets/vendor/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      ],
      allClientJs: [
        '<%= project.clientLibsJs %>',
        '<%= project.temp.js %>',
      ],
      serverJs: './src/server/{,*/}*.js',
      sass: './assets/sass/{,*/}*.{sass,scss}', 
      bootsass: './assets/vendor/bootstrap-sass-official/assets/stylesheets',
      temp: {
        dir: './public/temp',
        css: '<%= project.temp.dir %>/{,*/}*.css',
        js: '<%= project.temp.dir %>/js/temp.js',
      },
      dist: {
        dir: './public',
        css: '<%= project.dist.dir %>/css/main.min.css',
        js: '<%= project.dist.dir %>/js/main.js',
      },
      assets: {
        dir: './assets',
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
          'react',
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
          'react',
          'uglify:dev',
          'clean:after'
        ]
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
     * Clumps all javascript into single file
     */
    uglify: {
      dev: {
        options: { beautify: true, mangle: false },
        files: { '<%= project.dist.js %>': '<%= project.allClientJs %>' }
      },
      production: {
        options: { beautify: false, mangle: false },
        files: { '<%= project.dist.js %>': '<%= project.allClientJs %>' }
      },
    },

    /**
     * Compiles react
     */
    react: {
      output: {
        files: {
          '<%= project.temp.js %>': '<%= project.clientJs %>'
        }
      }
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
      before: [
        '<%= project.dist.js %>',
        '<%= project.dist.css %>',
      ],
      js: '<%= project.dist.js %>',
      css: '<%= project.dist.css %>',
      after: '<%= project.temp.dir %>'
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-react');
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
    'uglify:production',
    'clean:after'
  ]);

};
