class Api::V1::TasksController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: Task.all
  end

  def show
    @task = Task.includes(:task_applications).find(params[:id])
  end
end
