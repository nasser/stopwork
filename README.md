Stopwork
=========
A minimal public presentation platform.

Keynote and Powerpoint are almost always too bloated for the presentations I build. They are full to the brim with features that I never use, like transitions, formatting, sound effects, and the experience of constructing a presentation feels cumbersome.

So I built this. It is HTML 5 based, runs in your browser, makes use of CSS for styling, and JavaScript for slide logic. It makes the kind of presentations I do very easy to knock together, and it may do the same for you.

Usage
-----

### Use it online
[Stopwork is usable](http://nas.sr/stopwork/demo/) without downloading it. The online version is fully featured, and everything is stored locally in your browser so no one has access to your work.

### Get Stopwork
Grab the code off of GitHub and open `index.html`.

For export to work correctly you will have to spin up a local server from Stopwork's folder and navigate to that URL in your browser instead. I use [statik](https://www.npmjs.com/package/statik).

### Write presentation
* `escape` toggle edit and presentation mode
* `alt + return` new slide
* `return` edit slide
* `left` select previous slide
* `right` select next slide
* `shift + left` expand selection to previous slide
* `shift + right` expand selection to next slide
* `alt + left` move selection to the left
* `alt + right` move selection to the right
* `ctrl + d` duplicate selected slides
* `delete` delete selected slides
* `click` select slide
* `shift + click` add slide to selection
* `ctrl + s` download self-contained HTML slideshow

You can copy/paste or drag images from anywhere into edit mode to create an image slide. The image content is stored in the presentation, so the original files are irrelevant. Text slides are rendered as [Markdown](http://daringfireball.net/projects/markdown/syntax).

An effective workflow is using the [OSX global screenshot shortcuts](https://support.apple.com/en-us/HT201361) while holding `control` to grab windows and regions of the screen to the clipboard and then paste them into Stopwork.

### Launch presentation
Launch the presentation hitting `escape` or downloading a self-contained HTML slideshow and opening that file.

### Navigation
Right and left keyboard keys go to the next and previous slides


### Export presentation
* **HTML** `ctrl + s` to downloaded a self-contained HTML slideshow
* **PDF** printing a downloaded slideshow to a PDF file will render each slide on its own page

Next Steps
----------
- Video support
- Audio support
- SVG support
- MathJax support
- Drag and drop slides
- Better key bindings in edit mode
- Download and cache remote images
- Custom slide transitions
- Custom themes

Name
----
The platform was originally named after the monthly Stop Work meetings at [Eyebeam](http://eyebeam.org) where fellows and residents present their work and receive feedback.

History
-------
This is a rewrite of an earlier version that lacked a visual interface.

Legal 
-----
Copyright © 2012-2016 Ramsey Nasser. Released under the MIT License.