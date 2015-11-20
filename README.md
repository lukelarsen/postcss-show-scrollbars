[PostCSS]:                 https://github.com/postcss/postcss
[Demo]:                    http://jsfiddle.net/lukelarsen/aotz6qLh/

# PostCSS Show Scrollbars

<img align="right" width="135" height="95"
     title="Philosopher’s stone, logo of PostCSS"
     src="http://postcss.github.io/postcss/logo-leftp.png">

[PostCSS] plugin for enabling scrollbard to always show in webkit.

If you have a container block with overflow: hidden; on it and the user is using Webkit the scrollbar won't show up until the user starts to scroll in the designated area. This can be misleading to the user. They might not know they can scroll. To help fix this, we can always show the scrollbar using this plugin.

The plugin allows you to set the color of the scrollbar. That is the only option.

```css
.scrolling-container{
    scrollbar: your-color;
}
```

##Example

```css
.scrolling-container{
    scrollbar: rgba(0, 0, 0, 0.5);
}
```

Will output:

```css
.scrolling-container{
    overflow: auto;
}

.scrolling-container::-webkit-scrollbar{
    width: 7px;
    -webkit-appearance: none;
}

.scrolling-container::-webkit-scrollbar-thumb{
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
}
```

##Demo
[View demo on jsfiddle]


## Usage

```
npm install postcss-show-scrollbars --save-dev
```

### Gulp
```js
var postcss = require('gulp-postcss');
var showScrollbars = require('postcss-show-scrollbars');

gulp.task('css', function () {
    var processors = [
        showScrollbars
    ];
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));
});
```