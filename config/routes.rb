# frozen_string_literal: true

Rails.application.routes.draw do
  def put(_)
    # Disable PUT route, because PATCH is more accurate
  end

  resources :comparisons, only: %i[index create show update]
end
