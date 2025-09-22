import React from 'react';

export default function Input({ name, placeholder, handleInput }) {
  return (
    <input
      name={name}
      onChange={handleInput}
      type="text"
      className="input-field"
      placeholder={placeholder}
    />
  );
}
