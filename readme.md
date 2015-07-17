# Bartender
###### LookThink front-end project management tool

Bartender is a full-feature front-end management tool for development.

Featuring the capabilities akin to those in tools like CodeKit and Prepros, this is a simple, terminal-based Gulp pipeline to handle HTML, SCSS, JS, and image assets for site builds.

***

##### Latest Changes

+ Remove SCSS Lint for performance issues

***

##### HTML

The HTML pipe (`gulp html`) has the simple task of moving HTML files to the destination folder. It features a check so only changed HTML gets moved over on save / run.

##### SCSS

The styles pipe (`gulp styles`) runs through a variety of tools to check and compile your SCSS files:

1. Compile your SCSS files utilizing libsass
2. Autoprefix the compiled CSS
3. Minify the compiled / prefixed CSS

##### Scripts

The scripts pipe (`gulp scripts`) is similar to the SCSS pipe in that it runs your JS through hinting and concatenating:

1. Run JSHint on JavaScript files
2. Concatenate all JS files into a single file
3. Uglify the concatenated file

##### Images

The images pipe (`gulp images`) similar to the HTML pipe in it primarily move assets but will run images through a simple minification process. It features a check so only changed images will move through the pipe.

***

Each of these tasks has LiveReload tied to it, meaning if you have the Chrome extension for LiveReload installed and running, your site will reload at the end of successful pipes.

There are two default tasks:

1. `gulp` will run through all described pipes in order.
2. `gulp watch` will open the watch command for gulp which will watch files for changes and only run the pipe related to the changed files.
