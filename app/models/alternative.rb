# frozen_string_literal: true

# Alternative is one option that can satisfy a Comparison
class Alternative < ApplicationRecord
  validates :name, presence: true
  validates :url, url: { allow_nil: true }

  belongs_to :comparison
end
