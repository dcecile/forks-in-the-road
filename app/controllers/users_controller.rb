# frozen_string_literal: true

require "base64"

# UsersController handles GitHub authorization
class UsersController < ApplicationController
  def initialize
    client_id, client_secret = github_client_keys
    @application_github_client = Octokit::Client.new(
      client_id: client_id,
      client_secret: client_secret
    )
  end

  def github_client_keys
    env = Rails.env.development? ? "DEV" : "PROD"
    %w[ID SECRET].map do |key|
      ENV["FORKSINTHEROAD_GITHUB_#{env}_CLIENT_#{key}"]
    end
  end

  def authorize
    github_token = retrieve_github_token(params[:code])
    user_github_client = create_user_github_client(github_token)
    user = find_or_create_user(user_github_client.user)
    app_token = create_app_token(user)
    render(json: build_authorize_response(app_token, user))
  end

  private

  def retrieve_github_token(code)
    application_github_client.exchange_code_for_token(code)
  end

  def create_user_github_client(github_token)
    Octokit::Client.new(
      client_id: application_github_client.client_id,
      client_secret: application_github_client.client_secret,
      access_token: github_token.access_token
    )
  end

  def find_or_create_user(github_user)
    github_id = github_user.id
    info = get_github_user_info(github_user)
    found_user = User.find_by(github_id: github_id)
    if found_user
      update_user(found_user, info)
    else
      create_user(github_id, info)
    end
  end

  def get_github_user_info(github_user)
    {
      github_login: github_user.login,
      github_avatar_url: github_user.avatar_url
    }
  end

  def update_user(found_user, info)
    logger.info "Found user (#{found_user.to_json}) and updating (#{info})"
    found_user.update!(info)
    found_user
  end

  def create_user(github_id, info)
    logger.info "Creating new user for #{github_id} (#{info})"
    User.create!(github_id: github_id, **info)
  end

  def create_app_token(user)
    Knock::AuthToken.new(payload: { sub: user.id }).token
  end

  def build_authorize_response(app_token, user)
    {
      jwt: app_token,
      github_login: user.github_login,
      github_avatar_url: user.github_avatar_url
    }
  end

  attr_reader :application_github_client
end
