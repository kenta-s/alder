Rails.application.routes.draw do
  authenticate :user, lambda { |u| u.admin? } do
    namespace :admin do
      resources :users
      resources :tasks
      resources :task_applications

      root to: "users#index"
    end
  end
  devise_for :users

  resources :tasks, only: [:index, :show]

  namespace :api, { format: 'json' } do
    namespace :v1 do
      resources :tasks, only: [:index, :show]
      resources :task_applications, only: [:index, :show, :create, :destroy]
    end
  end
end
