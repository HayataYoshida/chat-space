class Group < ApplicationRecord
  has_many :group_users
  has_many :messages
  has_many :users, through: :group_users
  has_many :group
  validates :name, presence: true
  # 「1対多」のつながりがあることを示すのがhas_manyメソッド
  # バリデーションと読む。 validates :name, presence: true  →　空データを登録できないようにする
  # 空のデータが保存されないようにしたり、数字以外は保存できないようにしたり、文字数に制限を設けたり……保存するデータに制限をかける時に使う。

  def show_last_message
    if (last_message = messages.last).present?
      if last_message.content?
        last_message.content
      else
        '画像が投稿されています'
      end
    else
      'まだメッセージはありません。'
    end
  end

end