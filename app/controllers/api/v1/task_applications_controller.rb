class Api::V1::TaskApplicationsController < ApplicationController
  before_action :authenticate_user!
  def index
    @task_applications = current_user.task_applications.includes(:task).all.order(created_at: :desc)
  end

  def show
    @task_application = current_user.task_applications.find(params[:id])
  end

  def create
    @task_application = current_user.task_applications.build(task_application_params.merge(status: :pending))
    if @task_application.save
      render template: "api/v1/task_applications/show", status: 201
    else
      render template: "api/v1/task_applications/show", status: 422
    end
  end

  def destroy
    task_application = current_user.task_applications.find(params[:id])
    if task_application.destroy
      head :no_content
    else
      render nothing: true, status: 422
    end
  end

  private

  def task_application_params
    params.require(:task_application).permit(:task_id)
  end
end
