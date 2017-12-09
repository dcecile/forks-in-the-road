# frozen_string_literal: true

# Criterion is a condition that can be used to decide a comparison
class Criterion < ApplicationRecord
  validates :name, presence: true
  validates :full_value, presence: true

  belongs_to :comparison
end
