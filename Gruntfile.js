module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // define source files and their destinations
    uglify: {
        options: {
          compress: true,
          report: false,
          mangle: false,
          beautify: false
        },
        files: {
            cwd: 'js/',
            src: ['*.js'],  // source files mask
            dest: 'public/js/',    // destination folder
            expand: true,    // allow dynamic building
            ext: '.min.js'   // replace .js to .min.js
        }
    },
    cssmin: {
        options: {
            shorthandCompacting: false,
            roundingPrecision: -1
        },
        target: {
            files: {
                'public/css/site.min.css': ['css/**/*.css', '!css/**/*.min.cs']
            }
        }
    },
    clean: ["public/css/fonts/*", "public/css/*", "public/js/*"],
    watch: {
        html: { files: ['html/*'], tasks: [ 'newer:copy' ] },
        js: { files: ['js/*'], tasks: [ 'newer:uglify:files' ] },
        css: { files: ['css/*', 'fonts/*'], tasks: [ 'newer:cssmin:target' ] },
        options: {
            livereload: true,
        },
    },
    copy: {
      main: {
          files: [
              {
                  expand: true,
                  cwd: "html/",
                  src: ["*.*", "**/*.*"],
                  dest: "public/"
              }
          ]
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-newer');

  // Default task(s).
  grunt.registerTask('build', ['clean', 'uglify', 'cssmin', 'copy']);
  grunt.registerTask('default', ['clean']);
};
