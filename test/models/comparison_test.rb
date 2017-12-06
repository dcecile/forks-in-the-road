# frozen_string_literal: true

require "test_helper"

class ComparisonTest < ActiveSupport::TestCase
  expect "validation fails without name" do
    comparison = Comparison.new
    assert_raises(ActiveRecord::RecordInvalid) do
      comparison.validate!
    end
  end

  expect "validation passes with name" do
    comparison = Comparison.new(name: "Test")
    assert comparison.validate!
  end
end
