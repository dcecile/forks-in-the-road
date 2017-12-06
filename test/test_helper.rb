# frozen_string_literal: true

require File.expand_path("../../config/environment", __FILE__)
require "rails/test_help"

module ActiveSupport
  class TestCase
    fixtures :all

    def self.expect(test_description, &test_block)
      test("expect #{test_description}", &test_block)
    end
  end
end
