class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :lockable

  include DeviseTokenAuth::Concerns::User

  ALLOWED_CHARACTERS = [
    '-',
    '_',
  ].freeze

  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { minimum: 3, maximum: 16 }
  validate :name_cannot_have_special_characters

  has_many :task_applications, dependent: :destroy
  has_many :sent_messages, class_name: :Message, foreign_key: :sender_id, dependent: :destroy
  has_many :got_messages, class_name: :Message, foreign_key: :recipient_id, dependent: :destroy

  enum status: {
    apprentice: 0,
    professional: 10,
    admin: 42,
  }

  # TODO: remove this callback when professional is ready
  before_create do |user|
    user.status ||= :apprentice
  end

  private

  def name_cannot_have_special_characters
    return true if name.blank?
    
    unless name =~ /\A[a-zA-Z0-9\-\_]+\z/
      self.errors[:base] << 'userIDに使える文字は半角英数字と-(ハイフン)、_(アンダーバー)のみです'
    end

    if ALLOWED_CHARACTERS.include?(name.first) || ALLOWED_CHARACTERS.include?(name.last)
      self.errors[:base] << 'userIDの最初と最後には特殊文字は使えません'
    end

    true
  end

end
