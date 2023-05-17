class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  include ApiRendering

  protect_from_forgery with: :exception

  def not_found
    raise ActionController::RoutingError, 'This API endpoint was not found'
  end
end
