class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :title, null: false, limit: 191
      t.text :description, null: false
      t.datetime :end_at, null: false

      t.timestamps
    end
  end
end
