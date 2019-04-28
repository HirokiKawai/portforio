class ApplicationController < ActionController::Base

	before_action :authenticate_user!, only: [:schedules, :users]

    # 機能が実行される前に、configure_permitted_parametersを実行する。
	before_action :configure_permitted_parameters, if: :devise_controller?
    protect_from_forgery with: :exception

    # サインイン後の行き先指定。
	def after_sign_in_path_for(resource)
	    schedules_path(current_user)
	end

    # サインアップ後の行き先指定。
	def after_sign_up_path_for(resource)
	    schedules_path(current_user)
	end

    # ログアウト後の行き先指定。
	def after_sign_out_path_for(resource)
	    top_path
	end

 # nameのデータ操作を許可するアクションメソッドを指定。
 # sign_upの時、ユーザ名(name)のデータ操作が許可されることになります。
  def configure_permitted_parameters
  	devise_parameter_sanitizer.permit(:sign_in, keys: [:id_name])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:id_name, :email])
  end

end
