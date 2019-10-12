require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should have_many(:applications).dependent(:destroy) }
  end
  
  describe 'validations' do
    subject { FactoryBot.build(:user, display_name: 'a') }
    it { should validate_presence_of(:display_name) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:display_name).case_insensitive }
    it { should validate_uniqueness_of(:email).case_insensitive }
  end
end
