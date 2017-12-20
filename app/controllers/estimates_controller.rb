# frozen_string_literal: true

# EstimatesController provides write access to the Estimate resource
class EstimatesController < ApplicationController
  def create
    alternative = Alternative.find(params[:alternative_id])
    estimate = alternative.estimates.create!(estimate_create_params)
    render json: estimate
  end

  def update
    estimate = Estimate.find(params[:id])
    estimate.update!(estimate_update_params)
    render json: estimate
  end

  private

  def estimate_create_params
    params.permit(
      :criterion_id,
      :estimate
    )
  end

  def estimate_update_params
    params.permit(
      :estimate
    )
  end
end
