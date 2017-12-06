# frozen_string_literal: true

# Create a new table for Comparison objects
class CreateComparisons < ActiveRecord::Migration[5.1]
  def change
    create_table :comparisons do |t|
      t.string :name, null: false
      t.string :alternative_noun

      t.timestamps
    end
  end
end
