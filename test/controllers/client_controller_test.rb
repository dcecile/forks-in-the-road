# frozen_string_literal: true

require "test_helper"

class ClientControllerTest < ActionDispatch::IntegrationTest
  expect "get index" do
    get root_url, as: :html
    assert_response :success
    assert_select "script" do |script|
      assert_match(
        %r{\A/packs-test/application-.*\.js\z},
        script.attribute("src")
      )
    end
    assert_select "body > div[data-react-class='App']", ""
  end
end
