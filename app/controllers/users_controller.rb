class UsersController < ApplicationController

	before_action :correct_user, only: [:show]

	# このアクションでtypeの値に応じて返す値を変える。
	def events
		date = params[:date]

		# 下の2行で'始まりの時間'と'終わりの時間'を指定している。
		date = date.to_datetime
		from = date.beginning_of_day
		to = date.end_of_day

		if params[:type] == "schedule"
			# 'where'で条件にマッチするレコードを全て返す。条件にマッチしない場合は空の配列を返す。
			schedule = Schedule.where(user_id:current_user.id).where(date: from..to)
			render partial: "schedules/schedules", locals: {schedules: schedule}
		else
			todolist = Todolist.where(user_id:current_user.id).where(date: from..to)
			render partial: "todolists/todolists", locals: {todolists: todolist}
		end
	end

	def show
		@user = current_user
	end

	def edit
	end

	def update
		@user = User.find(params[:id])
		if @user.update(user_params)
		redirect_to user_path(@user.id)
		else
		render :edit
		end
	end

	private
	def post_params
		params.permit(:title)
	end

	def user_params
		params.require(:user).permit(:id_name, :email)
	end

	def correct_user
		unless user_signed_in?
		redirect_to top_path
		end
	end

end
