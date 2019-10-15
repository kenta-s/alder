require 'rails_helper'

RSpec.describe TaskApplication, type: :model do
  describe 'associations' do
    it { should belong_to(:task) }
    it { should belong_to(:user) }
  end
  
  describe 'validations' do
    subject { FactoryBot.create(:task_application, user_id: FactoryBot.create(:user).id) }
    it { should validate_presence_of(:status) }
    it { should validate_uniqueness_of(:task).scoped_to(:user_id) }
  end
end
