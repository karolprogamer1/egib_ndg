import React, { useState } from 'react';
import './Form.css';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const P1 = ({ formType }) => {
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
    // Dane formularza P1
    mapa: [],
    postac: [],
    skala: [],
    formatWydruku: [],
    kolorowyWydruk: [],
    liczbaEgzemplarzy: '',
    jednostkiPodzialu: 'jednostki',
    godloArkusza: '',
    wspolrzedneWielokat: false,
    ukladzieWspolrzednych: 'PL-2000',
    innyUklad: '',
    obszarGraficzny: false,
    obszarWektorowy: false,
    ukladWektorowy: 'PL-2000',
    innyUkladWektorowy: '',
    imeNazwisko: '',
    dodatkoweWyjasnienia: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleRadioChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    try {
      const formsCollection = collection(db, 'forms');
      await addDoc(formsCollection, {
        formType: 'P1',
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
        mapa: [],
        postac: [],
        skala: [],
        formatWydruku: [],
        kolorowyWydruk: [],
        liczbaEgzemplarzy: '',
        jednostkiPodzialu: 'jednostki',
        godloArkusza: '',
        wspolrzedneWielokat: false,
        ukladzieWspolrzednych: 'PL-2000',
        innyUklad: '',
        obszarGraficzny: false,
        obszarWektorowy: false,
        ukladWektorowy: 'PL-2000',
        innyUkladWektorowy: '',
        imeNazwisko: '',
        dodatkoweWyjasnienia: ''
      });
    } catch (err) {
      setError('Błąd wysyłania formularza: ' + err.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-column">
        <div className="form-wrap">
          <h2>Formularz P1 - Szczegóły wniosku o udostępnienie mapy</h2>
          
          <form onSubmit={handleSubmit}>
            {/* Sekcja: Dane osobowe */}
            <h3>1. Dane osobowe wnioskodawcy</h3>
            <div className="row three-columns">
              <div className="field">
                <label>Imię</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Imię"
                />
              </div>
              <div className="field">
                <label>Nazwisko</label>
                <input 
                  type="text" 
                  value={formData.surname}
                  onChange={(e) => handleInputChange('surname', e.target.value)}
                  placeholder="Nazwisko"
                />
              </div>
              <div className="field">
                <label>Nazwa firmy</label>
                <input 
                  type="text" 
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Nazwa firmy (opcjonalnie)"
                />
              </div>
            </div>

            <h4>Adres wnioskodawcy</h4>
            <div className="field">
              <label>Ulica</label>
              <input 
                type="text" 
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                placeholder="Ulica"
              />
            </div>

            <div className="row">
              <div className="field" style={{ flex: '0 0 200px' }}>
                <label>Nr domu / lokalu</label>
                <input 
                  type="text" 
                  value={formData.house}
                  onChange={(e) => handleInputChange('house', e.target.value)}
                  placeholder="Nr domu"
                />
              </div>
              <div className="field" style={{ flex: '0 0 140px' }}>
                <label>Kod pocztowy</label>
                <input 
                  type="text" 
                  value={formData.postal}
                  onChange={(e) => handleInputChange('postal', e.target.value)}
                  placeholder="00-000"
                />
              </div>
              <div className="field">
                <label>Miejscowość</label>
                <input 
                  type="text" 
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Miejscowość"
                />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="field">
                <label>Nr telefonu</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Nr telefonu"
                />
              </div>
              <div className="field">
                <label>Data</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>
            </div>

            {/* Sekcja oryginalna: Mapa */}
            <div style={{marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '4px'}}>
              <h3>Mapa:</h3>
              <div className="field checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.mapa.includes('zasadnicza')}
                    onChange={(e) => handleCheckboxChange('mapa', 'zasadnicza')}
                  />
                  zasadnicza
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.mapa.includes('ewidencji')}
                    onChange={(e) => handleCheckboxChange('mapa', 'ewidencji')}
                  />
                  ewidencji gruntów i budynków
                </label>
              </div>
            </div>

            {/* Section 2: Postać, Skala, Format */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem'}}>
              {/* Postać */}
              <div style={{border: '1px solid #ccc', padding: '1rem', borderRadius: '4px'}}>
                <h4>Postać:</h4>
                <div className="field checkbox">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.postac.includes('wektorowa')}
                      onChange={(e) => handleCheckboxChange('postac', 'wektorowa')}
                    />
                    wektorowa
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.postac.includes('rastrowa')}
                      onChange={(e) => handleCheckboxChange('postac', 'rastrowa')}
                    />
                    rastrowa
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.postac.includes('drukowana')}
                      onChange={(e) => handleCheckboxChange('postac', 'drukowana')}
                    />
                    drukowana
                  </label>
                </div>
              </div>

              {/* Skala */}
              <div style={{border: '1px solid #ccc', padding: '1rem', borderRadius: '4px'}}>
                <h4>Skala:</h4>
                <div className="field checkbox">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.skala.includes('500')}
                      onChange={(e) => handleCheckboxChange('skala', '500')}
                    />
                    1:500
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.skala.includes('1000')}
                      onChange={(e) => handleCheckboxChange('skala', '1000')}
                    />
                    1:1000
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.skala.includes('2000')}
                      onChange={(e) => handleCheckboxChange('skala', '2000')}
                    />
                    1:2000
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.skala.includes('5000')}
                      onChange={(e) => handleCheckboxChange('skala', '5000')}
                    />
                    1:5000
                  </label>
                  <div style={{marginTop: '0.5rem'}}>
                    <label>
                      Liczba egzemplarzy:
                      <input 
                        type="text" 
                        style={{width: '80px', marginLeft: '0.5rem'}}
                        value={formData.liczbaEgzemplarzy}
                        onChange={(e) => handleInputChange('liczbaEgzemplarzy', e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Format wydruku */}
              <div style={{border: '1px solid #ccc', padding: '1rem', borderRadius: '4px'}}>
                <h4>Format wydruku:</h4>
                <div className="field checkbox">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.formatWydruku.includes('A4')}
                      onChange={(e) => handleCheckboxChange('formatWydruku', 'A4')}
                    />
                    A4
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.formatWydruku.includes('A3')}
                      onChange={(e) => handleCheckboxChange('formatWydruku', 'A3')}
                    />
                    A3
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.formatWydruku.includes('A2')}
                      onChange={(e) => handleCheckboxChange('formatWydruku', 'A2')}
                    />
                    A2
                  </label>
                  <label>
                    <input 
                      type="checkbox" 
                      checked={formData.formatWydruku.includes('A1')}
                      onChange={(e) => handleCheckboxChange('formatWydruku', 'A1')}
                    />
                    A1
                  </label>
                </div>

                <div style={{marginTop: '1rem'}}>
                  <h4>Kolorystyka:</h4>
                  <div className="field checkbox">
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.kolorowyWydruk.includes('czarno-biala')}
                        onChange={(e) => handleCheckboxChange('kolorowyWydruk', 'czarno-biala')}
                      />
                      czarno-biała
                    </label>
                    <label>
                      <input 
                        type="checkbox" 
                        checked={formData.kolorowyWydruk.includes('kolorowa')}
                        onChange={(e) => handleCheckboxChange('kolorowyWydruk', 'kolorowa')}
                      />
                      kolorowa
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Dane identyfikujące obszar */}
            <div style={{border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', marginBottom: '2rem'}}>
              <h3>2. Dane identyfikujące obszar wnioskiem</h3>
              <div className="field checkbox">
                <label>
                  <input 
                    type="radio" 
                    name="jednostki"
                    value="jednostki"
                    checked={formData.jednostkiPodzialu === 'jednostki'}
                    onChange={(e) => handleRadioChange('jednostkiPodzialu', e.target.value)}
                  />
                  jednostki podziału terytorialnego kraju
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="jednostki"
                    value="godlo"
                    checked={formData.jednostkiPodzialu === 'godlo'}
                    onChange={(e) => handleRadioChange('jednostkiPodzialu', e.target.value)}
                  />
                  godło arkusza mapy
                </label>
                <label>
                  <input 
                    type="checkbox"
                    checked={formData.wspolrzedneWielokat}
                    onChange={(e) => handleInputChange('wspolrzedneWielokat', e.target.checked)}
                  />
                  wspólrzędne wielokąta (poligonu) w układzie wspólrzędnych:
                </label>
                {formData.wspolrzedneWielokat && (
                  <div style={{marginLeft: '2rem', marginTop: '0.5rem'}}>
                    <label style={{display: 'block', marginBottom: '0.5rem'}}>
                      <input 
                        type="radio" 
                        name="uklady"
                        value="PL-2000"
                        checked={formData.ukladzieWspolrzednych === 'PL-2000'}
                        onChange={(e) => handleRadioChange('ukladzieWspolrzednych', e.target.value)}
                      />
                      PL-2000
                    </label>
                    <label style={{display: 'block'}}>
                      <input 
                        type="radio" 
                        name="uklady"
                        value="inny"
                        checked={formData.ukladzieWspolrzednych === 'inny'}
                        onChange={(e) => handleRadioChange('ukladzieWspolrzednych', e.target.value)}
                      />
                      inny:
                      <input 
                        type="text" 
                        style={{width: '150px', marginLeft: '0.5rem'}}
                        value={formData.innyUklad}
                        onChange={(e) => handleInputChange('innyUklad', e.target.value)}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Section 4: Dodatkowe wyjaśnienia */}
            <div style={{border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', marginBottom: '2rem'}}>
              <h3>3. Dane szczegółowe określające położenie obszaru:</h3>
              <div className="field checkbox">
                <label>
                  <input 
                    type="checkbox"
                    checked={formData.obszarGraficzny}
                    onChange={(e) => handleInputChange('obszarGraficzny', e.target.checked)}
                  />
                  obszar określony w załączniku graficznym
                </label>
                <label>
                  <input 
                    type="checkbox"
                    checked={formData.obszarWektorowy}
                    onChange={(e) => handleInputChange('obszarWektorowy', e.target.checked)}
                  />
                  wektorowym, w układzie wspólrzędnych:
                </label>
                {formData.obszarWektorowy && (
                  <div style={{marginLeft: '2rem', marginTop: '0.5rem'}}>
                    <label style={{display: 'block', marginBottom: '0.5rem'}}>
                      <input 
                        type="radio" 
                        name="ukladyWektora"
                        value="PL-2000"
                        checked={formData.ukladWektorowy === 'PL-2000'}
                        onChange={(e) => handleRadioChange('ukladWektorowy', e.target.value)}
                      />
                      PL-2000
                    </label>
                    <label style={{display: 'block'}}>
                      <input 
                        type="radio" 
                        name="ukladyWektora"
                        value="inny"
                        checked={formData.ukladWektorowy === 'inny'}
                        onChange={(e) => handleRadioChange('ukladWektorowy', e.target.value)}
                      />
                      inny:
                      <input 
                        type="text" 
                        style={{width: '150px', marginLeft: '0.5rem'}}
                        value={formData.innyUkladWektorowy}
                        onChange={(e) => handleInputChange('innyUkladWektorowy', e.target.value)}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Section 5: Dodatkowe wyjaśnienia */}
            <div style={{border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', marginBottom: '2rem'}}>
              <h3>4. Dodatkowe wyjaśnienia i uwagi:</h3>
              <textarea 
                style={{width: '100%', minHeight: '100px', padding: '0.5rem'}}
                value={formData.dodatkoweWyjasnienia}
                onChange={(e) => handleInputChange('dodatkoweWyjasnienia', e.target.value)}
                placeholder="Wpisz dodatkowe wyjaśnienia..."
              />
            </div>

            {/* Section 6: Podpis */}
            <div style={{border: '1px solid #ccc', padding: '1rem', borderRadius: '4px', marginBottom: '2rem'}}>
              <h3>5. Imię i nazwisko oraz podpis wnioskodawcy:</h3>
              <input 
                type="text" 
                placeholder="Imię i nazwisko"
                style={{width: '100%', padding: '0.5rem', marginBottom: '1rem'}}
                value={formData.imeNazwisko}
                onChange={(e) => handleInputChange('imeNazwisko', e.target.value)}
              />
              <div className="field">
                <label>Podpis ePUAP</label>
                <textarea 
                  value={formData.epuapSignature}
                  onChange={(e) => handleInputChange('epuapSignature', e.target.value)}
                  rows={2}
                  placeholder="Podpis elektroniczny ePUAP (opcjonalnie)"
                  style={{width: '100%', padding: '0.5rem'}}
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="actions" style={{marginTop: '2rem'}}>
              <button type="submit">
                Wyślij formularz P1
              </button>
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
                <strong>Sukces!</strong> Formularz P1 został wysłany. Odpowiedź otrzymasz na podany adres email.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default P1;
