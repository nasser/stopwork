Stopwork
=========
A minimal public presentation platform.

Keynote and Powerpoint are almost always too bloated for the presentations I build. They are full to the brim with features that I never use, like transitions, formatting, sound effects, and whatever a ["build"](http://support.apple.com/kb/HT4639) is.

So I built this. It is HTML 5 based, makes use of CSS for styling, JavaScript for slide logic, and Ruby to spin up a server and interpret the slideshow files. It makes the kind of presentations I do very easy to knock together, and it may do the same for you.

Usage
-----

### Get Stopwork
There is no Ruby Gem yet, so the installation procedure is manual.

Install Stopwork's dependancies.

```
$ gem install kramdown
$ gem install mustache
```

Grab the code off of GitHub and `cd` into the folder.

```
$ git clone git@github.com:nasser/stopwork.git
$ cd stopwork
```

### Write presentation
Write your presentation into a text file, e.g. `presentation.stpwrk`

```
# Hello, world!
## Isn't this cool?
http://p.im9.eu/cool-winking-puppy.jpg

So, I searched 'funny cat' in YouTube
Top result:
http://www.youtube.com/watch?v=Kdgt1ZHkvnM

// some research
# Ever wondered where funny cats come from?
http://en.wikipedia.org/wiki/Lolcat
```

Each line represents a slide. Blank lines and lines beggining with `//` are ignored. The slide's type is determined from the text's content. Anything that looks like an image is interpreted and displayed as an image. Anything that looks like a video link or webpage is embedded. Everything else is rendered as [Markdown](http://daringfireball.net/projects/markdown/syntax). That's all.

### Launch presentation

Launch the presentation by running the script in the `bin` folder with the path to the presentation file as an argument

```
$ ./bin/stopwork presentation.stpwrk
```

This will spin up a server at `http://localhost:54021` where your presentation can be found.

Speak slowly, clearly, and confidently, and maintain eye contact with your audience. You're going to do great.

Navigation
----------
Right and left keyboard keys go to the next and previous slides, respectively. Moving the mouse to the bottom center reveals previous and next buttons that can be clicked. This is useful if a web slide steals keyboard focus.

Next Steps
----------
- Responsive CSS for smaller screens
- Better local asset support
- Custom types
- Custom slide transitions
- Custom themes

Name
----
The platform was originally named after the monthly Stop Work meetings at [Eyebeam](http://eyebeam.org) where fellows and residents present their work and receive feedback.

Legal 
-----
Copyright © 2012-2013 Ramsey Nasser. Released under the MIT License.

[Skeleton](http://www.getskeleton.com/) Copyright © 2012 Dave Gamache

[jQuery](http://jquery.com) Copyright © 2012 jQuery Foundation and other contributors

[Iconic Font](http://somerandomdude.com/work/iconic/) Copyright © 2012, P.J. Onori