FactoryBot.define do
  factory :user do
    sequence :email do |n|
      "foo#{n}@example.com"
    end
    sequence :display_name do |n|
      "foo#{n}"
    end
    password { 'abcdefg1' }
    status { :apprentice }
    confirmed_at { Time.zone.local(2019, 9, 1, 10, 30) }
  end
end
