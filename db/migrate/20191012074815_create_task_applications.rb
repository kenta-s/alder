class CreateTaskApplications < ActiveRecord::Migration[6.0]
  def change
    create_table :task_applications do |t|
      t.references :user, null: false, foreign_key: true
      t.references :task, null: false, foreign_key: true
      t.integer :status, null: false

      t.timestamps
    end
  end
end
