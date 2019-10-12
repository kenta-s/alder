class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :display_name, presence: true, uniqueness: { case_sensitive: false }

  has_many :task_applications, dependent: :destroy
end
