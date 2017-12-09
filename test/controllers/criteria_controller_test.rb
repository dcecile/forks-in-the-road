# frozen_string_literal: true

require "test_helper"

class CriteriaControllerTest < ActionDispatch::IntegrationTest
  expect "post create" do
    assert_create_succeeds(
      Criterion,
      :name,
      :comparison_criteria_url,
      parent: comparisons(:phone),
      name: "New",
      full_value: 80
    )
  end

  expect "patch update" do
    assert_patch_succeeds(
      criteria(:ram),
      :criterion_url,
      name: nil,
      description: "Random Access Memory",
      full_value: nil,
      default_estimate: 0.4
    )
  end
end
