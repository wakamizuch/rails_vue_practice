Rails.application.routes.draw do
  # 6. get'/sample_items'から、'sample_items#index'つまり 'sample_items_controller.rb のindexっていう関数へ'
  #a4. post'/sample_items'から、'sample_items#create'つまり 'sample_items_controller.rb のcreateっていう関数へ'
  scope :api do
    get '/get_csrf_token', to: 'csrf_tokens#show'

    get '/sample_items', to: 'sample_items#index'
    post '/sample_items', to: 'sample_items#create'



    post '/addUserData', to: 'user#create'
    post '/login', to: 'user#login'

    get '*path', to: 'application#not_found'
  end
end
