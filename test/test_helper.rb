# frozen_string_literal: true

require File.expand_path("../../config/environment", __FILE__)
require "rails/test_help"
require "json_expressions/minitest"

module ActiveSupport
  class TestCase
    fixtures :all

    def self.expect(test_description, &test_block)
      test("expect #{test_description}", &test_block)
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
      post method(route).call(parent), params: params
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

    def assert_patch_succeeds(record, route, **params)
      patch_params = params.compact
      unchanged_params = params.keys - patch_params.keys
      assert_patch_ready(record, patch_params)
      assert_patch_executes(record, route, patch_params)
      assert_patch_changes(record, patch_params, unchanged_params)
    end

    private

    def assert_patch_ready(record, patch_params)
      patch_params.each do |param, value|
        assert_not_equal value, record.send(param)
      end
    end

    def assert_patch_executes(record, route, patch_params)
      patch method(route).call(record), params: patch_params
      assert_response :success
      assert_response_json(patch_params.ignore_extra_keys!)
    end

    def assert_patch_changes(record, patch_params, unchanged_params)
      new_record = record.class.find(record.id)
      patch_params.each do |param, value|
        assert_equal value, new_record.send(param)
      end
      unchanged_params.each do |param|
        assert_equal record.send(param), new_record.send(param)
      end
    end
  end
end
