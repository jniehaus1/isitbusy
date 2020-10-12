class CountsController < ApplicationController
  def index
    @counts = Count.all.order(created_at: :desc)
  end
end
