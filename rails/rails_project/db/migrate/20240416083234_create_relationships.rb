class CreateRelationships < ActiveRecord::Migration[6.1]
  def change
    create_table :relationships do |t|
    

      t.timestamps
    end
  end
  update_task_flag
end
