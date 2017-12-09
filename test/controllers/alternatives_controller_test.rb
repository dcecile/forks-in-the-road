# frozen_string_literal: true

require "test_helper"

class AlternativesControllerTest < ActionDispatch::IntegrationTest
  expect "post create" do
    name = "New"
    assert_nil Alternative.find_by(name: name)
    post comparison_alternatives_url(comparisons(:phone).id), params: {
      name: name
    }
    assert_response :success
    assert_response_json({})
    assert_not_nil Alternative.find_by(name: name)
  end

  expect "patch update" do
    alternative = alternatives(:google)
    assert_nil alternative.url
    patch alternative_url(alternative.id), params: {
      url: "https://google.ca"
    }
    assert_response :success
    assert_equal "https://google.ca", Alternative.find(alternative.id).url
    assert_equal alternative.name, Alternative.find(alternative.id).name
  end
end
