module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    handlebars: {
      compile: {
        options: {
          namespace: 'wysihtml5.tpl',
          processName: function(filePath) {
            return filePath.split('/')[2].split('.')[0];
          },
          node: false
        },
        files: {
          'src/generated/templates.js': ['src/templates/*.hbs'],
          'src/generated/templates-fa.js': ['src/templates-fa/*.hbs']
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'dist/bootstrap3-wysihtml5.min.js': [
            'src/generated/templates.js',
            'src/bootstrap3-wysihtml5.js',
            'src/generated/commands.js',
            'src/locales/bootstrap-wysihtml5.en-US.js'
          ],
          'dist/bootstrap3-wysihtml5.all.min.js': [
            'components/wysihtml5x/dist/wysihtml5x-toolbar.js',
            'components/handlebars/handlebars.runtime.min.js',
            'src/generated/templates.js',
            'src/bootstrap3-wysihtml5.js',
            'src/generated/commands.js',
            'src/locales/bootstrap-wysihtml5.en-US.js'
          ],
          'dist/amd/bootstrap3-wysihtml5.all.min.js': [
            'dist/amd/bootstrap3-wysihtml5.all.js'
          ],
          'dist/bootstrap3-wysihtml5-fa.min.js': [
            'src/generated/templates-fa.js',
            'src/bootstrap3-wysihtml5.js',
            'src/generated/commands.js',
            'src/locales/bootstrap-wysihtml5.en-US.js'
          ],
          'dist/bootstrap3-wysihtml5-fa.all.min.js': [
            'components/wysihtml5x/dist/wysihtml5x-toolbar.js',
            'components/handlebars/handlebars.runtime.min.js',
            'src/generated/templates-fa.js',
            'src/bootstrap3-wysihtml5.js',
            'src/generated/commands.js',
            'src/locales/bootstrap-wysihtml5.en-US.js'
          ],
            'dist/amd/bootstrap3-wysihtml5-fa.all.min.js': [
            'dist/amd/bootstrap3-wysihtml5-fa.all.js'
          ]
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      minify: {
        files: {
          'dist/bootstrap3-wysihtml5.min.css': ['src/bootstrap3-wysihtml5.css']
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'src/', src: ['*.js'], dest: 'dist/'},
          {expand: true, cwd: 'src/', src: ['*.css'], dest: 'dist/'},
          {expand: true, cwd: 'src/', src: ['locales/*.js'], dest: 'dist/'},
          {expand: true, cwd: 'src/generated', src: ['*.js'], dest: 'dist/'},
        ]
      },
      amd: {
        files: [
          {expand: true, cwd: 'components/handlebars', src: ['handlebars.runtime.amd.js'], dest: 'dist/amd'}
        ]
      }
    },
    concat: {
      options: {
        separator: '',
      },
      commands: {
        src: ['src/commands/small.js'],
        dest: 'src/generated/commands.js',
      },
      all: {
        src: [
          'components/wysihtml5x/dist/wysihtml5x-toolbar.js',
          'components/handlebars/handlebars.runtime.min.js',
          'src/generated/templates.js',
          'src/bootstrap3-wysihtml5.js',
          'src/generated/commands.js',
          'src/locales/bootstrap-wysihtml5.en-US.js'
        ],
        dest: 'dist/bootstrap3-wysihtml5.all.js'
      },
      amd: {
        src: [
          'dist/amd/wysihtml5.js',
          'dist/amd/handlebars.runtime.amd.js',
          'dist/amd/templates.js',
          'dist/amd/commands.js',
          'src/bootstrap3-wysihtml5.js'
        ],
        dest: 'dist/amd/bootstrap3-wysihtml5.all.js'
      },
      "all-fa": {
        src: [
          'components/wysihtml5x/dist/wysihtml5x-toolbar.js',
          'components/handlebars/handlebars.runtime.min.js',
          'src/generated/templates-fa.js',
          'src/bootstrap3-wysihtml5.js',
          'src/generated/commands.js',
          'src/locales/bootstrap-wysihtml5.en-US.js'
        ],
        dest: 'dist/bootstrap3-wysihtml5-fa.all.js'
      },
      "amd-fa": {
        src: [
          'dist/amd/wysihtml5.js',
          'dist/amd/handlebars.runtime.amd.js',
          'dist/amd/templates-fa.js',
          'dist/amd/commands.js',
          'src/bootstrap3-wysihtml5.js'
        ],
        dest: 'dist/amd/bootstrap3-wysihtml5-fa.all.js'
      }
    },
    wrap: {
      wysihtml5: {
        src: ['components/wysihtml5x/dist/wysihtml5x-toolbar.js'],
        dest: 'dist/amd/wysihtml5.js',
        options: {
          /*jshint multistr: true */
          wrapper: ['define(\'wysihtml5\', function (require, exports, module) {\n\
            var $     = require(\'jquery\'),\n\
                rangy = require(\'rangy\');\n', '\nreturn wysihtml5;\n});']
        }
      },
      templates: {
        src: ['src/generated/templates.js'],
        dest: 'dist/amd/templates.js',
        options: {
          wrapper: ['define("bootstrap.wysihtml5.templates", ["handlebars.runtime", "wysihtml5"], function(HandlebarsEnv, wysihtml5) {\n\tthis["wysihtml5"] = wysihtml5;\n\tvar Handlebars = HandlebarsEnv.default;\n', '\n});']
        }
      },
      "templates-fa": {
        src: ['src/generated/templates-fa.js'],
        dest: 'dist/amd/templates-fa.js',
        options: {
          wrapper: ['define("bootstrap.wysihtml5.templates", ["handlebars.runtime", "wysihtml5"], function(HandlebarsEnv, wysihtml5) {\n\tthis["wysihtml5"] = wysihtml5;\n\tvar Handlebars = HandlebarsEnv.default;\n', '\n});']
        }
      },
      commands: {
        src: ['src/generated/commands.js'],
        dest: 'dist/amd/commands.js',
        options: {
          wrapper: ['define("bootstrap.wysihtml5.commands", ["wysihtml5"], function(wysihtml5) {\n', '\n});']
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-wrap');

  // Default task(s).
  grunt.registerTask('dev', ['handlebars', 'concat:commands']);
  grunt.registerTask('amd', ['concat:all', 'wrap:wysihtml5', 'wrap:templates', 'wrap:templates-fa', 'wrap:commands', 'copy:amd', 'concat:amd', 'concat:amd-fa']);
  grunt.registerTask('default', ['handlebars:compile', 'concat:commands', 'amd', 'uglify', 'cssmin', 'copy:main']);

};
