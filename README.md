## userテーブル

|Column|Type|Options|
|------|----|-------|
|nickname|string|null: fales, index|
|password|string|null: fales|
|email|string|null: false, unique: true|

### Association
- has_many :groups
- has_many :gropususers
- has_many :chat


## groupテーブル

|Column|Type|Options|
|------|----|-------|
|groupname|string|null: fales|

### Association
- has_many :users
- has_many :gropususers
- has_many :chat


## chatテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: fales|
|group_id|integer|null: fales|
|body|text|
|image|text|

### Association
- belongs_to :user
- belongs_to :group


## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user