# frozen_string_literal: true

# Let Comparison objects keep custom value units
class AddValueUnitToComparison < ActiveRecord::Migration[5.1]
  def change
    add_column :comparisons, :value_unit, :string
  end
end
