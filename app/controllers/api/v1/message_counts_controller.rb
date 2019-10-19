class Api::V1::MessageCountsController < ApplicationController
  before_action :authenticate_user!

  def index
    message_counts = {}
    current_user.sent_messages.each do |message|
      message_counts[message.recipient_id] ||= {unread_count: 0}
      message_counts[message.recipient_id][:name] = message.recipient.name
    end

    current_user.got_messages.each do |message|
      message_counts[message.sender_id] ||= {unread_count: 0}
      message_counts[message.sender_id][:name] = message.sender.name
      message_counts[message.sender_id][:unread_count] += 1 if message.read_at.nil?
    end

    foo = []
    message_counts.each do |id, message_count|
      foo << {user_id: id, user_name: message_count[:name], unread_count: message_count[:unread_count]}
    end

    render json: foo, status: 200
  end

end
