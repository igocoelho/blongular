Blongular v0.0.1 (alpha)
==========================

![](https://dl.dropboxusercontent.com/u/21773527/blongular.jpg)

## Features
- WYSIWYG Editor ([Medium Editor](https://github.com/daviferreira/medium-editor))
- Theme Support (DustJS as template engine)
- Plugin Support
- Multiple Account Support
- Multiple Blog Support
- Multiple Domain Support
- Gravatar Support
- Setup Manager

## Coming Soon™

- Support Other Template Engines (like Jade)
- Easy Install Plugin Manager
- Internationalization (I18N)
- Search
- Static Content Rendering Mode
- Search Engine Optimization

Make sugestions!

# Quick Start

## Requirements

- Node.JS v0.8.21+ and NPM
- MongoDB Database

## Install

- Download the lastest version of Blongular. ([Download ZIP](http://blongular.com/latest.zip) | [Download TAR](http://blongular.com/latest.tar.gz))
- Decompress it.
- Inside the new directory created, type: `npm install`

## Setup (--setup)

Now let's setup your new blongular.

- Inside blongular's directory, type: `npm start --setup`
- Visit `http://<your ip address or localhost>:27890/` on your browser.]

## Development (--dev) 

You can run using the development mode for editing your blog without restarting.

      $ npm start --dev

# Structure

## Blongular's directory

```
/blogs/                 Directory where you put all your blongular blogs
config.json             Blongular server configuration
```

The rest you should ignore, unless you want to edit blongular's behavior.

## Blongular's Blog directory
```
/plugins/               Directory where you install your plugins
/themes/                Directory where you install your themes
blongular.json          Blog's configuration
components.json         Blog's components configurations
plugins.json            Blog's plugins configurations
```

# Support & Contribute

Feel welcome to open **PR/Issues/Features/Suggestions** but [read this first](http://github.com/blongular/blongular), please.

# MIT License

Copyright (c) 2013 Pedro Nasser <http://pedroncs.com/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
