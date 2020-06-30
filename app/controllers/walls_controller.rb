class WallsController < ApplicationController
  require "pycall/import"
  include PyCall::Import
  before_action :setup_pycall, only: :lookup

  def index; end

  def autocomplete
    respond_to :json

    response = HTTParty.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=#{params[:search_text]}" \
                            "&key=#{ENV['GOOGLE_API_KEY']}&types=establishment") || Hash.new
    render json: response["predictions"]
  end

  def lookup
    respond_to :json
    response = populartimes.get_id(ENV["GOOGLE_API_KEY"], params[:place_id])
    render json: repack_hash(response).as_json
  end

  private

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
end
