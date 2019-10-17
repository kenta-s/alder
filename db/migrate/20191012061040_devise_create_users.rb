# frozen_string_literal: true

class DeviseCreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table(:users) do |t|
      ## Required
      t.string :provider, :null => false, :default => "email", limit: 191
      t.string :uid, :null => false, :default => "", limit: 191

      ## Database authenticatable
      t.string :encrypted_password, :null => false, :default => "", limit: 191

      ## Recoverable
      t.string   :reset_password_token, limit: 191
      t.datetime :reset_password_sent_at
      t.boolean  :allow_password_change, :default => false

      ## Rememberable
      t.datetime :remember_created_at

      ## Confirmable
      t.string   :confirmation_token, limit: 191
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string   :unconfirmed_email, limit: 191 # Only if using reconfirmable

      ## Lockable
      t.integer  :failed_attempts, :default => 0, :null => false # Only if lock strategy is :failed_attempts
      t.string   :unlock_token, limit: 191 # Only if unlock strategy is :email or :both
      t.datetime :locked_at

      ## User Info
      t.string :name, limit: 191
      t.string :nickname, limit: 191
      t.string :image, limit: 191
      t.string :email, limit: 191
      t.integer :status, null: false

      ## Tokens
      t.text :tokens

      t.timestamps
    end

    add_index :users, :email,                unique: true
    add_index :users, [:uid, :provider],     unique: true
    add_index :users, :reset_password_token, unique: true
    add_index :users, :confirmation_token,   unique: true
    # add_index :users, :unlock_token,       unique: true
  end
end
