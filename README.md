# Angular Primer for a quick PWA that respects the PRPL pattern

_By Alejandro Quesada, Software Engineer_

* [Angular Primer with a bit of the PRPL PWA Pattern, Server-side Rendering with Universal and other optimizations](#angular-primer-with-a-bit-of-the-prpl-pwa-pattern-server-side-rendering-with-universal-and-other-optimizations)
  * [Get Started](#get-started)
  * [Steps](#steps)

## Get Started

Install the following dependencies:

* [Angular CLI](https://cli.angular.io/)
* [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/en/)

We will be using Angular 5 and Angular CLI 1.6.

## Steps

* Create an NG application

```sh
$ ng new ngapp --service-worker --routing
```

* Let's benchmark with Lighthouse and `ng build --prod --aot`:

![PWA](/assets/1-1.png)
![Stats](/assets/1-2.png)

* Create an App Shell

```sh
$ npm install @angular/platform-server
$ ng generate universal ngu-app-shell
$ ng generate app-shell loading-shell \
    --universal-app=ngu-app-shell \
    --route=app-shell-path
```

* Let's benchmark with Lighthouse and `ng build --prod --aot`:

![Stats](/assets/2-1.png)

* What is enabled with a Shell vs no Shell besides ~600ms First-Paint speed saved for a 3G connection? Rehydration!

```html
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Ngapp</title><base href="/"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/x-icon" href="favicon.ico"><link href="styles.9c0ad738f18adc3d19ed.bundle.css" rel="stylesheet"><style ng-transition="serverApp"></style></head><body><app-root _nghost-c0="" ng-version="5.2.9"></app-root><script type="text/javascript" src="inline.69fe2ea4c1357caad977.bundle.js"></script><script type="text/javascript" src="polyfills.46af3f84a403e219371b.bundle.js"></script><script type="text/javascript" src="main.3f0a915399c6ba87014e.bundle.js"></script></body></html>
```

```html
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Ngapp</title><base href="/"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/x-icon" href="favicon.ico"><link href="styles.9c0ad738f18adc3d19ed.bundle.css" rel="stylesheet"><style ng-transition="serverApp"></style></head><body><app-root _nghost-c0="" ng-version="5.2.9">
<div _ngcontent-c0="" style="text-align:center">
  <h1 _ngcontent-c0="">
    Welcome to app!
  </h1>
  <img _ngcontent-c0="" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==" width="300">
</div>
<h2 _ngcontent-c0="">Here are some links to help you start: </h2>
<ul _ngcontent-c0="">
  <li _ngcontent-c0="">
    <h2 _ngcontent-c0=""><a _ngcontent-c0="" href="https://angular.io/tutorial" rel="noopener" target="_blank">Tour of Heroes</a></h2>
  </li>
  <li _ngcontent-c0="">
    <h2 _ngcontent-c0=""><a _ngcontent-c0="" href="https://github.com/angular/angular-cli/wiki" rel="noopener" target="_blank">CLI Documentation</a></h2>
  </li>
  <li _ngcontent-c0="">
    <h2 _ngcontent-c0=""><a _ngcontent-c0="" href="https://blog.angular.io/" rel="noopener" target="_blank">Angular blog</a></h2>
  </li>
</ul>

<router-outlet _ngcontent-c0=""></router-outlet><app-shell _nghost-c1=""><p _ngcontent-c1="">
  app-shell works!
</p>
</app-shell>
</app-root><script type="text/javascript" src="inline.69fe2ea4c1357caad977.bundle.js"></script><script type="text/javascript" src="polyfills.46af3f84a403e219371b.bundle.js"></script><script type="text/javascript" src="main.3f0a915399c6ba87014e.bundle.js"></script></body></html>
```

* In our previous benchmark, there is render-blocking stylesheet. Let's remove it by removing references to `"styles.css"` in the `.angular-cli.json`. The end result should be:

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "project": {
    "name": "ngapp"
  },
  "apps": [
    {
      "root": "src",
      "outDir": "dist",
      "assets": ["assets", "favicon.ico"],
      "index": "index.html",
      "main": "main.ts",
      "polyfills": "polyfills.ts",
      "test": "test.ts",
      "tsconfig": "tsconfig.app.json",
      "testTsconfig": "tsconfig.spec.json",
      "prefix": "app",
      "styles": [],
      "scripts": [],
      "environmentSource": "environments/environment.ts",
      "environments": {
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts"
      },
      "serviceWorker": true,
      "appShell": {
        "app": "ngu-app-shell",
        "route": "app-shell-path"
      }
    },
    {
      "root": "src",
      "outDir": "dist-server",
      "assets": ["assets", "favicon.ico"],
      "index": "index.html",
      "main": "main.server.ts",
      "test": "test.ts",
      "tsconfig": "tsconfig.server.json",
      "testTsconfig": "tsconfig.spec.json",
      "prefix": "app",
      "styles": [],
      "scripts": [],
      "environmentSource": "environments/environment.ts",
      "environments": {
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts"
      },
      "serviceWorker": true,
      "platform": "server",
      "name": "ngu-app-shell"
    }
  ],
  "e2e": {
    "protractor": {
      "config": "./protractor.conf.js"
    }
  },
  "lint": [
    {
      "project": "src/tsconfig.app.json",
      "exclude": "**/node_modules/**"
    },
    {
      "project": "src/tsconfig.spec.json",
      "exclude": "**/node_modules/**"
    },
    {
      "project": "e2e/tsconfig.e2e.json",
      "exclude": "**/node_modules/**"
    }
  ],
  "test": {
    "karma": {
      "config": "./karma.conf.js"
    }
  },
  "defaults": {
    "styleExt": "css",
    "component": {}
  }
}
```

* Let's benchmark with Lighthouse and `ng build --prod --aot`:

![Stats](/assets/3-1.png)

Our Lighthouse First-Paint speed for a 3G connection in this case was 800ms.

* Let's update a few of the meta PWA tasks. First edit the `index.html` as so to accomodate specific meta data:

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Ngapp</title>
  <base href="/">
  <link rel="manifest" href="assets/manifest.json">
  <meta name="description" content="An example Angular5 application with Service Worker" />
  <meta name="theme-color" content="#f2f2f2">

  <meta name="mobile-web-app-capable" content="yes">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>

<body>
  <app-root></app-root>
  <noscript>
    Javascript must be enabled to use this app.
  </noscript>
</body>

</html>
```

Note the new `<noscript>` tags and `<meta>` tags.

* Create a `assets/manifest.json`:

```json
{
  "short_name": "Ngapp",
  "name": "Angular 5.0 PWA",
  "start_url": "/",

  "theme_color": "#f2f2f2",
  "background_color": "#ffffff",

  "display": "standalone",
  "orientation": "portrait",

  "icons": [
    {
      "src": "/assets/icons/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

The browser requires the `manifest.json` for prompting web app download to device.

* Let's benchmark with Lighthouse and `ng build --prod --aot`:

![Stats](/assets/4-1.png)

Our PWA score is now 91. When we deliver via HTTPS, it will be 100.
