# frozen_string_literal: true

# ComparisonsController provides access to the Comparison resource
class ComparisonsController < ApplicationController
  before_action :authenticate_user

  def index
    comparisons = current_user.comparisons
    render(
      json: comparisons,
      methods: :alternatives_size
    )
  end

  def create
    comparison = Comparison.create!(comparison_params.merge(user: current_user))
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
