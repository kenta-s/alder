FactoryBot.define do
  factory :task_application do
    association :user, factory: :user
    association :task, factory: :task
    status { 1 }
  end
end
