Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  resources :users, only: [:index, :edit, :update]    # インクリメンタルサーチを実装の為、indexアクションを追記
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]

    namespace :api do   #  namespace :ディレクトリ名 do ~ endと囲む形でルーティングを記述すると、そのディレクトリ内のコントローラのアクションを指定出来る。
      resources :messages, only: :index, defaults: { format: 'json' }   # defaultsオプション = このルーティングが来たらjson形式でレスポンスするよう指定
    end
  end
end

#自動生成されたルートを確認
# $ rails routes