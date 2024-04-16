Rails.application.routes.draw do
  # 6. get'/sample_items'から、'sample_items#index'つまり 'sample_items_controller.rb のindexっていう関数へ'
  #a4. post'/sample_items'から、'sample_items#create'つまり 'sample_items_controller.rb のcreateっていう関数へ'
  scope :api do
    get '/get_csrf_token', to: 'csrf_tokens#show'

    get '/sample_items', to: 'sample_items#index'
    post '/sample_items', to: 'sample_items#create'

    post '/addUserData', to: 'user#create'
    post '/login', to: 'user#login'

    get '/load_task_cards' ,to: 'task#load_task_cards'
    
    post '/task_page', to: 'task#show_all'
    post '/create_task', to: 'task#create'
    post '/update_task_flag', to: 'task#update_task_flag'
    get '/load_my_task_cards/:user_id', to: 'task#load_my_task_cards'
    get '*path', to: 'application#not_found'
  end
end
