Rails.application.routes.draw do
  devise_for :users

  resources :tasks, only: [:index, :show]

  namespace :api, { format: 'json' } do
    namespace :v1 do
      resources :tasks, only: [:index, :show]
      resources :task_applications, only: [:index, :show, :create, :destroy]
    end
  end
end
