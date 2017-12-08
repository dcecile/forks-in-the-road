# frozen_string_literal: true

require "test_helper"

class ComparisonsControllerTest < ActionDispatch::IntegrationTest
  expect "get index" do
    get comparisons_url
    assert_response :success
    assert_response_json(
      %i[phone plan].map do |name|
        {
          id: comparisons(name).id
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
      created_at: String,
      updated_at: String
    )
  end

  expect "patch update" do
    comparison = comparisons(:plan)
    assert_nil comparison.alternative_noun
    patch comparison_url(comparison.id), params: {
      alternative_noun: "plan"
    }
    assert_response :success
    assert_equal "plan", Comparison.find(comparison.id).alternative_noun
    assert_equal comparison.name, Comparison.find(comparison.id).name
  end
end
