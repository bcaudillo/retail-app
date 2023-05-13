Rails.application.routes.draw do
  

  resources :reviews
  get "/coffee", to: "coffees#index"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/signup", to: "users#create"
  get "/me", to: "users#show"
end
