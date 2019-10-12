require 'rails_helper'

RSpec.describe TaskApplication, type: :model do
  describe 'associations' do
    it { should belong_to(:task) }
    it { should belong_to(:user) }
  end
  
  describe 'validations' do
    it { should validate_presence_of(:status) }
  end
end
