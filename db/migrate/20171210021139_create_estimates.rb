# frozen_string_literal: true

# Create a new table for Estimate objects
class CreateEstimates < ActiveRecord::Migration[5.1]
  def change
    create_table :estimates do |t|
      t.float :estimate, null: false
      t.references :alternative, foreign_key: true, null: false
      t.references :criterion, foreign_key: true, null: false

      t.timestamps

      t.index %i[alternative_id criterion_id], unique: true
    end
  end
end
