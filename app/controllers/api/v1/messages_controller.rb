class Api::V1::MessagesController < ApplicationController
  before_action :authenticate_user!

  def index
    @messages = current_user.sent_messages.or(current_user.got_messages).order(created_at: :asc)
  end

  def create
    recipient = User.find_by(name: message_params.dig(:recipient_name))
    @message = current_user.sent_messages.create(recipient: recipient, content: message_params.dig(:content))
  end

  private

  def message_params
    params.require(:message).permit(:recipient_name, :content)
  end
end
