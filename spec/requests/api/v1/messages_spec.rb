require 'rails_helper'
include ActionController::RespondWith

describe Api::V1::MessagesController, type: :request do
  describe '#index' do
    let(:user1) { FactoryBot.create(:user) }
    let(:user2) { FactoryBot.create(:user) }
    let(:user3) { FactoryBot.create(:user) }
    let!(:message1) { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message1') }
    let!(:message2) { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message2') }
    let!(:message3) { FactoryBot.create(:message, sender: user1, recipient: user2, content: 'this is a message3') }
    let!(:message4) { FactoryBot.create(:message, sender: user2, recipient: user1, content: 'this is a message4') }
    let!(:message5) { FactoryBot.create(:message, sender: user2, recipient: user1, content: 'this is a message5') }
    let!(:message6) { FactoryBot.create(:message, sender: user2, recipient: user3, content: 'this is a message6') }
    let!(:message7) { FactoryBot.create(:message, sender: user3, recipient: user2, content: 'this is a message7') }

    context 'when current_user is user1' do
      let(:user) { user1 }
      it 'should return 5 messages' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)

        get "/api/v1/messages/", headers: auth_params
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.size).to eq(5)
        expect(json.dig(0, 'content')).to eq('this is a message1')
        expect(json.dig(1, 'content')).to eq('this is a message2')
        expect(json.dig(2, 'content')).to eq('this is a message3')
        expect(json.dig(3, 'content')).to eq('this is a message4')
        expect(json.dig(4, 'content')).to eq('this is a message5')
      end
    end

    context 'when current_user is user3' do
      let(:user) { user3 }
      it 'should return 2 messages' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)

        get "/api/v1/messages/", headers: auth_params
        json = JSON.parse(response.body)

        expect(response.status).to eq(200)
        expect(json.size).to eq(2)
        expect(json.dig(0, 'content')).to eq('this is a message6')
        expect(json.dig(1, 'content')).to eq('this is a message7')
      end
    end
  end

  describe '#create' do
    let(:user1) { FactoryBot.create(:user) }
    let(:user2) { FactoryBot.create(:user) }

    context "when user1 sends a message to user2" do
      let(:user) { user1 }
      it 'should create a new message' do
        login
        auth_params = get_auth_params_from_login_response_headers(response)
        expect{ post "/api/v1/messages/", headers: auth_params, params: {message: {recipient_name: user2.name, content: 'this is a pen'}} }.to change {user2.got_messages.count}.by(1).and change {user1.sent_messages.count}.by(1)
        
        json = JSON.parse(response.body)
   
        expect(response.status).to eq(201)
        expect(json['content']).to eq('this is a pen')
      end
    end
  end
end
