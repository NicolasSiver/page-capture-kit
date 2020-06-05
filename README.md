# Page Capture Kit

An experimental tool to help with navigating sites in order to capture a deeply nested page as a screenshot.
This tool will allow you to capture pages that are under authentication. Page Capture Kit includes simplified logic to pre-fill forms with provided credentials.

Example:

```shell
page-capture-kit --scripts=/my/path/to/folder --output=/my/path/to/screenshots
```

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Motivation](#motivation)
- [Scripts](#scripts)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Motivation

What if you need some data for your needs but service does not provide API to get it. 
What if every month you need invoice-like information from video services you are using.
The motivation behind the tool to capture deeply nested pages with the information you can get in a different way other than navigating around the website and capturing a screenshot.

This tool does not include any fancy parsing logic or solutions to bypass CAPTCHA and other systems for the protection against unauthorized or bot access.
But it can help with simple cases like to grab the last payment for Netflix or other services.

## Scripts

Script is a concept for the set of instructions for Page Capture Kit to execute on.
You write scripts in JavaScript and put them in some directory.
Page Capture Kit will "play" them for you with the likely screenshot as output in the end.

The main helping tool in the script writing is `Context`. 
`Context` provides the set of predefined methods to help with actions like `click` items on the page, or visiting web pages.

Example of very basic script with Google (`basic-google.script.js`).
Store this script somewhere and ask `Page Capture Kit` to play it:

```javascript
class GoogleExample {
    visit(payload, context) {
        return context.series(
            context.open('https://www.google.com'),
            context.capture('Google'),
            context.end()
        );
    }
}

module.exports = GoogleExample;
```

```shell
# It will output PNG with Google page in the current directory where you run Page Capture Kit
page-capture-kit --scripts=/path/to/directory/with/basic-google --output=./ 
```