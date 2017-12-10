# frozen_string_literal: true

require "test_helper"

class ClientControllerTest < ActionDispatch::IntegrationTest
  expect "get index" do
    get client_index_url, as: :html
    assert_response :success
    assert_select "script" do |script|
      assert_match(
        %r{\A/packs-test/application-.*\.js\z},
        script.attribute("src")
      )
    end
    assert_select "h1", "INDEX"
    assert_select "div[data-react-class='HelloWorld']", ""
  end
end
