# frozen_string_literal: true

# ApplicationController is the base controller class
class ApplicationController < ActionController::API
  include Knock::Authenticable
end
