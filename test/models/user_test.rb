# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  expect "has comparisons" do
    assert_includes(
      users(:gh_lucky).comparisons,
      comparisons(:phone)
    )
    assert_includes(
      users(:gh_lucky).comparisons,
      comparisons(:plan)
    )
  end
end
