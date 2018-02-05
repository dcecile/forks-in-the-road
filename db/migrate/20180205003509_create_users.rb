# frozen_string_literal: true

# Create a new table for User objects and add foreign key from
# Comparison objects
class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :github_login, null: false
      t.integer :github_id, null: false
      t.string :github_avatar_url, null: false

      t.timestamps
    end

    change_comparisons
  end

  def change_comparisons
    change_table :comparisons do |t|
      t.references :user, foreign_key: true
    end

    change_comparisons_not_null
  end

  def change_comparisons_not_null
    # Create the foreign key and change it to not null in two steps
    # in order to avoid an SQLite3 error
    # (This action doesn't need to be reversed when going down)
    reversible do |dir|
      dir.up do
        change_table :comparisons do |t|
          t.change :user_id, :integer, null: false
        end
      end
    end
  end
end
