# frozen_string_literal: true

require "test_helper"

class ComparisonsControllerTest < ActionDispatch::IntegrationTest
  expect "get index" do
    get comparisons_url
    assert_response :success
    assert_response_json(
      comparisons(:phone, :plan).map do |comparison|
        {
          id: comparison.id
        }.ignore_extra_keys!
      end
    )
  end

  expect "post create" do
    name = "New"
    assert_nil Comparison.find_by(name: name)
    post comparisons_url, params: { name: name }
    assert_response :success
    assert_response_json({})
    assert_not_nil Comparison.find_by(name: name)
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
      alternatives: alternatives(:google, :apple).map do |alternative|
        {
          id: alternative.id,
          name: alternative.name,
          url: alternative.url,
          comparison_id: comparison.id,
          created_at: String,
          updated_at: String
        }
      end
    )
  end

  expect "patch update" do
    comparison = comparisons(:plan)
    assert_nil comparison.alternative_noun
    assert_nil comparison.value_unit
    patch comparison_url(comparison.id), params: {
      alternative_noun: "plan",
      value_unit: "miles"
    }
    assert_response :success
    assert_equal "plan", Comparison.find(comparison.id).alternative_noun
    assert_equal "miles", Comparison.find(comparison.id).value_unit
    assert_equal comparison.name, Comparison.find(comparison.id).name
  end
end
