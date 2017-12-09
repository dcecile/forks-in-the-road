# frozen_string_literal: true

require "test_helper"

class ComparisonTest < ActiveSupport::TestCase
  expect "validation fails without name" do
    assert_validation_fails Comparison.new
  end

  expect "validation passes with name" do
    assert_validation_passes Comparison.new(
      name: "Test"
    )
  end

  expect "has comparisons" do
    assert_includes(
      comparisons(:phone).alternatives,
      alternatives(:google)
    )
    assert_includes(
      comparisons(:phone).alternatives,
      alternatives(:apple)
    )
  end

  expect "has criteria" do
    assert_includes(
      comparisons(:phone).criteria,
      criteria(:battery)
    )
    assert_includes(
      comparisons(:phone).criteria,
      criteria(:ram)
    )
  end
end
