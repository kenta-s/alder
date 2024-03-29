require 'rails_helper'
include ActionController::RespondWith

describe Api::V1::TaskApplicationsController, type: :request do
  def login
    post user_session_path, params:  { email: user.email, password: 'abcdefg1' }.to_json, headers: { 'CONTENT_TYPE' => 'application/json', 'ACCEPT' => 'application/json' }
  end

  def get_auth_params_from_login_response_headers(response)
    client = response.headers['client']
    token = response.headers['access-token']
    expiry = response.headers['expiry']
    token_type = response.headers['token-type']
    uid = response.headers['uid']

    auth_params = {
      'access-token' => token,
      'client' => client,
      'uid' => uid,
      'expiry' => expiry,
      'token_type' => token_type
    }
    auth_params
  end

  describe '#index' do
    let(:user1) { FactoryBot.create(:user) }
    let(:user2) { FactoryBot.create(:user) }
    let!(:task_application1) { FactoryBot.create(:task_application, user: user1, task: FactoryBot.create(:task, title: 'test task1')) }
    let!(:task_application2) { FactoryBot.create(:task_application, user: user1, task: FactoryBot.create(:task, title: 'test task2')) }
    let!(:task_application3) { FactoryBot.create(:task_application, user: user1, task: FactoryBot.create(:task, title: 'test task3')) }

    context 'when current_user is user1' do
      let(:user) { user1 }
      it 'should return 3 tasks' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)

        get "/api/v1/task_applications", headers: auth_params
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
        login
        auth_params = get_auth_params_from_login_response_headers(response)
        get "/api/v1/task_applications", headers: auth_params
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
      login
      auth_params = get_auth_params_from_login_response_headers(response)
      get "/api/v1/task_applications/#{task_application.id}", headers: auth_params
      json = JSON.parse(response.body)
   
      expect(response.status).to eq(200)
      expect(json['status']).to eq('pending')
    end
  end

  describe '#create' do
    let(:user) { FactoryBot.create(:user) }
    let(:task) { FactoryBot.create(:task, title: 'test task') }

    context "when valid task_id is given" do
      it 'should return a task' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)
        expect{ post "/api/v1/task_applications/", headers: auth_params, params: {task_application: {task_id: task.id}} }.to change {user.task_applications.count}.by(1)
        
        json = JSON.parse(response.body)
   
        expect(response.status).to eq(201)
        expect(json['status']).to eq('pending')
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
        login
        auth_params = get_auth_params_from_login_response_headers(response)

        expect{ delete "/api/v1/task_applications/#{task_application.id}", headers: auth_params }.to change {user.task_applications.count}.by(-1)
        expect(response.status).to eq(204)
        expect{ task_application.reload }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    context "when user tries to delete another user's task_application" do
      let(:user) { user2 }
      it 'should not delete task_application' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)
        expect{ delete "/api/v1/task_applications/#{task_application.id}", headers: auth_params }.to raise_error(ActiveRecord::RecordNotFound)
        expect{ task_application.reload }.not_to raise_error
      end
    end
  end
end
