require 'rails_helper'

RSpec.describe Task, type: :model do
  describe 'associations' do
    it { should have_many(:task_applications).dependent(:destroy) }
  end
  
  describe 'validations' do
    it { should validate_presence_of(:title) }
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:end_at) }
  end
end
