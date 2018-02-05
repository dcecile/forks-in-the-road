# frozen_string_literal: true

# Comparison is a "project scope" to let the user compare
# multiple alternatives according to common criteria
class Comparison < ApplicationRecord
  validates :name, presence: true

  has_many :alternatives, dependent: :destroy
  has_many :criteria, dependent: :destroy

  delegate :size, to: :alternatives, prefix: true

  belongs_to :user
end
