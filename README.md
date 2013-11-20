# Blongular (alpha)

![](https://dl.dropboxusercontent.com/u/21773527/blongular.jpg)

## Features

- WYSIWYG Editor ([Medium Editor](https://github.com/daviferreira/medium-editor))
- Theme System
- Account System
- Multi Blog Support
- Multi Domain Support
- Gravatar Support

## Coming Soon™

- More configuration
- Easy Plugin System
- Internationalization (I18N)
- Search
- Render Static Cache of Pages
- Full Admin Panel
- SEO
- Support Mulitple Template Engines on Themes

Make sugestions!

## Quick Start

### Requirements

- Node.JS v0.8.21+
- MongoDB Database

### Installing

- Download the lastest version of Blongular. ([Download ZIP](http://blongular.com/latest.zip) | [Download TAR.GZ](http://blongular.com/latest.tar.gz))
- Decompress it.
- Run with: `node index --install`
- Visit `http://YOUR_IP_ADDRESS:27890/` on your browser.

### Understanding

Lets understand Blongular's directory:

```
/blogs/					Directory where you put all your blongular blogs
/blongular/				Blongular core directory
config.json				Blongular server configuration
```

The rest you should ignore.

Now, let's understand the structure of a blog:

```
/controllers/			Directory where the controller engine goes.
/editor/				Directory where the editor engine goes.
/themes/				Directory where you should put your themes folders
blongular.json			Blog's configuration
components.json			Blog's database and plugin configuration
```

### Configuring

##### Blog Singular Configuration

Inside your blog directory you will find two files for your blog configuration:

- blongular.js (blog configuration)
- components.js (database/plugins configuration)

##### Server configuration (config.json)

This configuration is for all blogs running inside your Blongular's directory.

## Contributing

- Support any project that this project depends on.
- Read our [contributing guide](https://github.com/blongular/blongular/blob/master/CONTRIBUTING.md).
- Read our [security guide](https://github.com/blongular/blongular/blob/master/SECURITY.md).

## License (MIT)

Copyright (C) 2013 Pedro Nasser

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.