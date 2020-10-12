Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "walls#index"

  post "autocomplete", to: "walls#autocomplete"
  get  "lookup",       to: "walls#lookup"
  get  "report",       to: "walls#report"
  post "report",       to: "walls#report"

  resources :counts, only: [:index]
end
