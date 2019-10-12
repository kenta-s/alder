class TaskApplication < ApplicationRecord
  belongs_to :user
  belongs_to :task

  enum status: {
    pending: 0,
    accepted: 1,
    rejected: 2,
  }

  validates :status, presence: true
end
