# frozen_string_literal: true

require "test_helper"

class CriterionTest < ActiveSupport::TestCase
  expect "validation fails without comparison" do
    assert_validation_fails Criterion.new(
      name: "Test",
      full_value: 20
    )
  end

  expect "validation fails without name" do
    assert_validation_fails Criterion.new(
      comparison: comparisons(:phone),
      full_value: 20
    )
  end

  expect "validation fails without full value" do
    assert_validation_fails Criterion.new(
      comparison: comparisons(:phone),
      name: "Test"
    )
  end

  expect "validation passes with comparison and name and full value" do
    assert_validation_passes Criterion.new(
      comparison: comparisons(:phone),
      name: "Test",
      full_value: 20
    )
  end
end
