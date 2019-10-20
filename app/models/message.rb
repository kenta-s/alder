class Message < ApplicationRecord
  belongs_to :sender, class_name: :User
  belongs_to :recipient, class_name: :User

  validates :content, presence: true, length: { maximum: 1000 }

  delegate :name, to: :recipient, prefix: true
  delegate :name, to: :sender, prefix: true
end
