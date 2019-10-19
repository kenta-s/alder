class ApplicationController < ActionController::Base
  # protect_from_forgery unless: -> { request.format.json? }
  skip_before_action :verify_authenticity_token
  include DeviseTokenAuth::Concerns::SetUserByToken
  # layout :layout_by_resource
  # protect_from_forgery with: :null_session
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :status])
  end

  private

  # def after_sign_in_path_for(resource)
  #   tasks_path
  # end
end
