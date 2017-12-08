# frozen_string_literal: true

require File.expand_path("../../config/environment", __FILE__)
require "rails/test_help"
require "json_expressions/minitest"

module ActiveSupport
  class TestCase
    fixtures :all

    def self.expect(test_description, &test_block)
      test("expect #{test_description}", &test_block)
    end

    def assert_response_json(pattern)
      assert_json_match pattern, @response.body
    end
  end
end
