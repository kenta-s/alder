class Api::V1::TasksController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: Task.all
  end

  def show
    render json: Task.find(params[:id])
  end
end
