# frozen_string_literal: true

require "test_helper"

class EstimatesControllerTest < ActionDispatch::IntegrationTest
  expect "post create" do
    assert_create_succeeds(
      Estimate,
      :estimate,
      :alternative_estimates_url,
      parent: alternatives(:apple),
      criterion_id: criteria(:battery).id,
      estimate: 0.88
    )
  end

  expect "patch update" do
    assert_patch_succeeds(
      estimates(:google_battery),
      :estimate_url,
      estimate: 0.68
    )
  end
end
