class ApplicationController < ActionController::Base

	before_action :authenticate_user!, only: [:schedules, :users]

	# 機能が実行される前に、configure_permitted_parametersを実行する。
	before_action :configure_permitted_parameters, if: :devise_controller?
	# Rails/CSRF対策
	protect_from_forgery with: :exception

	def after_sign_in_path_for(resource)
		schedules_path(current_user)
	end

	def after_sign_up_path_for(resource)
		schedules_path(current_user)
	end

	def after_sign_out_path_for(resource)
		top_path
	end

	# sign_upの時、ユーザ名(name)のデータ操作が許可されることになる。
	def configure_permitted_parameters
		devise_parameter_sanitizer.permit(:sign_in, keys: [:id_name])
		devise_parameter_sanitizer.permit(:sign_up, keys: [:id_name, :email])
	end

end
