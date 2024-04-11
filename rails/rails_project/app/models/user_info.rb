class UserInfo < ApplicationRecord

    validates :name, {uniqueness:true}
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email,uniqueness:true, presence: true, length: { maximum: 255 },
            format: { with: VALID_EMAIL_REGEX }
            
    has_secure_password
end
