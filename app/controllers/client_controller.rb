# frozen_string_literal: true

# ClientController provides the web client package
class ClientController < ActionController::Base
  def index
    render template: "client/index.html.erb"
  end
end
