// src/components/AddModelDropdown.js
import React, { useState } from 'react';
import { MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdbreact';

const AddModelDropdown = ({ onAddModel, modelOptions }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <MDBDropdown>
        <MDBDropdownToggle color="primary" className="btn-sm" onClick={toggle}>
            +New
        </MDBDropdownToggle>
        <MDBDropdownMenu basic color="white">
        {modelOptions.map((option, index) => (
          <MDBDropdownItem key={index} onClick={() => onAddModel(option)}>
            {option}
          </MDBDropdownItem>
        ))}
      </MDBDropdownMenu>
    </MDBDropdown>
  );
};

export default AddModelDropdown;
