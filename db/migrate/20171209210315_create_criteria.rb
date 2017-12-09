# frozen_string_literal: true

# Create a new table for Criterion objects
class CreateCriteria < ActiveRecord::Migration[5.1]
  def change
    create_table :criteria do |t|
      t.string :name, null: false
      t.string :description
      t.float :full_value, null: false
      t.float :default_estimate
      t.references :comparison, foreign_key: true, null: false

      t.timestamps
    end
  end
end
