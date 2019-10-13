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

  describe '#create' do
    let(:user) { FactoryBot.create(:user) }
    let(:task) { FactoryBot.create(:task, title: 'test task') }

    context "when valid task_id is given" do
      it 'should return a task' do
        sign_in user
        expect{ post "/api/v1/task_applications/", params: {task_application: {task_id: task.id}} }.to change {user.task_applications.count}.by(1)
        
        json = JSON.parse(response.body)
   
        expect(response.status).to eq(201)
        expect(json['status']).to eq('pending')
        expect(json['task_title']).to eq('test task')
      end
    end
  end

  describe '#destroy' do
    let(:user1) { FactoryBot.create(:user) }
    let(:user2) { FactoryBot.create(:user) }
    let!(:task_application) do
      FactoryBot.create(:task_application,
        user: user1,
        status: :pending,
        task: FactoryBot.create(:task, title: 'test task1', end_at: Time.zone.local(2019, 10, 2, 11, 30)))
    end

    context "when user tries to delete his task_application" do
      let(:user) { user1 }
      it 'should delete task_application' do
        sign_in user
        expect{ delete "/api/v1/task_applications/#{task_application.id}" }.to change {user.task_applications.count}.by(-1)
        expect(response.status).to eq(204)
        expect{ task_application.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context "when user tries to delete another user's task_application" do
      let(:user) { user2 }
      it 'should not delete task_application' do
        sign_in user
        expect{ delete "/api/v1/task_applications/#{task_application.id}" }.to raise_error(ActiveRecord::RecordNotFound)
        expect{ task_application.reload }.not_to raise_error
      end
    end
  end
end
