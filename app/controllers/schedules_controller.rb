class SchedulesController < ApplicationController

	before_action :correct_user, only: [:index]


	def top
	end

	def index
		@schedule = Schedule.new
		@todolist = Todolist.new
		@schedules = Schedule.all
		@todolists = Todolist.all
		@user = current_user
	end

	def create
		schedule = Schedule.new(post_params)
		schedule.user_id = current_user.id

        # integer型に変換
		hour = params['time(4i)'].to_i
		minutes = params['time(5i)'].to_i
		# datetime型に変換
		date = params[:date].to_datetime

        # 時と分を変更している。
		fixed_date = date.change(hour: hour, min: minutes)
		# schedule.dateをfixed_dateに変えている。
		schedule.date = fixed_date
		schedule.save

		# 〜フォルダの内の〜を呼び出している。
		render partial: "schedule", locals: {s: schedule}
	end

	def destroy
		schedule = Schedule.find(params[:id])
		s = schedule.id
        schedule.destroy
        render json: s
	end

	# 受け取った値を保存する。
	private
	def post_params
		params.permit(:title)
	end

	def correct_user
		unless user_signed_in?
		redirect_to top_path
	    end
  	end

end
