require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should have_many(:task_applications).dependent(:destroy) }
    it { should have_many(:sent_messages).dependent(:destroy) }
    it { should have_many(:got_messages).dependent(:destroy) }
  end
  
  describe 'validations' do
    subject { FactoryBot.build(:user, name: 'a') }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:name).case_insensitive }
    # it { should validate_uniqueness_of(:email).case_insensitive }
  end
end
