# frozen_string_literal: true

require "test_helper"

class AlternativeTest < ActiveSupport::TestCase
  expect "validation fails without comparison" do
    assert_validation_fails Alternative.new(
      name: "Test"
    )
  end

  expect "validation fails without name" do
    assert_validation_fails Alternative.new(
      comparison: comparisons(:phone)
    )
  end

  expect "validation passes with comparison and name" do
    assert_validation_passes Alternative.new(
      comparison: comparisons(:phone),
      name: "Test"
    )
  end

  expect "validation fails with invalid URL" do
    assert_validation_fails Alternative.new(
      comparison: comparisons(:phone),
      name: "Test",
      url: "myurl.com"
    )
  end

  expect "validation passes with valid URL" do
    assert_validation_passes Alternative.new(
      comparison: comparisons(:phone),
      name: "Test"
    )
  end
end
