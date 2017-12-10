# frozen_string_literal: true

require "test_helper"

class EstimateTest < ActiveSupport::TestCase
  expect "validation fails without alternative" do
    assert_validation_fails Estimate.new(
      criterion: criteria(:battery),
      estimate: 0.4
    )
  end

  expect "validation fails without criterion" do
    assert_validation_fails Estimate.new(
      alternative: alternatives(:apple),
      estimate: 0.4
    )
  end

  expect "validation fails without estimate" do
    assert_validation_fails Estimate.new(
      alternative: alternatives(:apple),
      criterion: criteria(:battery)
    )
  end

  expect "validation passes with alternative and criterion and estimate" do
    assert_validation_passes Estimate.new(
      alternative: alternatives(:apple),
      criterion: criteria(:battery),
      estimate: 0.4
    )
  end

  expect "validation fails with non-unique alternative and criterion" do
    assert_validation_fails Estimate.new(
      alternative: alternatives(:google),
      criterion: criteria(:battery),
      estimate: 0.4
    )
  end

  expect "validation fails with less-than-zero estimate" do
    assert_validation_fails Estimate.new(
      alternative: alternatives(:apple),
      criterion: criteria(:battery),
      estimate: -0.1
    )
  end

  expect "validation fails with greater-than-one estimate" do
    assert_validation_fails Estimate.new(
      alternative: alternatives(:apple),
      criterion: criteria(:battery),
      estimate: 1.1
    )
  end

  expect "validation fails with not-a-number estimate" do
    assert_validation_fails Estimate.new(
      alternative: alternatives(:apple),
      criterion: criteria(:battery),
      estimate: Float::NAN
    )
  end

  expect "validation passes with zero estimate" do
    assert_validation_passes Estimate.new(
      alternative: alternatives(:apple),
      criterion: criteria(:battery),
      estimate: 0.0
    )
  end

  expect "validation passes with one estimate" do
    assert_validation_passes Estimate.new(
      alternative: alternatives(:apple),
      criterion: criteria(:battery),
      estimate: 1.0
    )
  end
end
