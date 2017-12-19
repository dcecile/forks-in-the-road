# Forks in the Road

## Developing

### Getting started

1. Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
2. Run `gem install bundler` to install project gem manager
3. Run `bundler install --without production` to install project gems
4. Run `bin/overcommit --install` to enable Git hooks
5. Run `bin/rails db:migrate` to set up the database
6. Optionally, run `bin/rails db:seed_fu` to seed the development DB with example data
7. Run `bin/rails server` to start up Rails
8. Visit http://localhost:3000 to view the app

### Ruby changes

1. Run `bin/guard` to start continuous testing
2. Change a source or test file, and the relevant tests will run automatically
3. Run `bin/rubocop` to check all Ruby style/patterns
4. Run `bin/rails server` to start up Rails
5. Visit http://localhost:3000 to view the app

### JavaScript changes

1. Run `bin/webpack-dev-server` to start incremental JavaScript compilation
2. In another terminal, run `bin/rails server` to start up Rails
3. Visit http://localhost:3000 to view the app
4. Change a source file, and the app will reload automatically
5. Run `yarn eslint-all` to check all JavaScript style/patterns
6. Run `yarn prettier-write` to reformat all JavaScript code

## License

This project is released under the MIT License (see
[LICENSE.md](LICENSE.md) for details).
