require 'rails_helper'

describe '/api/v1/tasks' do
  it 'get index' do
    FactoryBot.create_list(:task, 10)

    get '/api/v1/tasks'
    json = JSON.parse(response.body)

    expect(response.status).to eq(200)
    expect(json.size).to eq(10)
  end
end
