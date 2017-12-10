# frozen_string_literal: true

# Criterion is a condition that can be used to decide a comparison
class Criterion < ApplicationRecord
  validates :name, presence: true
  validates :full_value, presence: true
  validates(
    :default_estimate,
    inclusion: { in: 0..1, message: "is not between zero and one" },
    allow_nil: true
  )

  belongs_to :comparison
end
