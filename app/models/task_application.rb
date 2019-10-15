class TaskApplication < ApplicationRecord
  belongs_to :user
  belongs_to :task

  enum status: {
    pending: 0,
    accepted: 1,
    rejected: 2,
  }

  validates :status, presence: true
  delegate :title, to: :task, prefix: true
  delegate :description, to: :task, prefix: true
  delegate :end_at, to: :task, prefix: true

  validates :task, uniqueness: {scope: :user_id}
end
