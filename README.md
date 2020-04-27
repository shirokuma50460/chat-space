## userテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: fales, index: true|
|password|string|null: fales|
|email|string|null: false, unique: true|

### Association
- has_many :groups, through: :groups_users
- has_many :groups_users
- has_many :chats


## groupテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: fales|

### Association
- has_many :users, through: :groups_users
- has_many :gropus_users
- has_many :chats


## chatテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: fales, foreign_key: true|
|group|references|null: fales, foreign_key: true|
|body|text|
|image|text|

### Association
- belongs_to :user
- belongs_to :group


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user