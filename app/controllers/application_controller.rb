class ApplicationController < ActionController::Base
  before_action :geocode_ip

  def geocode_ip
    return nil if session[:latlng].present?
    session[:latlng] = request.location.coordinates.presence || "NA" # Uses Geocoder gem
  end
end
