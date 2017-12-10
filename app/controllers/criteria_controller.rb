# frozen_string_literal: true

# CriteriaController provides write access to the Criterion resource
class CriteriaController < ApplicationController
  def create
    criterion = Comparison.find(params[:comparison_id])
    criterion.criteria.create(criterion_params)
    render json: {}
  end

  def update
    criterion = Criterion.find(params[:id])
    criterion.update(criterion_params)
    render json: {}
  end

  private

  def criterion_params
    params.permit(
      :name,
      :description,
      :full_value,
      :default_estimate
    )
  end
end