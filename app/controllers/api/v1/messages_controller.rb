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
end
