Rails.application.routes.draw do

  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/top' => 'schedules#top'

  resources :users, only:[:show, :update]
  resources :schedules, only: [:create, :index, :destroy]
  resources :todolists, only: [:create, :destroy]

  get '/events' => 'users#events'
  post '/events/:id', to: 'todolists#update', as: 'events_update'

end
