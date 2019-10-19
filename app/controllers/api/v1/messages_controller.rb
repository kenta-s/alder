class Api::V1::MessagesController < ApplicationController
  before_action :authenticate_user!

  def inbox
    render json: current_user.got_messages.order(created_at: :desc)
  end

  def outbox
    render json: current_user.sent_messages.order(created_at: :desc)
  end

  def show
    render json: current_user.sent_messages.or(current_user.got_messages).find(params[:id])
  end

  def create
    recipient = User.find(message_params.dig(:recipient_id))
    render json: current_user.sent_messages.create(recipient: recipient, content: message_params.dig(:content)), status: 201
  end

  private

  def message_params
    params.require(:message).permit(:recipient_id, :content)
  end
end
