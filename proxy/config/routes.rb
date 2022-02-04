Rails.application.routes.draw do

  root 'health#index'

  get '/Auth', to: 'auth#authorize'
  get '/Schedule', to: 'schedule#index'
  get '/Slot', to: 'slot#index'
  get '/Appointment', to: 'appointment#index'
  post '/Appointment', to: 'appointment#create'
  put '/Appointment/:id', to: 'appointment#update'
end
