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

  describe '#inbox' do
    let(:user1) { FactoryBot.create(:user) }
    let(:user2) { FactoryBot.create(:user) }
    let!(:message1) { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message1') }
    let!(:message2) { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message2') }
    let!(:message3) { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message3') }
    let!(:message4) { FactoryBot.create(:message, sender: user2, recipient: user1, content: 'this is a message4') }
    let!(:message5) { FactoryBot.create(:message, sender: user2, recipient: user1, content: 'this is a message5') }

    context 'when current_user is user1' do
      let(:user) { user1 }
      it 'should return 2 messages' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)

        get "/api/v1/messages/inbox", headers: auth_params
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.size).to eq(2)
        expect(json.dig(0, 'content')).to eq('this is a message5')
        expect(json.dig(1, 'content')).to eq('this is a message4')
      end
    end

    context 'when current_user is user2' do
      let(:user) { user2 }
      it 'should return 3 messages' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)

        get "/api/v1/messages/inbox", headers: auth_params
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.size).to eq(3)
        expect(json.dig(0, 'content')).to eq('this is a message3')
        expect(json.dig(1, 'content')).to eq('this is a message2')
        expect(json.dig(2, 'content')).to eq('this is a message1')
      end
    end
  end

  describe '#outbox' do
    let(:user1) { FactoryBot.create(:user) }
    let(:user2) { FactoryBot.create(:user) }
    let!(:message1) { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message1') }
    let!(:message2) { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message2') }
    let!(:message3) { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message3') }
    let!(:message4) { FactoryBot.create(:message, sender: user2, recipient: user1, content: 'this is a message4') }
    let!(:message5) { FactoryBot.create(:message, sender: user2, recipient: user1, content: 'this is a message5') }

    context 'when current_user is user1' do
      let(:user) { user1 }

      it 'should return 2 messages' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)

        get "/api/v1/messages/outbox", headers: auth_params
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.size).to eq(3)
        expect(json.dig(0, 'content')).to eq('this is a message3')
        expect(json.dig(1, 'content')).to eq('this is a message2')
        expect(json.dig(2, 'content')).to eq('this is a message1')
      end
    end

    context 'when current_user is user2' do
      let(:user) { user2 }
      it 'should return 3 messages' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)

        get "/api/v1/messages/outbox", headers: auth_params
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.size).to eq(2)
        expect(json.dig(0, 'content')).to eq('this is a message5')
        expect(json.dig(1, 'content')).to eq('this is a message4')
      end
    end
  end

  describe '#show' do
    let(:user1) { FactoryBot.create(:user) }
    let(:user2) { FactoryBot.create(:user) }
    let(:user3) { FactoryBot.create(:user) }
    let!(:message1) { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message1') }
    let!(:message2) { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message2') }
    let!(:message3) { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message3') }
    let!(:message4) { FactoryBot.create(:message, sender: user2, recipient: user1, content: 'this is a message4') }
    let!(:message5) { FactoryBot.create(:message, sender: user2, recipient: user1, content: 'this is a message5') }
    let!(:message6) { FactoryBot.create(:message, sender: user3, recipient: user2, content: 'this is a message6') }

    context 'when current_user is user1' do
      let(:user) { user1 }

      it 'should return a sent message' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)

        get "/api/v1/messages/#{message1.id}", headers: auth_params
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.dig('content')).to eq('this is a message1')
      end

      it 'should return a got message' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)

        get "/api/v1/messages/#{message4.id}", headers: auth_params
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.dig('content')).to eq('this is a message4')
      end
    end

    context 'when current_user is user3' do
      let(:user) { user3 }

      it 'should return error' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)

        expect{
          get "/api/v1/messages/#{message1.id}", headers: auth_params
        }.to raise_error(ActiveRecord::RecordNotFound)
        # json = JSON.parse(response.body)

        # expect(response.status).to eq(200)
        # expect(json.dig('content')).to eq('this is a message3')
      end

    end
  end
end
