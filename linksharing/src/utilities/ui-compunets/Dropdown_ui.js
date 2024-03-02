import React, { useState,useEffect, useMemo, useRef } from 'react';
import { PLATFORMS } from '../../compunets/lib/platform';
import './Dropdown_ui.css'
import { usePopper } from 'react-popper';

const CustomDropdown = ({currentSection, onSelectionChange}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(currentSection);
  const [searchValue, setSearchValue] = useState('');
  const [position, setPosition] = useState('bottom');
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-start',
  });
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelectionChange(option)
    setIsOpen(false);
  };
  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter' && matches.length > 0) {
      handleOptionClick(matches[0]);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    const dropdownRect = dropdownRef.current.getBoundingClientRect();
    const screenHeight = window.innerHeight;

    if (dropdownRect.bottom > screenHeight) {
      setPosition('top');
    } else {
      setPosition('bottom');
    }
  }, [isOpen]);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const matches = useMemo(() => {

    const filteredList = Object.values(PLATFORMS).filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );

    const sortedList = filteredList.sort((a, b) => a.localeCompare(b));

    return sortedList;
  }, [Object.values(PLATFORMS), searchValue]);


  return (
    <div ref={dropdownRef}  className={`dropdown pos-${position}`}>
      <div ref={setReferenceElement} className="dropdown-header" onClick={toggleDropdown}>
        <span>{selectedOption || 'select option'}</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
      </div>

      {isOpen && (
        <ul className="dropdown-options" 
           ref={setPopperElement}
          style={{ ...styles.popper, width: '100%' }}
          {...attributes.popper}>
          <li className='combobox-wrapper'>
          <input value={searchValue} onKeyDown={handleEnterKeyPress}
            onChange={(e) => setSearchValue(e.target.value)} className='combobox' type='text' placeholder='search'></input>
          </li>
          {matches.map((option) => (
            <li className='select-item' key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;