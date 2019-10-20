json.array! @messages do |message|
  json.id message.id
  json.content message.content
  json.sentAt message.created_at
  json.senderId message.sender_id
  json.senderName message.sender_name
  json.recipientId message.recipient_id
  json.recipientName message.recipient_name
end
