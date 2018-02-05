# frozen_string_literal: true

# User is an "authentication scope" tied to a GitHub login
class User < ApplicationRecord
  has_many :comparisons, dependent: :destroy
end
