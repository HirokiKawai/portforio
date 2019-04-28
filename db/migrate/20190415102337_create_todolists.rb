class CreateTodolists < ActiveRecord::Migration[5.2]
  def change
    create_table :todolists do |t|
      t.integer "user_id"
      t.string "title"
      t.boolean "check", null: false, default: 0
      t.datetime "date"
      t.timestamps
    end
  end
end
