# frozen_string_literal: true

# More info at https://github.com/guard/guard#readme

guard :minitest, spring: "bin/rails test" do
  watch %r{^app/(.+)\.rb$} do |m|
    "test/#{m[1]}_test.rb"
  end
  watch %r{^app/controllers/application_controller\.rb$} do
    "test/controllers"
  end
  watch %r{^app/controllers/(.+)_controller\.rb$} do |m|
    "test/integration/#{m[1]}_test.rb"
  end
  watch %r{^lib/(.+)\.rb$} do |m|
    "test/lib/#{m[1]}_test.rb"
  end
  watch %r{^test/.+_test\.rb$}
  watch %r{^test/test_helper\.rb$} do
    "test"
  end
  watch %r{^test/fixtures/.+\.yml$} do
    "test"
  end
end
