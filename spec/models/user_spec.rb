require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should have_many(:task_applications).dependent(:destroy) }
    it { should have_many(:sent_messages).dependent(:destroy) }
    it { should have_many(:got_messages).dependent(:destroy) }
  end
  
  describe 'validations' do
    subject { FactoryBot.build(:user, name: 'aaa') }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:name).case_insensitive }
    it { should validate_length_of(:name).is_at_least(3) }
    it { should validate_length_of(:name).is_at_most(16) }
    # it { should validate_uniqueness_of(:email).case_insensitive }
  end

  describe 'name validation' do
    subject { FactoryBot.build(:user, name: name) }

    context 'when name has only alphanumeric chars' do
      let(:name) { 'abc123' }
      it { is_expected.to be_valid }
    end

    context 'when name has character:"-" in middle' do
      let(:name) { 'aa-a' }
      it { is_expected.to be_valid }
    end

    context 'when name has character:"-" at first' do
      let(:name) { '-aa' }
      it { is_expected.not_to be_valid }
    end

    context 'when name has character:"-" at last' do
      let(:name) { 'aa-' }
      it { is_expected.not_to be_valid }
    end

    context 'when name has character:"_" in middle' do
      let(:name) { 'a_a' }
      it { is_expected.to be_valid }
    end

    context 'when name has character:"_" at first' do
      let(:name) { '_aa' }
      it { is_expected.not_to be_valid }
    end

    context 'when name has character:"_" at last' do
      let(:name) { 'aa_' }
      it { is_expected.not_to be_valid }
    end

    context 'when name has character:"!"' do
      let(:name) { 'aa!a' }
      it { is_expected.not_to be_valid }
    end

    context 'when name has character:"@"' do
      let(:name) { 'aa@a' }
      it { is_expected.not_to be_valid }
    end
  end
end
