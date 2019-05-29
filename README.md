# Slate 
[![Code Climate](https://codeclimate.com/github/RomainMarecat/slate/badges/gpa.svg)](https://codeclimate.com/github/RomainMarecat/slate)
[![Build Status](https://travis-ci.org/RomainMarecat/slate.svg?branch=master)](https://travis-ci.org/RomainMarecat/slate)
[![Test Coverage](https://codeclimate.com/github/RomainMarecat/slate/badges/coverage.svg)](https://codeclimate.com/github/RomainMarecat/slate/coverage)

ALR Slate

## Features
- Online store with secure payment system
- Features list site
- A Demo site 
- Blog site (WIP)
- Recipe site
- Car site 
- Hockey site

### Coming soon
- Booking site
- Dashboard manager
- Layout builder with theme color


### Best integration with tools :
- Angular cli
- Webpack
- PWA
- SSR (WIP on firebase ssr function)
- Sass
- Firebase

### Easy to plug to enterprise
- Simple configuration from firebase with secure rules
- All connection to firebase
- Travis CI Integration
- Fast deployment with firebase 
- Jasmine Tests

### Material
- Most projects components were designed with Material component 
- Bootstrap was used too to had nice media queries and classes shortcut

### Comments
- Project was included a lot of comments for each tricky functions
- Designed form developpers

### 3rd third library 
- All library was included typings to compile native code

## Prerequistes:
`node -v` : >= v8.9.1
`npm -v` : >= 6.1.0

### Right on npm global installation folder
`sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}`
  
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`..
By default, app-showcase is launch without any option

With --project=app_name you could launch the demo 

### Commits
    Skip build travis `[ci skip]`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running lint

Run `ng lint -fix`

## Deploy 

`deploy/deploy.sh` 

## Firebase 
Adding a new environment
Adding and switching between environments with the Firebase CLI is as simple as one command: firebase use.

When you first initialize your Firebase Hosting project with firebase init you specify what project you want to deploy your app to. This is your default project. The use command allows you to add another project.

`firebase use --add`
This command prompts you to choose from one of your existing projects:

`firebase use --add`
```
$ ? Which project do you want to add? (Use arrow keys)
  my-production-project
> my-staging-project
  my-dev-project
```
Select the project you want to use for a different environment, and then give it an alias. The alias can really be whatever you want, but it’s common to use aliases like “development”, “staging”, or “production”.
```
firebase use --add
```

```
$ ? Which project do you want to add? (Use arrow keys)
  my-production-project
> my-staging-project
  my-dev-project
? What alias do you want to use for this project? (e.g. staging) staging
```
Created alias staging my-staging-project.
Now using alias staging (my-staging-project)
Once you’ve created a new alias, it will be set as the current environment for deployment. Running firebase deploy will deploy your app to that environment.

Switching environments
If you want to switch to another environment, just provide the alias in the use command.

### sets environment to the default alias
```
firebase use default
```

```
firebase use staging 
```

### sets environment to the staging alias For a single command, you can also specify the environment using the -P flag:
```
firebase deploy -P staging 
```
### deploy to staging alias

That’s it!

Romain Marecat
