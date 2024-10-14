# AngularFantasyCricket

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## How to deploy 
0) make sure the 'ENV' variable in src/app/config.ts is set to 'REMOTE'

a) Run the following command to generate distribution files: 

```ng build --output-path=dist/angular_fantasy_cricket --base-href /``` 
b) manually Edit the index.html in the dist/browser folder to change the base href  as follows:
From:
<base href="/">
To:
<base href="./">

c) check if a file called 'CNAME' exists in dist/browser, if not create one 
and in the content simply put: cmcc-fantasy-cricket.click

d) deploy to github pages by running: 
```npx angular-cli-ghpages --dir=dist/angular_fantasy_cricket/browser```


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

