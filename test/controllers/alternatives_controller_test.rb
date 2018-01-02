# frozen_string_literal: true

require "test_helper"

class AlternativesControllerTest < ActionDispatch::IntegrationTest
  expect "post create" do
    assert_create_succeeds(
      Alternative,
      :name,
      :comparison_alternatives_url,
      parent: comparisons(:phone),
      name: "New",
      estimates: []
    )
  end

  expect "patch update" do
    assert_patch_succeeds(
      alternatives(:google),
      :alternative_url,
      name: nil,
      url: "https://google.ca"
    )
  end
end
