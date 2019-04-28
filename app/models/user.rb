class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # dependent: :destroyで削除機能を追加。
  has_many :calendars, dependent: :destroy
  has_many :todolists, dependent: :destroy

  def email_required?
  	false
  end

  def email_chenged?
    false
  end

end
