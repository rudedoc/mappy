class AddTagsToPost < ActiveRecord::Migration
  change_table :posts do |t|
    t.text :tags, array: true, default: []
  end
end
