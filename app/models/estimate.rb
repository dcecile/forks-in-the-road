# frozen_string_literal: true

# Estimate is a rating for one Alternative's Criterion
class Estimate < ApplicationRecord
  validates(
    :estimate,
    presence: true,
    inclusion: { in: 0..1, message: "is not between zero and one" }
  )
  validates(
    :criterion,
    uniqueness: { scope: :alternative }
  )

  belongs_to :alternative
  belongs_to :criterion
end
