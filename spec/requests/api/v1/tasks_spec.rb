require 'rails_helper'

describe Api::V1::TasksController, type: :request do
  describe '#index' do
    let(:user) { FactoryBot.create(:user) }

    before do
      FactoryBot.create_list(:task, 10)
    end

    it 'should return 10 tasks' do
      login
      auth_params = get_auth_params_from_login_response_headers(response)
      get '/api/v1/tasks', headers: auth_params
      json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(json.size).to eq(10)
    end
  end

  describe '#show' do
    let(:user) { FactoryBot.create(:user) }
    let(:user2) { FactoryBot.create(:user, name: 'user2', status: :apprentice) }
    let(:user3) { FactoryBot.create(:user, name: 'user3', status: :apprentice) }
    let(:task) { FactoryBot.create(:task, title: 'foo', description: 'bar', end_at: Time.zone.local(2019, 10, 1, 9, 0)) }

    before(:each) do
      FactoryBot.create(:task_application, task: task, user: user2)
      FactoryBot.create(:task_application, task: task, user: user3)
    end

    it 'should return a task' do
      login
      auth_params = get_auth_params_from_login_response_headers(response)
      get "/api/v1/tasks/#{task.id}", headers: auth_params
      json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(json['title']).to eq('foo')
      expect(json['description']).to eq('bar')
      expect(json['end_at']).to eq('2019-10-01T09:00:00.000+09:00')
      expect(json['task_applications'].size).to eq(2)
      expect(json['task_applications'][0]['applicant_name']).to eq('user2')
      expect(json['task_applications'][1]['applicant_name']).to eq('user3')
    end
  end

end
