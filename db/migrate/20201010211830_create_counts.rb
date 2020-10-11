class CreateCounts < ActiveRecord::Migration[5.2]
  def change
    create_table :counts do |t|
      t.string :place_id
      t.integer :wifi_device_count

      t.timestamps
    end
  end
end
