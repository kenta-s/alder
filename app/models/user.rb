class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable

  include DeviseTokenAuth::Concerns::User

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :name, presence: true, uniqueness: { case_sensitive: false }

  has_many :task_applications, dependent: :destroy
  has_many :sent_messages, class_name: :Message, foreign_key: :sender_id, dependent: :destroy
  has_many :got_messages, class_name: :Message, foreign_key: :recipient_id, dependent: :destroy

  enum status: {
    apprentice: 0,
    professional: 10,
    admin: 42,
  }
end
