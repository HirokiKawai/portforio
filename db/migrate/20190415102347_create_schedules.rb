class CreateSchedules < ActiveRecord::Migration[5.2]
  def change
    create_table :schedules do |t|
      t.integer "user_id"
      t.string "title"
      t.datetime "date"
      t.timestamps
    end
  end
end
