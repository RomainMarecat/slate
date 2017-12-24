# Monpullmoche [![Build Status](https://travis-ci.com/RomainStudent/monpullmoche.svg?token=ft2MNN7yrCxWmByy17ND&branch=master)](https://travis-ci.com/RomainStudent/monpullmoche)

Monpullmoche was generated with [Angular CLI](https://github.com/angular/angular-cli).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Commits
    Skip build travis `[ci skip]`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

A module with routing : 
``` ng g module --routing```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running lint

Run `ng lint -fix`

## Deploy 

```ng build -aot --env=prod -prod --app=hockey```
```npm run precache```


## Features

https://github.com/RomainStudent/monpullmoche/projects


## Firebase 
Adding a new environment
Adding and switching between environments with the Firebase CLI is as simple as one command: firebase use.

When you first initialize your Firebase Hosting project with firebase init you specify what project you want to deploy your app to. This is your default project. The use command allows you to add another project.

```$ firebase use --add```
This command prompts you to choose from one of your existing projects:

```$ firebase use --add```
```$ ? Which project do you want to add? (Use arrow keys)
  my-production-project
> my-staging-project
  my-dev-project```
Select the project you want to use for a different environment, and then give it an alias. The alias can really be whatever you want, but it’s common to use aliases like “development”, “staging”, or “production”.

```$ firebase use --add```
```$ ? Which project do you want to add? (Use arrow keys)
  my-production-project
> my-staging-project
  my-dev-project
? What alias do you want to use for this project? (e.g. staging) staging ```
Created alias staging my-staging-project.
Now using alias staging (my-staging-project)
Once you’ve created a new alias, it will be set as the current environment for deployment. Running firebase deploy will deploy your app to that environment.

Switching environments
If you want to switch to another environment, just provide the alias in the use command.

```$ firebase use default # sets environment to the default alias```
```$ firebase use staging # sets environment to the staging alias For a single command, you can also specify the environment using the -P flag:```
```$ firebase deploy -P staging # deploy to staging alias```

That’s it!
