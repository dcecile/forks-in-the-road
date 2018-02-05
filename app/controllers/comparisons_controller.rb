# frozen_string_literal: true

# ComparisonsController provides access to the Comparison resource
class ComparisonsController < ApplicationController
  def index
    user = User.find_by(github_login: "gh_lucky")
    comparisons = user.comparisons
    render(
      json: comparisons,
      methods: :alternatives_size
    )
  end

  def create
    user = User.find_by(github_login: "gh_lucky")
    comparison = Comparison.create!(comparison_params.merge(user: user))
    render json: comparison
  end

  def show
    comparison = Comparison.find(params[:id])
    render(
      json: comparison,
      include: {
        alternatives: { include: :estimates },
        criteria: {}
      }
    )
  end

  def update
    comparison = Comparison.find(params[:id])
    comparison.update!(comparison_params)
    render json: comparison
  end

  private

  def comparison_params
    params.permit(
      :name,
      :alternative_noun,
      :value_unit
    )
  end
end
