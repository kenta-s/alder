class Api::V1::TaskApplicationsController < ApplicationController
  before_action :authenticate_user!
  def index
    @task_applications = current_user.task_applications.includes(:task).all.order(created_at: :desc)
  end
end
