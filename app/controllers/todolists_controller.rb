class TodolistsController < ApplicationController

	def create
		todolist = Todolist.new(post_params)
		todolist.user_id = current_user.id
		todolist.save
		# 〜フォルダの内の〜を呼び出している。
		render partial: "todolist", locals: {t: todolist}
	end

	def update
		# 'p'は、'puts'。rubyのログ出力。デバッグとして使われることも。
		p params[:id]
		todolist = Todolist.find(params[:id])
		todolist.check = params[:check]
		todolist.save
	end

	def destroy
		todolist = Todolist.find(params[:id])
		t = todolist.id
		todolist.destroy
		# 指定されたテキストを表示し、コンテンツタイプをtext/x-jsonに設定。
		render json: t
	end

	private
	def post_params
	  params.permit(:title, :date)
	end

end

