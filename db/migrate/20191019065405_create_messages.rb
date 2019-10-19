class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.references :sender, null: false, foreign_key: {to_table: :users}
      t.references :recipient, null: false, foreign_key: {to_table: :users}
      t.datetime :read_at, null: true
      t.text :content, null: false

      t.timestamps
    end
  end
end
