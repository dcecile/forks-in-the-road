# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171210021139) do

  create_table "alternatives", force: :cascade do |t|
    t.string "name", null: false
    t.string "url"
    t.integer "comparison_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comparison_id"], name: "index_alternatives_on_comparison_id"
  end

  create_table "comparisons", force: :cascade do |t|
    t.string "name", null: false
    t.string "alternative_noun"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "value_unit"
  end

  create_table "criteria", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.float "full_value", null: false
    t.float "default_estimate"
    t.integer "comparison_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["comparison_id"], name: "index_criteria_on_comparison_id"
  end

  create_table "estimates", force: :cascade do |t|
    t.float "estimate", null: false
    t.integer "alternative_id", null: false
    t.integer "criterion_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["alternative_id", "criterion_id"], name: "index_estimates_on_alternative_id_and_criterion_id", unique: true
    t.index ["alternative_id"], name: "index_estimates_on_alternative_id"
    t.index ["criterion_id"], name: "index_estimates_on_criterion_id"
  end

end
