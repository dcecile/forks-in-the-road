# frozen_string_literal: true

# AlternativesController provides write access to the Alternative resource
class AlternativesController < ApplicationController
  def create
    comparison = Comparison.find(params[:comparison_id])
    alternative = comparison.alternatives.create!(alternative_params)
    render json: alternative
  end

  def update
    alternative = Alternative.find(params[:id])
    alternative.update!(alternative_params)
    render json: alternative
  end

  private

  def alternative_params
    params.permit(
      :name,
      :url
    )
  end
end
