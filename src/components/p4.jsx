import React, { useState } from 'react';
import './Form.css';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const P4 = ({ formType }) => {
  const [formData, setFormData] = useState({
    // Dane osobowe
    name: '',
    surname: '',
    company: '',
    street: '',
    house: '',
    postal: '',
    city: '',
    email: '',
    date: '',
    phone: '',
    epuapSignature: '',
    // Section 1: Pełny vs Wybrany zbiór
    pelnyZbior: false,
    wybranyZbior: false,
    
    // Wybrany zbiór BDOT500 (kategoria)
    budynkiNiewykorzystanewEwidencji: false,
    budynkiZwiazaneBudynkami: false,
    budowie: false,
    ogrodzenia: false,
    komunikacja: false,
    zagospodarowanieTerenu: false,
    sportIRekreacja: false,
    wody: false,
    trabyLiniowe: false,
    
    // Section 2: Dane identyfikujące obszar
    jednostkiPodzialu: false,
    jednostkiCeleEGiB: false,
    wspolrzedne: false,
    uklad: 'PL-2000',
    innyUklad: '',
    
    // Section 3: Dane szczegółowe
    obszarOkreslony: false,
    obszarGraficzny: false,
    obszarWektorowy: false,
    ukladWektorowy: 'PL-2000',
    innyUkladWektorowy: '',
    daneSzczegolowe: '',
    
    // Section 4: Dodatkowe wyjaśnienia
    dodatkowe: '',
    
    // Section 5: Dane wnioskodawcy
    imieNazwisko: '',
    podpis: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleCheckboxChange = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    try {
      const formsCollection = collection(db, 'forms');
      await addDoc(formsCollection, {
        formType: 'P4',
        ...formData,
        timestamp: serverTimestamp()
      });
      setSubmitted(true);
      setFormData({
        name: '',
        surname: '',
        company: '',
        street: '',
        house: '',
        postal: '',
        city: '',
        email: '',
        date: '',
        phone: '',
        epuapSignature: '',
        pelnyZbior: false,
        wybranyZbior: false,
        budynkiNiewykorzystanewEwidencji: false,
        budynkiZwiazaneBudynkami: false,
        budowie: false,
        ogrodzenia: false,
        komunikacja: false,
        zagospodarowanieTerenu: false,
        sportIRekreacja: false,
        wody: false,
        trabyLiniowe: false,
        jednostkiPodzialu: false,
        jednostkiCeleEGiB: false,
        wspolrzedne: false,
        uklad: 'PL-2000',
        innyUklad: '',
        obszarOkreslony: false,
        obszarGraficzny: false,
        obszarWektorowy: false,
        ukladWektorowy: 'PL-2000',
        innyUkladWektorowy: '',
        daneSzczegolowe: '',
        dodatkowe: '',
        imieNazwisko: '',
        podpis: ''
      });
    } catch (err) {
      setError('Błąd wysyłania formularza: ' + err.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-column">
        <div className="form-wrap">
          <h2>Formularz P4 - Szczegóły wniosku o udostępnienie zbioru danych bazy danych obiektów topograficznych (BDOT500)</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Sekcja: Dane osobowe */}
            <h3>1. Dane osobowe wnioskodawcy</h3>
            <div className="row three-columns">
              <div className="field">
                <label>Imię</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Imię"
                />
              </div>
              <div className="field">
                <label>Nazwisko</label>
                <input 
                  type="text" 
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  placeholder="Nazwisko"
                />
              </div>
              <div className="field">
                <label>Nazwa firmy</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nazwa firmy (opcjonalnie)"
                />
              </div>
            </div>

            <h4>Adres wnioskodawcy</h4>
            <div className="field">
              <label>Ulica</label>
              <input 
                type="text" 
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Ulica"
              />
            </div>

            <div className="row">
              <div className="field" style={{ flex: '0 0 200px' }}>
                <label>Nr domu / lokalu</label>
                <input 
                  type="text" 
                  name="house"
                  value={formData.house}
                  onChange={handleChange}
                  placeholder="Nr domu"
                />
              </div>
              <div className="field" style={{ flex: '0 0 140px' }}>
                <label>Kod pocztowy</label>
                <input 
                  type="text" 
                  name="postal"
                  value={formData.postal}
                  onChange={handleChange}
                  placeholder="00-000"
                />
              </div>
              <div className="field">
                <label>Miejscowość</label>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Miejscowość"
                />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="field">
                <label>Nr telefonu</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Nr telefonu"
                />
              </div>
              <div className="field">
                <label>Data</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Section 1 */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem'}}>
              <div style={{border: '1px solid #ccc', padding: '1rem', borderRadius: '4px'}}>
                <h4>Pełny zbiór danych</h4>
                <div className="field checkbox">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.pelnyZbior}
                      onChange={() => handleCheckboxChange('pelnyZbior')}
                    />
                    Pełny zbiór danych
                  </label>
                </div>
              </div>

              <div style={{border: '1px solid #ccc', padding: '1rem', borderRadius: '4px'}}>
                <h4>Wybrany zbiór danych BDOT500 (kategoria):</h4>
                <div className="field checkbox">
                  <label>
                    <input type="checkbox" checked={formData.budynkiNiewykorzystanewEwidencji} onChange={() => handleCheckboxChange('budynkiNiewykorzystanewEwidencji')} />
                    budynki niewykażywane w ewidencji gruntów i budynków
                  </label>
                  <label>
                    <input type="checkbox" checked={formData.budynkiZwiazaneBudynkami} onChange={() => handleCheckboxChange('budynkiZwiazaneBudynkami')} />
                    oraz obiekty budowlane (hwale związane z budynkami)
                  </label>
                  <label>
                    <input type="checkbox" checked={formData.budowie} onChange={() => handleCheckboxChange('budowie')} />
                    budowie
                  </label>
                  <label>
                    <input type="checkbox" checked={formData.ogrodzenia} onChange={() => handleCheckboxChange('ogrodzenia')} />
                    ogrodzenia
                  </label>
                  <label>
                    <input type="checkbox" checked={formData.komunikacja} onChange={() => handleCheckboxChange('komunikacja')} />
                    komunikacja
                  </label>
                  <label>
                    <input type="checkbox" checked={formData.zagospodarowanieTerenu} onChange={() => handleCheckboxChange('zagospodarowanieTerenu')} />
                    zagospodarowanie terenu
                  </label>
                  <label>
                    <input type="checkbox" checked={formData.sportIRekreacja} onChange={() => handleCheckboxChange('sportIRekreacja')} />
                    sport i rekreacja
                  </label>
                  <label>
                    <input type="checkbox" checked={formData.wody} onChange={() => handleCheckboxChange('wody')} />
                    wody
                  </label>
                  <label>
                    <input type="checkbox" checked={formData.trabyLiniowe} onChange={() => handleCheckboxChange('trabyLiniowe')} />
                    traby liniowe
                  </label>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <h3>2. Dane identyfikujące obszar objęty wnioskiem</h3>
            <div style={{border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', marginBottom: '2rem'}}>
              <div className="field checkbox">
                <label>
                  <input type="checkbox" checked={formData.jednostkiPodzialu} onChange={() => handleCheckboxChange('jednostkiPodzialu')} />
                  jednostki podziału terytorialnego kraju
                </label>
                <label>
                  <input type="checkbox" checked={formData.jednostkiCeleEGiB} onChange={() => handleCheckboxChange('jednostkiCeleEGiB')} />
                  lub podziale dla celów EGiB<sup>1</sup>
                </label>
                <label>
                  <input type="checkbox" checked={formData.wspolrzedne} onChange={() => handleCheckboxChange('wspolrzedne')} />
                  wspólrzędne wielokąta (poligonu) w układzie wspólrzędnych:
                </label>
              </div>
              {formData.wspolrzedne && (
                <div style={{marginLeft: '2rem', marginTop: '0.75rem'}}>
                  <label style={{display: 'block', marginBottom: '0.5rem'}}>
                    <input type="radio" name="uklad" value="PL-2000" checked={formData.uklad === 'PL-2000'} onChange={handleChange} />
                    PL-2000
                  </label>
                  <label style={{display: 'block'}}>
                    <input type="radio" name="uklad" value="inny" checked={formData.uklad === 'inny'} onChange={handleChange} />
                    inny<sup>2</sup>: 
                    <input 
                      type="text" 
                      name="innyUklad" 
                      value={formData.innyUklad}
                      onChange={handleChange}
                      style={{marginLeft: '0.5rem', width: '150px'}}
                    />
                  </label>
                </div>
              )}

              <div style={{marginTop: '1.5rem', borderTop: '1px solid #ddd', paddingTop: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.75rem'}}>
                  <input 
                    type="checkbox" 
                    checked={formData.obszarOkreslony} 
                    onChange={() => handleCheckboxChange('obszarOkreslony')} 
                  />
                  obszar określony w załączniku:
                </label>
                {formData.obszarOkreslony && (
                  <div style={{marginLeft: '2rem', marginTop: '0.75rem'}}>
                    <div className="field checkbox">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={formData.obszarGraficzny} 
                          onChange={() => handleCheckboxChange('obszarGraficzny')} 
                        />
                        graficznym
                      </label>
                      <label>
                        <input 
                          type="checkbox" 
                          checked={formData.obszarWektorowy} 
                          onChange={() => handleCheckboxChange('obszarWektorowy')} 
                        />
                        wektorowym, w układzie wspólrzędnych:
                      </label>
                    </div>
                    {formData.obszarWektorowy && (
                      <div style={{marginLeft: '2rem', marginTop: '0.75rem'}}>
                        <label style={{display: 'block', marginBottom: '0.5rem'}}>
                          <input type="radio" name="ukladWektorowy" value="PL-2000" checked={formData.ukladWektorowy === 'PL-2000'} onChange={handleChange} />
                          PL-2000
                        </label>
                        <label style={{display: 'block'}}>
                          <input type="radio" name="ukladWektorowy" value="inny" checked={formData.ukladWektorowy === 'inny'} onChange={handleChange} />
                          inny<sup>2</sup>: 
                          <input 
                            type="text" 
                            name="innyUkladWektorowy" 
                            value={formData.innyUkladWektorowy}
                            onChange={handleChange}
                            style={{marginLeft: '0.5rem', width: '150px'}}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Section 3 */}
            <h3>3. Dane szczegółowe określające położenie obszaru objętego wnioskiem</h3>
            <div style={{border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', marginBottom: '2rem'}}>
              <div className="field">
                <textarea 
                  name="daneSzczegolowe"
                  value={formData.daneSzczegolowe}
                  onChange={handleChange}
                  rows={4}
                  style={{width: '100%', padding: '0.75rem'}}
                  placeholder="Wpisz dane szczegółowe..."
                />
              </div>
            </div>

            {/* Section 4 */}
            <h3>4. Dodatkowe wyjaśnienia i uwagi wnioskodawcy:</h3>
            <div className="field" style={{marginBottom: '2rem'}}>
              <textarea 
                name="dodatkowe"
                value={formData.dodatkowe}
                onChange={handleChange}
                rows={4}
                style={{width: '100%', padding: '0.75rem'}}
                placeholder="Wpisz dodatkowe wyjaśnienia..."
              />
            </div>

            {/* Section 5 */}
            <h3>5. Imię i nazwisko oraz podpis wnioskodawcy<sup>3</sup></h3>
            <div style={{border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', marginBottom: '2rem'}}>
              <div className="field">
                <input 
                  type="text" 
                  name="imieNazwisko"
                  value={formData.imieNazwisko}
                  onChange={handleChange}
                  placeholder="Imię i nazwisko"
                  style={{width: '100%', padding: '0.75rem', marginBottom: '1rem'}}
                />
              </div>
              <div className="field">
                <label>Podpis:</label>
                <input 
                  type="text" 
                  name="podpis"
                  value={formData.podpis}
                  onChange={handleChange}
                  placeholder="Podpis"
                  style={{width: '100%', padding: '0.75rem', marginBottom: '1rem'}}
                />
              </div>
              <div className="field">
                <label>Podpis ePUAP</label>
                <textarea 
                  name="epuapSignature"
                  value={formData.epuapSignature}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Podpis elektroniczny ePUAP (opcjonalnie)"
                  style={{width: '100%', padding: '0.75rem'}}
                />
              </div>
            </div>

            <div className="actions">
              <button type="submit">Wyślij formularz P4</button>
            </div>

            {error && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                background: '#ffebee',
                border: '1px solid #ef5350',
                borderRadius: '4px',
                color: '#c62828'
              }}>
                {error}
              </div>
            )}

            {submitted && (
              <div className="submitted">
                <strong>Sukces!</strong> Formularz P4 został wysłany. Odpowiedź otrzymasz na podany adres email.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default P4;
