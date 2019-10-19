class Api::V1::MessagesController < ApplicationController
  before_action :authenticate_user!

  def inbox
  end

  def outbox
  end

  def show
  end
end
