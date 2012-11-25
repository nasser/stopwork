Stopwork
=========
A minimal public presentation platform.

Keynote and Powerpoint are almost always too bloated for the presentations I build. They are full to the brim with features that I never use, like transitions, formatting, sound effects, and whatever a ["build"](http://support.apple.com/kb/HT4639) is.

So I built this. It is HTML 5 based, makes use of CSS for styling, and JavaScript for slide logic. It makes the kind of presentations I do very easy to knock together, and it may do the same for you.

Usage
-----
I built the presentation by manually editing the `<script>` tag in index.html. There is not other interface yet. The tag looks something like this

```html
  <script type="text/stopwork">
    "# Ramsey Nasser",
    "# Code as Self Expression",
    "`self`",
    // ...
  </script>
```

A presentation is an array of strings. Each string represents a slide. The slide's type is determined from the string's content (as of now, image URLs, web URLs, and markdown text).

Edit the array to build your presentation. Bare image filenames (`foo.png` as opposed to `http://bar.com/foo.png`) are looked up in the `assets/` folder, which you can fill with your own files.

The code comes with my original presentations as an example.

Supported Slide Types
---------------------
- **Image slides** display centered images. Images can be local or remote.
- **Web slides** display web pages. Web pages remain are fully interactive.
- **Text slides** interpret text as Markdown and display the resulting HTML.

Navigation
----------
Right and left keyboard keys go to the next and previous slides, respectively. Moving the mouse to the bottom center reveals previous and next buttons that can be clicked. This is useful if a web slide steals keyboard focus.

Next Steps
----------
- Better navigation
- Interface for building presentations
- Video slides
- Modular slide type system
- Themes

Name
----
The platform is named after the monthly Stop Work meetings at [Eyebeam](http://eyebeam.org) where fellows and residents present their work and receive feedback.

Legal 
-----
Copyright (c) 2012 Ramsey Nasser. Released under the MIT License.

[Skeleton](http://www.getskeleton.com/) Copyright (c) 2012 Dave Gamache

[jQuery](http://jquery.com) Copyright (c) 2012 jQuery Foundation and other contributors

[Marked](https://github.com/chjj/marked) Copyright (c) 2011-2012, Christopher Jeffrey

[Iconic Font](http://somerandomdude.com/work/iconic/) Copyright (c) 2012, P.J. Onori