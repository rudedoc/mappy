class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :handle
      t.string :text
      t.float :latitude
      t.float :longitude

      t.timestamps null: false
    end
  end
end
