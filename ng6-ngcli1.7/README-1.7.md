# Angular Primer with a bit of the PRPL PWA Pattern, Server-side Rendering with Universal and other optimizations enabled by Angular CLI 1.7

_By Alejandro Quesada, Software Engineer_

* [Angular Primer with a bit of the PRPL PWA Pattern, Server-side Rendering with Universal and other optimizations](#angular-primer-with-a-bit-of-the-prpl-pwa-pattern-server-side-rendering-with-universal-and-other-optimizations)
  * [Get Started](#get-started)
  * [Steps](#steps)
  * [E2E](#e2e)

## Get Started

Install the following dependencies:

* [Angular CLI](https://cli.angular.io/)
* [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/en/)
* [Docker](https://www.docker.com/)

We will be using Angular 6-rc1 and Angular CLI 1.7. We will be using an included Docker container to accomplish this without cluttering our local machine.

## Steps

* First we will create a new Angular app via our AngularCLI 1.7 Docker container, the command has been obfuscated the highest level

```sh
$ make app="<YOUR APP NAME>"
```

* Let's add an App Budget (made possible by AngularCLI 1.7) to the `angular.json`. The goal is to enforce slimmer builds. Replace the file with:

```json
{
  "$schema":
    "./node_modules/@angular-devkit/core/src/workspace/workspace-schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "bestapp": {
      "root": "",
      "projectType": "application",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/bestapp",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.app.json",
            "assets": [
              {
                "glob": "favicon.ico",
                "input": "src",
                "output": "/"
              },
              {
                "glob": "**/*",
                "input": "src/assets",
                "output": "/assets"
              }
            ],
            "styles": [
              {
                "input": "src/styles.css"
              }
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "serviceWorker": true,
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "bestapp:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "bestapp:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "bestapp:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "src/tsconfig.spec.json",
            "karmaConfig": "src/karma.conf.js",
            "styles": [
              {
                "input": "styles.css"
              }
            ],
            "scripts": [],
            "assets": [
              {
                "glob": "favicon.ico",
                "input": "src/",
                "output": "/"
              },
              {
                "glob": "**/*",
                "input": "src/assets",
                "output": "/assets"
              }
            ]
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": ["src/tsconfig.app.json", "src/tsconfig.spec.json"],
            "exclude": ["**/node_modules/**"]
          }
        }
      }
    },
    "bestapp-e2e": {
      "root": "e2e/",
      "projectType": "application",
      "architect": {
        "e2e": {
          "builder": "@angular-devkit/build-angular:protractor",
          "options": {
            "protractorConfig": "e2e/protractor.conf.js",
            "devServerTarget": "bestapp:serve"
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": "e2e/tsconfig.e2e.json",
            "exclude": ["**/node_modules/**"]
          }
        }
      }
    }
  }
}
```

* Let's create an `src/ngsw-config.json` to accomodate a production service worker:

```json
{
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": ["/favicon.ico", "/index.html"],
        "versionedFiles": [
          "/styles.*.css",
          "/runtime.*.js",
          "/polyfills.*.js",
          "/main.*.js"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": ["/assets/**"]
      }
    }
  ]
}
```

*

- Let's generate an App Shell per PRPL standard:

```js
$ cd <YOUR APP NAME>
$ ng generate universal ngu-app-shell
$ ng generate app-shell my-loading-shell \
  --universal-app=ngu-app-shell \
  --route=app-shell-path
```

<!-- http://blog.ninja-squad.com/2018/02/19/angular-cli-1.7/ -->

<!-- smaller builds, pwa, angular universal, amp output, lambda, lighthouse -->
