import moment from 'moment-timezone/builds/moment-timezone-with-data-10-year-range.js'; // or .min.js
import React, { useState, useRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import '../../styles/UI/Clock/ClockSpinner.css'; // Importa el archivo CSS

export default function ClockSpinner({ sethour }) {
  const [searchText, setSearchText] = useState('');
  const [matchingTimezones, setMatchingTimezones] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState('');

  const inputRef = useRef(null); // Referencia al campo de texto

  const handleSearchChange = (event) => {
    const inputText = event.target.value;
    setSearchText(inputText);

    // Filtrar las zonas horarias que coinciden con el texto ingresado
    const filteredTimezones = moment.tz.names().filter((tz) =>
      tz.toLowerCase().includes(inputText.toLowerCase())
    );

    setMatchingTimezones(filteredTimezones);
    setShowOptions(true);
  };

  const handleTimezoneSelect = (timezone) => {
    setSelectedTimezone(timezone);
    setSearchText(timezone);
    
    setShowOptions(false);
    
    sethour(timezone)
    // onSelectTimezone(timezone);

    inputRef.current.blur(); // Desenfocar el campo de texto después de seleccionar
  };


  return (
    <div className="clock-spinner-container">
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <input
           type="text"
           placeholder="Buscar zona horaria..."
           value={searchText}
           onChange={handleSearchChange}
           className="search-input"
           ref={inputRef}
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {matchingTimezones.map((tz) => (
            <Dropdown.Item key={tz} onClick={() => handleTimezoneSelect(tz)}>
              {tz} ({moment().tz(tz).format('HH:mm:ss')})
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
