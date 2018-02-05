# frozen_string_literal: true

# UsersController handles GitHub authorization
class UsersController < ApplicationController
  def initialize
    @application_github_client = Octokit::Client.new(
      client_id: ENV["FORKSINTHEROAD_GITHUB_CLIENT_ID"],
      client_secret: ENV["FORKSINTHEROAD_GITHUB_CLIENT_SECRET"]
    )
  end

  def authorize
    redirect_to application_github_client.authorize_url, status: 303
  end

  def authorize_callback
    token = application_github_client.exchange_code_for_token(params[:code])
    user_github_client = create_user_github_client(token)
    user = find_or_create_user(user_github_client.user)
    render(json: user)
  end

  def create_user_github_client(token)
    Octokit::Client.new(
      client_id: application_github_client.client_id,
      client_secret: application_github_client.client_secret,
      access_token: token.access_token
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

  private

  attr_reader :application_github_client
end
