class WallsController < ApplicationController
  require "pycall/import"
  include PyCall::Import
  before_action :setup_pycall, only: :lookup
  skip_before_action :verify_authenticity_token, only: :report

  def index; end

  def autocomplete
    respond_to :json
    response = HTTParty.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", options) || Hash.new
    render json: response["predictions"]
  end

  def lookup
    respond_to :json
    response = populartimes.get_id(ENV["GOOGLE_API_KEY"], params[:place_id])
    render json: repack_hash(response).as_json
  end

  def report
    Rails.logger.info("Reported!")
    if validate_count_params
      Count.create(count_params)
      head :ok
    else
      head :bad_request
    end

  end

  private

  def options
    { query: { input: params[:search_text],
               key: ENV["GOOGLE_API_KEY"],
               types: "establishment",
               location: session[:latlng] == "NA" ? nil : session[:latlng],
               radius: "50" } }
  end

  # Turns out that populartimes returns a python dict, which doesn't handle nested hashes appropriately on the ruby side
  def repack_hash(data)
    return data unless data.is_a?(Hash) || data.is_a?(PyCall::Dict)
    data.inject({}) do |h, (k, v)|
      h.update(k => repack_hash(v))
    end
  end

  def setup_pycall
    pyimport :populartimes
  end

  def validate_count_params
    params[:place_id].present? && params[:wifi_device_count].present? && params[:wifi_device_count].to_i >= 0
  end

  def count_params
    params.permit(:place_id, :wifi_device_count)
  end
end
