# frozen_string_literal: true

source "https://rubygems.org"
ruby "2.4.2"

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 5.1.5"
group :development, :test do
  # Use sqlite3 as the database for Active Record
  gem "sqlite3"
end
group :production do
  # Use pg as the database for Active Record
  gem "pg", "~> 1.0.0"
end
# Use Puma as the app server
gem "puma", "~> 3.11"
# Validate ActiveRecord URLs
gem "validate_url"
# Use Webpack to manage JavaScript packages
gem "webpacker"
# Use React-Rails to integrate React
gem "react-rails"
# Use official GitHub client
gem "octokit", "~> 4.0"
# Use Knock for JWT authentication
gem "knock", "~> 2.1"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
# gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'
# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making
# cross-origin AJAX possible
# gem 'rack-cors'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger
  # console
  gem "byebug", platforms: %i[mri mingw x64_mingw]
  # Use Rubocop for style checking
  gem "rubocop"
  # Use JSON Expressions for checking JSON API responses
  gem "json_expressions"
end

group :development do
  # Use Guard for continuous testing
  gem "guard"
  gem "guard-minitest"
  # Use Overcommit for Git hooks
  gem "overcommit"
  # Access an IRB console on exception pages or by using <%= console %>
  # anywhere in the code.
  gem "listen", ">= 3.0.5", "< 3.2"
  # Spring speeds up development by keeping your application running in the
  # background. Read more: https://github.com/rails/spring
  gem "spring"
  gem "spring-watcher-listen", "~> 2.0.0"
  # Use Capistrano for deployment
  # gem 'capistrano-rails'
end
