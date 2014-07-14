module.exports = function(grunt) {

  var libs = [
    'assets/vendor/jquery/dist/jquery.js',
    'assets/vendor/bootstrap/dist/js/bootstrap.js',
    'assets/vendor/handlebars/handlebars.js',
    'assets/vendor/ember/ember.js',
    'assets/vendor/ember-data/ember-data.js',
    'public/temp/templates.js',
  ];

  var src = [
    'src/client/index.js',
    'src/client/models/*.js',
    'src/client/controllers/*.js',
    'src/client/routes.js',
  ];

  var paths = libs.concat(src);

  grunt.initConfig({


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


    cssmin: {
      'public/css/main.min.css': [
        'assets/vendor/bootstrap/dist/css/bootstrap.css',
        'public/temp/*.css'
      ]
    },


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


  grunt.registerTask('default', 'watch');
  grunt.registerTask('test', ['jshint']);

  grunt.registerTask('build', [
    'clean:before', 'cssmin', 'uglify', 'clean:after'
  ]);

  grunt.registerTask('first_build', [
    'cssmin', 'uglify', 'clean:after'
  ]);

  grunt.registerTask('heroku:production', [
    'cssmin', 'uglify', 'clean:after'
  ]);

};
