require 'rails_helper'

describe Api::V1::TaskApplicationsController, type: :request do
  describe '#index' do
    let(:user1) { FactoryBot.create(:user) }
    let(:user2) { FactoryBot.create(:user) }
    let!(:task_application1) { FactoryBot.create(:task_application, user: user1, task: FactoryBot.create(:task, title: 'test task1')) }
    let!(:task_application2) { FactoryBot.create(:task_application, user: user1, task: FactoryBot.create(:task, title: 'test task2')) }
    let!(:task_application3) { FactoryBot.create(:task_application, user: user1, task: FactoryBot.create(:task, title: 'test task3')) }

    context 'when current_user is user1' do
      let(:user) { user1 }
      it 'should return 3 tasks' do
        sign_in user
        get "/api/v1/task_applications"
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.size).to eq(3)
        expect(json.dig(0, 'task_title')).to eq('test task3')
        expect(json.dig(1, 'task_title')).to eq('test task2')
        expect(json.dig(2, 'task_title')).to eq('test task1')
      end
    end

    context 'when current_user is user2' do
      let(:user) { user2 }
      it 'should return no tasks' do
        sign_in user
        get "/api/v1/task_applications"
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.size).to eq(0)
      end
    end
  end

  describe '#show' do
    let(:user) { FactoryBot.create(:user) }
    let(:task_application) do
      FactoryBot.create(:task_application,
        user: user,
        status: :pending,
        task: FactoryBot.create(:task, title: 'test task1', end_at: Time.zone.local(2019, 10, 2, 11, 30)))
    end

    it 'should return a task' do
      sign_in user
      get "/api/v1/task_applications/#{task_application.id}"
      json = JSON.parse(response.body)
   
      expect(response.status).to eq(200)
      expect(json['status']).to eq('pending')
      expect(json['task_title']).to eq('test task1')
      expect(json['task_end_at']).to eq('2019-10-02T11:30:00.000+09:00')
    end
  end
end
