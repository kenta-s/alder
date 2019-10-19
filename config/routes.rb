Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  root to: "landing#index"

  authenticate :user, lambda { |u| u.admin? } do
    namespace :admin do
      resources :users
      resources :tasks
      resources :task_applications

      root to: "users#index"
    end
  end

  resources :tasks, only: [:index, :show]
  resources :signin, only: [:index]
  resources :signup, only: [:index]
  resources :thankyou, only: [:index]
  resources :users, param: :name do
    resources :messages, only: [:index, :show], controller: 'users/messages'
  end

  namespace :api, { format: 'json' } do
    namespace :v1 do
      resources :tasks, only: [:index, :show]
      resources :task_applications, only: [:index, :show, :create, :destroy]
    end
  end
end
