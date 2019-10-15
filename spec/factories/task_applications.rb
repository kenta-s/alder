FactoryBot.define do
  factory :task_application do
    association :user, factory: :user
    association :task, factory: :task
    status { :pending }
  end
end
