# frozen_string_literal: true

require File.expand_path("../config/environment", __dir__)
require "rails/test_help"
require "json_expressions/minitest"

module ActiveSupport
  class TestCase
    fixtures :all

    def self.expect(test_description, &test_block)
      test("expect #{test_description}", &test_block)
    end

    def jwt_header
      token_payload = { sub: users(:gh_lucky).id }
      token = Knock::AuthToken.new(payload: token_payload).token
      {
        'Authorization': "Bearer #{token}"
      }
    end

    def assert_validation_fails(record)
      assert_raises(ActiveRecord::RecordInvalid) do
        record.validate!
      end
    end

    def assert_validation_passes(record)
      assert record.validate!
    end

    def assert_response_json(pattern)
      assert_json_match pattern, @response.body
    end

    def assert_create_succeeds(record_class, key, route, parent: nil, **params)
      assert_create_ready(record_class, key, params)
      assert_create_executes(route, parent, params)
      assert_create_changes(record_class, key, params)
    end

    def assert_create_ready(record_class, key, params)
      assert_nil record_class.find_by(key => params[key])
    end

    def assert_create_executes(route, parent, params)
      post(
        method(route).call(parent),
        params: params,
        headers: jwt_header
      )
      assert_response :success
      assert_response_json(params.ignore_extra_keys!)
    end

    def assert_create_changes(record_class, key, params)
      new_record = record_class.find_by(key => params[key])
      assert_not_nil new_record
      params.each do |param, value|
        assert_equal value, new_record.send(param)
      end
    end

    def assert_update_succeeds(record, route, **params)
      patch_params = params.compact
      unchanged_params = params.keys - patch_params.keys
      assert_update_ready(record, patch_params)
      assert_update_executes(record, route, patch_params)
      assert_update_changes(record, patch_params, unchanged_params)
    end

    def assert_update_ready(record, patch_params)
      patch_params.each do |param, value|
        assert_not_equal value, record.send(param)
      end
    end

    def assert_update_executes(record, route, patch_params)
      patch(
        method(route).call(record),
        params: patch_params,
        headers: jwt_header
      )
      assert_response :success
      assert_response_json(patch_params.ignore_extra_keys!)
    end

    def assert_update_changes(record, patch_params, unchanged_params)
      new_record = record.class.find(record.id)
      patch_params.each do |param, value|
        assert_equal value, new_record.send(param)
      end
      unchanged_params.each do |param|
        assert_equal record.send(param), new_record.send(param)
      end
    end

    def assert_destroy_succeeds(record, route)
      assert_destroy_ready(record)
      assert_destroy_executes(record, route)
      assert_destroy_changes(record)
    end

    def assert_destroy_ready(record)
      old_record = record.class.find(record.id)
      assert_not_nil old_record
    end

    def assert_destroy_executes(record, route)
      delete(
        method(route).call(record),
        headers: jwt_header
      )
      assert_response :success
      assert_response_json({})
    end

    def assert_destroy_changes(record)
      new_record = record.class.find_by(id: record.id)
      assert_nil new_record
    end
  end
end
