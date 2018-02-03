# frozen_string_literal: true

require "test_helper"

class ComparisonsControllerTest < ActionDispatch::IntegrationTest
  expect "get index" do
    get comparisons_url
    assert_response :success
    assert_response_json(
      comparisons(:phone, :plan).map do |comparison|
        {
          id: comparison.id,
          alternatives_size: Integer
        }.ignore_extra_keys!
      end
    )
  end

  expect "post create" do
    assert_create_succeeds(
      Comparison,
      :name,
      :comparisons_url,
      name: "New"
    )
  end

  expect "get show" do
    comparison = comparisons(:phone)
    get comparison_url(comparison.id)
    assert_response :success
    assert_response_json(
      id: comparison.id,
      name: comparison.name,
      alternative_noun: comparison.alternative_noun,
      value_unit: comparison.value_unit,
      created_at: String,
      updated_at: String,
      alternatives:
        alternatives(:google, :apple).map(&method(:show_alternative)),
      criteria:
        criteria(:battery, :ram).map(&method(:show_criterion))
    )
  end

  def show_alternative(alternative)
    {
      id: alternative.id,
      name: alternative.name,
      url: alternative.url,
      comparison_id: alternative.comparison_id,
      created_at: String,
      updated_at: String,
      estimates: get_estimates(alternative).map(&method(:show_estimate))
    }
  end

  def get_estimates(alternative)
    if alternative == alternatives(:google)
      estimates(:google_battery, :google_ram)
    else
      []
    end
  end

  def show_estimate(estimate)
    {
      id: estimate.id,
      estimate: estimate.estimate,
      alternative_id: estimate.alternative_id,
      criterion_id: estimate.criterion_id,
      created_at: String,
      updated_at: String
    }
  end

  def show_criterion(criterion)
    {
      id: criterion.id,
      name: criterion.name,
      description: criterion.description,
      full_value: criterion.full_value,
      default_estimate: criterion.default_estimate,
      comparison_id: criterion.comparison_id,
      created_at: String,
      updated_at: String
    }
  end

  expect "patch update" do
    assert_update_succeeds(
      comparisons(:plan),
      :comparison_url,
      name: nil,
      alternative_noun: "plan",
      value_unit: "miles"
    )
  end
end
