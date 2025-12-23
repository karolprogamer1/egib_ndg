import { useState } from 'react'
import Form from './Form' 
import './Menu.css'

export default function Menu({ selectedForm, onSelectForm }) {
  const [isOpen, setIsOpen] = useState(false)

  const options = [
    { value: 'Form', label: 'Formularz główny' },
    { value: 'p1', label: 'P1' },
    { value: 'p3', label: 'P3' },
    { value: 'p4', label: 'P4' },
    { value: 'p7', label: 'P7' }
  ]

  const handleSelect = (value) => {
    onSelectForm(value)
    setIsOpen(false)
  }

  const selectedLabel = options.find(opt => opt.value === selectedForm)?.label || 'Wybierz formularz'

  return (
    <div className="menu">
      <div className="menu-container">
        <h1>Formularze Geodezyjne</h1>
        
        <div className="menu-buttons">
          <div className="dropdown">
            <button 
              className="dropdown-toggle"
              onClick={() => setIsOpen(!isOpen)}
            >
              {selectedLabel}
              <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
            </button>

            {isOpen && (
              <div className="dropdown-menu">
                {options.map(opt => (
                  <button
                    key={opt.value}
                    className={`dropdown-item ${selectedForm === opt.value ? 'active' : ''}`}
                    onClick={() => handleSelect(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}