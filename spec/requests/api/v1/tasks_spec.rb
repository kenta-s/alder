require 'rails_helper'

describe Api::V1::TasksController, type: :request do
  describe '#index' do
    before do
      FactoryBot.create_list(:task, 10)
    end

    it 'should return 10 tasks' do
      get '/api/v1/tasks'
      json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(json.size).to eq(10)
    end
  end

  describe '#show' do
    let(:task) { FactoryBot.create(:task, title: 'foo', description: 'bar', end_at: Time.zone.local(2019, 10, 1, 9, 0)) }

    it 'should return a task' do
      get "/api/v1/tasks/#{task.id}"
      json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(json['title']).to eq('foo')
      expect(json['description']).to eq('bar')
      expect(json['end_at']).to eq('2019-10-01T09:00:00.000+09:00')
    end
  end
end
