# frozen_string_literal: true

Rails.application.routes.draw do
  def put(_)
    # Disable duplicate PUT route, because PATCH is more a more accurate verb
  end

  root "client#index"
  resources :client, only: %i[index]

  resources :comparisons, only: %i[index create show update] do
    resources :alternatives, only: %i[create]
    resources :criteria, only: %i[create]
  end

  resources :alternatives, only: %i[update] do
    resources :estimates, only: %i[create]
  end

  resources :criteria, only: %i[update]

  resources :estimates, only: %i[update destroy]
end
