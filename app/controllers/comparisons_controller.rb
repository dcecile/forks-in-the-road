# frozen_string_literal: true

# ComparisonsController provides access to the Comparison resource
class ComparisonsController < ApplicationController
  def index
    comparisons = Comparison.all
    render json: comparisons
  end

  def create
    Comparison.create!(comparison_params)
    render json: {}
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
    render json: {}
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
