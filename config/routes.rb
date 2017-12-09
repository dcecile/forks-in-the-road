# frozen_string_literal: true

Rails.application.routes.draw do
  def put(_)
    # Disable PUT route, because PATCH is more accurate
  end

  resources :comparisons, only: %i[index create show update] do
    resources :alternatives, only: %i[create]
    resources :criteria, only: %i[create]
  end

  resources :alternatives, only: %i[update]
  resources :criteria, only: %i[update]
end
