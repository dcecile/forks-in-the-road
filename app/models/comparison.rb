# frozen_string_literal: true

# Comparison is a "project scope" to let the user compare
# multiple alternatives according to common criteria
class Comparison < ApplicationRecord
  validates :name, presence: true
end
