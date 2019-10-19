require 'rails_helper'
include ActionController::RespondWith

describe Api::V1::MessageCountsController, type: :request do
  describe '#index' do
    let(:user1) { FactoryBot.create(:user, name: 'user1') }
    let(:user2) { FactoryBot.create(:user, name: 'user2') }
    let(:user3) { FactoryBot.create(:user, name: 'user3') }
    let(:user4) { FactoryBot.create(:user, name: 'user4') }

    context 'when 3 unread messages are there' do
      let(:user) { user1 }
      before(:each) do
        2.times { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message', read_at: Time.zone.local(2019, 10, 1, 9, 10)) }
        2.times { FactoryBot.create(:message, sender: user2, recipient: user1, content: 'this is a message', read_at: Time.zone.local(2019, 10, 1, 9, 10)) }
        3.times { FactoryBot.create(:message, sender: user2, recipient: user1, content: 'this is a message', read_at: nil) }
        2.times { FactoryBot.create(:message, sender: user2, recipient: user3, content: 'this is a message', read_at: Time.zone.local(2019, 10, 1, 9, 10)) }
        2.times { FactoryBot.create(:message, sender: user4, recipient: user1, content: 'this is a message', read_at: Time.zone.local(2019, 10, 1, 9, 10)) }
      end

      it 'should return 2 users and 2 unread count' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)

        get "/api/v1/message_counts", headers: auth_params
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.size).to eq(2)
        expect(json[0]["user_id"]).to eq(user2.id)
        expect(json[0]["user_name"]).to eq(user2.name)
        expect(json[0]["unread_count"]).to eq(3)
        expect(json[1]["user_id"]).to eq(user4.id)
        expect(json[1]["user_name"]).to eq(user4.name)
        expect(json[1]["unread_count"]).to eq(0)
      end
    end

    context 'when 3 unread messages are there' do
      let(:user) { user1 }
      before(:each) do
        2.times { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message', read_at: nil) }
        2.times { FactoryBot.create(:message, sender: user2, recipient: user1, content: 'this is a message', read_at: Time.zone.local(2019, 10, 1, 9, 10)) }
        FactoryBot.create(:message, sender: user2, recipient: user1, content: 'this is a message', read_at: Time.zone.local(2019, 10, 1, 9, 10))
        FactoryBot.create(:message, sender: user2, recipient: user1, content: 'this is a message', read_at: nil)
        2.times { FactoryBot.create(:message, sender: user2, recipient: user3, content: 'this is a message', read_at: Time.zone.local(2019, 10, 1, 9, 10)) }
        FactoryBot.create(:message, sender: user4, recipient: user1, content: 'this is a message', read_at: nil)
        FactoryBot.create(:message, sender: user4, recipient: user1, content: 'this is a message', read_at: Time.zone.local(2019, 10, 1, 9, 10))
      end

      it 'should return 2 users and 2 unread count' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)

        get "/api/v1/message_counts", headers: auth_params
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.size).to eq(2)
        expect(json[0]["user_id"]).to eq(user2.id)
        expect(json[0]["user_name"]).to eq(user2.name)
        expect(json[0]["unread_count"]).to eq(1)
        expect(json[1]["user_id"]).to eq(user4.id)
        expect(json[1]["user_name"]).to eq(user4.name)
        expect(json[1]["unread_count"]).to eq(1)
      end
    end
  end

end
