class DeviseTokenAuth::ConfirmationsController < DeviseTokenAuth::ApplicationController

  # https://github.com/lynndylanhurley/devise_token_auth/blob/master/app/controllers/devise_token_auth/confirmations_controller.rb
  # def show
  #   @resource = resource_class.confirm_by_token(resource_params[:confirmation_token])

  #   if @resource.errors.empty?
  #     yield @resource if block_given?

  #     redirect_header_options = { account_confirmation_success: true }

  #     if signed_in?(resource_name)
  #       token = signed_in_resource.create_token

  #       redirect_headers = build_redirect_headers(token.token,
  #                                                 token.client,
  #                                                 redirect_header_options)

  #       redirect_to_link = signed_in_resource.build_auth_url(redirect_url, redirect_headers)
  #     else
  #       redirect_to_link = DeviseTokenAuth::Url.generate(redirect_url, redirect_header_options)
  #    end

  #     redirect_to(redirect_to_link)
  #   else
  #     raise ActionController::RoutingError, 'Not Found'
  #   end
  # end

  # monkey patching
  def show
    @resource = resource_class.confirm_by_token(params[:confirmation_token])
    if @resource.confirmed?
      return redirect_to signin_index_path
    else
      raise @resource.errors.inspect
    end
  end
end
