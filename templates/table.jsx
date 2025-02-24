import React, { useState, useEffect } from 'react';
import { templates } from 'core/js/reactHelpers';

export default function Table({ _items, propName, _showInputs = true }, ...props) {
  const [selectedItems, setSelectedItems] = useState(_showInputs ? _items : _items);

  useEffect(() => {
    if (!_showInputs) {
      setSelectedItems(_items);
    }
  }, [_items, _showInputs]);

  const handleItemToggle = (itemTitle) => {
    if (!_showInputs) return;

    if (selectedItems.find((item) => item.title === itemTitle)) {
      setSelectedItems(selectedItems.filter((item) => item.title !== itemTitle));
    } else {
      const item = _items.find((item) => item.title === itemTitle);
      setSelectedItems([...selectedItems, item]);
    }
  };

  if (!_items || _items.length === 0 || !_items[0]._props) {
    return (
      <div className='component__inner table__inner'>
        <templates.header {...props} />
        <div className='component__widget table__widget'>
          <p>No hay datos para mostrar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='component__inner table__inner'>
      <templates.header {...props} />
      <div className='component__widget table__widget'>
        {_showInputs && (
          <div className='table__items-container'>
            {_items.map((item, idx) => (
              <label key={item.title || idx} className='table__items-selectors'>
                <input
                  type='checkbox'
                  checked={selectedItems.some((i) => i.title === item.title)}
                  onChange={() => handleItemToggle(item.title)}
                  className='table__items-input'
                />
                <span>{item.title}</span>
              </label>
            ))}
          </div>
        )}

        <div className='table__main'>
          <table className='table__table'>
            <thead>
              <tr>
                <th>{propName}</th>
                {selectedItems.map((item, idx) => (
                  <th key={`${item.title}-${idx}`}>{item.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {_items[0]._props.map((prop, idx) => (
                <tr key={`${prop.label}-${idx}`}>
                  <td>{prop.label}</td>
                  {selectedItems.map((item, j) => (
                    <td key={`${item.title}-${j}`}>{item._props.find((p) => p.label === prop.label)?.value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
