class Task < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :end_at, presence: true

  has_many :task_applications, dependent: :destroy
end
