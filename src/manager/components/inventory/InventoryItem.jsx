import React from 'react'
import PropTypes from 'prop-types'

const InventoryItem = ({ item, handleChange, handleSave }) => {
  return (
    <div className="rounded-lg bg-white p-2">
      <div><strong>ID:</strong> {item.id}</div>
      <label>
      Name:&nbsp;
      <input
          type="text"
          value={item.name}
          onChange={(e) => handleChange(item.id, 'name', e.target.value)}
      />
      </label>
      <br />
      <label>
      Units:&nbsp;
      <input
          type="text"
          value={item.units}
          onChange={(e) => handleChange(item.id, 'units', e.target.value)}
      />
      </label>
      <button onClick={() => handleSave(item.id)}>Save</button>
    </div>
  )
}

InventoryItem.propTypes = {
  item: PropTypes.object.isRequired
}

export default InventoryItem