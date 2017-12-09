# frozen_string_literal: true

# Create a new table for Alternative objects
class CreateAlternatives < ActiveRecord::Migration[5.1]
  def change
    create_table :alternatives do |t|
      t.string :name, null: false
      t.string :url
      t.references :comparison, foreign_key: true, null: false

      t.timestamps
    end
  end
end
