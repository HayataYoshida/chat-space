class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user
  # 「1対1」のつながりがあることを示すのがbelongs_toメソッド
  
  validates :content, presence: true, unless: :image?

  mount_uploader :image, ImageUploader
end