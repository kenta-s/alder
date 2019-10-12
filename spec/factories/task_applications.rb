FactoryBot.define do
  factory :task_application do
    user { nil }
    task { nil }
    status { 1 }
  end
end
