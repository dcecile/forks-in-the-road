# Forks in the Road
_Probability-calibrated comparison of many alternatives_

[![Build Status](https://semaphoreci.com/api/v1/dcecile/forks-in-the-road/branches/master/badge.svg)](https://semaphoreci.com/dcecile/forks-in-the-road) [![Maintainability](https://api.codeclimate.com/v1/badges/989b1e9c546c18f6f67f/maintainability)](https://codeclimate.com/github/dcecile/forks-in-the-road/maintainability)

## Developing

### Getting started

1. Register a [new (development) GitHub OAuth application](https://github.com/settings/applications/new)
2. Set the GitHub OAuth application's _authorization callback URL_ to `http://localhost:3000/app/`
3. Copy your application's client ID and client secret into two new environment variables: `FORKSINTHEROAD_GITHUB_DEV_CLIENT_ID` and `FORKSINTHEROAD_GITHUB_DEV_CLIENT_SECRET`
4. Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
5. Run `gem install bundler` to install project gem manager
6. Run `bundler install --without production` to install project gems
7. Run `bin/overcommit --install` to enable Git hooks
8. Run `bin/rails db:migrate` to set up the database
9. Run `bin/rails server` to start up Rails
10. Visit http://localhost:3000 to view the app

### Ruby changes

1. Run `bin/guard` to start continuous testing
2. Change a source or test file, and the relevant tests will run automatically
3. Run `bin/rubocop` to check all Ruby style/patterns
4. Run `bin/rails server` to start up Rails
5. Visit http://localhost:3000 to view the app

### JavaScript/Sass changes

1. Run `bin/webpack-dev-server` to start incremental JavaScript/Sass compilation
2. In another terminal, run `bin/rails server` to start up Rails
3. Visit http://localhost:3000 to view the app
4. Change a source file, and the app will reload automatically
5. Run `yarn eslint-all` to check all JavaScript style/patterns
6. Run `yarn eslint-all --fix` to reformat all JavaScript code
7. Run `yarn sass-lint-all` to check all Sass style/patterns

## Deploying to Heroku

1. Install [Heroku CLI tools](https://devcenter.heroku.com/articles/heroku-cli)
2. Run `heroku create` to initialize the Heroku app
3. (Optional) Run `heroku apps:rename NEWNAME` to rename your app
4. Register a [new (production) GitHub OAuth application](https://github.com/settings/applications/new)
5. Set the GitHub OAuth application's _authorization callback URL_ to the root URL of your Heroku app (e.g. `https://powerful-oasis-50094.herokuapp.com/app/`)
6. Set Heroku config vars for your application's client ID and client secret: `heroku config:set FORKSINTHEROAD_GITHUB_PROD_CLIENT_ID=x` and `heroku config:set FORKSINTHEROAD_GITHUB_PROD_CLIENT_SECRET=x`
7. Run `git push heroku master` to push code to the Heroku app
8. Run `heroku run rails db:migrate` to set up the database
9. Run `heroku open` to visit the website

## License

This project is released under the MIT License (see
[LICENSE.md](LICENSE.md) for details).
