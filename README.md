# Forks in the Road

## Developing

### Getting started

1. Register a [new GitHub OAuth application](https://github.com/settings/applications/new)
2. Copy your application's client ID and client secret into two new environment variables: `FORKSINTHEROAD_GITHUB_CLIENT_ID` and `FORKSINTHEROAD_GITHUB_CLIENT_SECRET`
3. Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
4. Run `gem install bundler` to install project gem manager
5. Run `bundler install --without production` to install project gems
6. Run `bin/overcommit --install` to enable Git hooks
7. Run `bin/rails db:migrate` to set up the database
8. Run `bin/rails server` to start up Rails
9. Visit http://localhost:3000 to view the app

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
6. Run `yarn prettier-write` to reformat all JavaScript code
7. Run `yarn sass-lint-all` to check all Sass style/patterns

## License

This project is released under the MIT License (see
[LICENSE.md](LICENSE.md) for details).
