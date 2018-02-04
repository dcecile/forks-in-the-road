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
    render(json: user_github_client.user)
  end

  def create_user_github_client(token)
    Octokit::Client.new(
      client_id: application_github_client.client_id,
      client_secret: application_github_client.client_secret,
      access_token: token.access_token
    )
  end

  private

  attr_reader :application_github_client
end
