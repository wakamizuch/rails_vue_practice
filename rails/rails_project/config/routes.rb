Rails.application.routes.draw do
  scope :api do
    get '/get_csrf_token', to: 'csrf_tokens#show'

    get '/examples', to: 'examples#index'
    post '/examples', to: 'examples#create'

    get '*path', to: 'application#not_found'
  end
end
