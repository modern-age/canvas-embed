class ScheduleController < ApplicationController
  def index
    provider_ids = params[:provider_ids]
    location_id = params[:location_id]
    date = params[:date]
    duration = params[:duration]
    
    cache_key = "schedule/#{provider_ids}/#{location_id}/#{date}/#{duration}"

    if Rails.cache.exist?(cache_key)
      response = Rails.cache.read(cache_key)
    else
      response = fetch_schedule(provider_ids, location_id, date, duration)

      Rails.cache.write(cache_key, response, expires_in: 1.hour)
    end

    render json: response
  end

  private

  def fetch_schedule(provider_ids, location_id, date, duration)
    # Fetch the data from the database
  end
end
