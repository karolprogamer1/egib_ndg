import { useState } from 'react'
import './Form.css'
import { db } from './firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function Form({ formType = 'p1' }) {
  const [form, setForm] = useState({ 
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
    message: '', 
    materials: '', 
    contactName: '', 
    contactSurname: '', 
    contactPhone: '', 
    contactEmail: '', 
    delivery: '', 
    deliveryAddressOption: '', 
    shipStreet: '', 
    shipHouse: '', 
    shipPostal: '', 
    shipCity: '', 
    comment: '',
    epuapSignature: '',
    agree: false 
  })

  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Imię jest wymagane'
    if (!form.surname || !form.surname.trim()) errs.surname = 'Nazwisko jest wymagane'
    if (form.date && isNaN(Date.parse(form.date))) errs.date = 'Nieprawidłowa data'
    if (!form.email.trim()) errs.email = 'Email jest wymagany'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Nieprawidłowy email'
    if (!form.message.trim()) errs.message = 'Wiadomość jest wymagana'
    if (!form.agree) errs.agree = 'Musisz zaakceptować regulamin'
    if (form.postal && !/^\d{2}-\d{3}$/.test(form.postal)) errs.postal = 'Kod pocztowy powinien mieć format 00-000'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length === 0) {
      try {
        const formsCollection = collection(db, 'forms')
        await addDoc(formsCollection, {
          formType: 'Form',
          name: form.name,
          surname: form.surname,
          company: form.company,
          street: form.street,
          house: form.house,
          postal: form.postal,
          city: form.city,
          email: form.email,
          date: form.date,
          phone: form.phone,
          message: form.message,
          materials: form.materials,
          contactName: form.contactName,
          contactSurname: form.contactSurname,
          contactPhone: form.contactPhone,
          contactEmail: form.contactEmail,
          delivery: form.delivery,
          shipStreet: form.shipStreet,
          shipHouse: form.shipHouse,
          shipPostal: form.shipPostal,
          shipCity: form.shipCity,
          comment: form.comment,
          epuapSignature: form.epuapSignature,
          agree: form.agree,
          timestamp: serverTimestamp()
        })
        setSubmitted({ status: 'sent' })
        setForm({ 
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
          message: '', 
          materials: '', 
          contactName: '', 
          contactSurname: '', 
          contactPhone: '', 
          contactEmail: '', 
          delivery: '', 
          deliveryAddressOption: '', 
          shipStreet: '', 
          shipHouse: '', 
          shipPostal: '', 
          shipCity: '', 
          comment: '',
          epuapSignature: '',
          agree: false 
        })
      } catch (err) {
        setSubmitted({ status: 'error', message: err.message })
      }
    }
  }

  return (
    <div className="form-container">
      <div className="form-column">
        <div className="form-wrap">
          <form onSubmit={handleSubmit} noValidate>
          <h2>Formularz P1 - Wniosek o udostępnienie mapy zasadniczej</h2>

          <h3>1. Imię i nazwisko / Nazwa oraz adres wnioskodawcy</h3>
          <div className="row three-columns">
            <div className="field">
              <label htmlFor="name">Imię</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="field">
              <label htmlFor="surname">Nazwisko</label>
              <input id="surname" name="surname" value={form.surname} onChange={handleChange} />
              {errors.surname && <div className="error">{errors.surname}</div>}
            </div>

            <div className="field">
              <label htmlFor="company">Nazwa firmy*</label>
              <input id="company" name="company" value={form.company} onChange={handleChange} />
            </div>
          </div>

          <h4>Adres wnioskodawcy</h4>
          <div className="field">
            <label htmlFor="street">Ulica</label>
            <input id="street" name="street" value={form.street} onChange={handleChange} />
          </div>

          <div className="row">
            <div className="field" style={{ flex: '0 0 200px' }}>
              <label htmlFor="house">Nr domu / lokalu</label>
              <input id="house" name="house" value={form.house} onChange={handleChange} />
            </div>

            <div className="field" style={{ flex: '0 0 140px' }}>
              <label htmlFor="postal">Kod pocztowy</label>
              <input id="postal" name="postal" value={form.postal} onChange={handleChange} placeholder="00-000" />
              {errors.postal && <div className="error">{errors.postal}</div>}
            </div>

            <div className="field">
              <label htmlFor="city">Miejscowość</label>
              <input id="city" name="city" value={form.city} onChange={handleChange} />
            </div>
          </div>

          <h4>2. Data</h4>
          <div className="field">
            <label htmlFor="date">Data</label>
            <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
            {errors.date && <div className="error">{errors.date}</div>}
          </div>

          <h5>3. Adresat wniosku</h5>
          <div className="receiver">
            <p>Starostwo Powiatowe w Nowym Dworze Gdańskim</p>
            <p>ul. Sikorskiego 23</p>
            <p>82-100 Nowy Dwór Gdański</p>
          </div>

          <h6>4. Dane kontaktowe wnioskodawcy</h6>
          <div className="field">
            <label htmlFor="phone">Nr telefonu</label>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <h6>5. Oznaczenie wniosku nadane przez wnioskodawcę*</h6>
          <div className="field">
            <label htmlFor="message">Wiadomość</label>
            <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} />
            {errors.message && <div className="error">{errors.message}</div>}
          </div>

          <h6>6. Określenie materiałów będących przedmiotem wniosku</h6>
          <div className="field checkbox">
            <label>
              <input name="materials" type="radio" value="mapa_zasadnicza" checked={form.materials === 'mapa_zasadnicza'} onChange={handleChange} />
              Mapa zasadnicza lub mapa ewidencji gruntów i budynków
            </label>
            <label>
              <input name="materials" type="radio" value="baza_egib" checked={form.materials === 'baza_egib'} onChange={handleChange} />
              Baza danych ewidencji gruntów i budynków
            </label>
            <label>
              <input name="materials" type="radio" value="gesut" checked={form.materials === 'gesut'} onChange={handleChange} />
              Baza danych geodezyjnej ewidencji sieci uzbrojenia terenu (GESUT)
            </label>
            <label>
              <input name="materials" type="radio" value="bdot500" checked={form.materials === 'bdot500'} onChange={handleChange} />
              Baza danych obiektów topograficznych (BDOT500)
            </label>
            <label>
              <input name="materials" type="radio" value="rejestr_cen" checked={form.materials === 'rejestr_cen'} onChange={handleChange} />
              Rejestr cen nieruchomości
            </label>
            <label>
              <input name="materials" type="radio" value="raporty_egib" checked={form.materials === 'raporty_egib'} onChange={handleChange} />
              Raporty tworzone na podstawie bazy danych EGiB
            </label>
            <label>
              <input name="materials" type="radio" value="inne" checked={form.materials === 'inne'} onChange={handleChange} />
              Inne materiały
            </label>
          </div>

          <h6>7. Cel pobrania materiałów</h6>
          <p><strong>7a. Udostępnienie odpłatne</strong></p>
          <div className="field checkbox">
            <label>
              <input name="materials" type="radio" value="opcja1" checked={form.materials === 'opcja1'} onChange={handleChange} />
              dla potrzeb własnych niezwiązanych z działalnością gospodarczą
            </label>
            <label>
              <input name="materials" type="radio" value="opcja2" checked={form.materials === 'opcja2'} onChange={handleChange} />
              w celu wykonania wyceny nieruchomości
            </label>
            <label>
              <input name="materials" type="radio" value="opcja3" checked={form.materials === 'opcja3'} onChange={handleChange} />
              dla dowolnych potrzeb
            </label>
          </div>

          <p><strong>7b. Udostępnienie nieodpłatne w postaci elektronicznej</strong></p>
          <div className="field checkbox">
            <label>
              <input name="materials" type="radio" value="opcja1b" checked={form.materials === 'opcja1b'} onChange={handleChange} />
              na cele edukacyjne jednostkom organizacyjnym<sup>11</sup>
            </label>
            <label>
              <input name="materials" type="radio" value="opcja2b" checked={form.materials === 'opcja2b'} onChange={handleChange} />
              w celu prowadzenia badań naukowych<sup>14</sup>
            </label>
            <label>
              <input name="materials" type="radio" value="opcja3b" checked={form.materials === 'opcja3b'} onChange={handleChange} />
              dla służb specjalnych<sup>15</sup>
            </label>
          </div>

          <div className="contact">
            <h6><sup>8</sup> Osoba wyznaczona do kontaktu ze strony wnioskodawcy</h6>
            <div className="row three-columns">
              <div className="field">
                <label htmlFor="contactName">Imię</label>
                <input id="contactName" name="contactName" value={form.contactName} onChange={handleChange} />
              </div>

              <div className="field">
                <label htmlFor="contactSurname">Nazwisko</label>
                <input id="contactSurname" name="contactSurname" value={form.contactSurname} onChange={handleChange} />
              </div>

              <div className="field">
                <label htmlFor="contactPhone">Nr telefonu</label>
                <input id="contactPhone" name="contactPhone" type="tel" value={form.contactPhone} onChange={handleChange} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="contactEmail">Email</label>
              <input id="contactEmail" name="contactEmail" type="email" value={form.contactEmail} onChange={handleChange} />
            </div>
          </div>

          <div className="sharing">
            <h6>9. Sposób udostępnienia materiałów**</h6>
            <div className="field checkbox">
              <label>
                <input name="delivery" type="radio" value="odbior_osobisty" checked={form.delivery === 'odbior_osobisty'} onChange={handleChange} />
                odbiór osobisty
              </label>
              <label>
                <input name="delivery" type="radio" value="wysylka" checked={form.delivery === 'wysylka'} onChange={handleChange} />
                wysyłka pod wskazany adres
              </label>
              <label>
                <input name="delivery" type="radio" value="email" checked={form.delivery === 'email'} onChange={handleChange} />
                wysyłka na wskazany adres email
              </label>
              <label>
                <input name="delivery" type="radio" value="ftp" checked={form.delivery === 'ftp'} onChange={handleChange} />
                udostępnienie na serwerze FTP<sup>16</sup>
              </label>
            </div>

            {form.delivery === 'wysylka' && (
              <div className="shipping-address">
                <p><strong>Adres wysyłki:</strong></p>
                <div className="row">
                  <div className="field">
                    <label htmlFor="shipStreet">Ulica</label>
                    <input id="shipStreet" name="shipStreet" value={form.shipStreet} onChange={handleChange} />
                  </div>
                  <div className="field" style={{ flex: '0 0 120px' }}>
                    <label htmlFor="shipHouse">Nr domu</label>
                    <input id="shipHouse" name="shipHouse" value={form.shipHouse} onChange={handleChange} />
                  </div>
                  <div className="field" style={{ flex: '0 0 120px' }}>
                    <label htmlFor="shipPostal">Kod pocztowy</label>
                    <input id="shipPostal" name="shipPostal" value={form.shipPostal} onChange={handleChange} placeholder="00-000" />
                  </div>
                  <div className="field">
                    <label htmlFor="shipCity">Miejscowość</label>
                    <input id="shipCity" name="shipCity" value={form.shipCity} onChange={handleChange} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="field">
            <label htmlFor="comment">Dodatkowe wyjaśnienia i uwagi wnioskodawcy</label>
            <textarea id="comment" name="comment" value={form.comment} onChange={handleChange} rows={3} />
          </div>

          <div className="field">
            <label htmlFor="epuapSignature">Podpis ePUAP</label>
            <textarea id="epuapSignature" name="epuapSignature" value={form.epuapSignature} onChange={handleChange} rows={2} placeholder="Podpis elektroniczny ePUAP (opcjonalnie)" />
          </div>

          <div className="field checkbox">
            <label>
              <input name="agree" type="checkbox" checked={form.agree} onChange={handleChange} />
              Akceptuję regulamin
            </label>
            {errors.agree && <div className="error">{errors.agree}</div>}
          </div>

          <div className="actions">
            <button type="submit">Wyślij formularz</button>
          </div>

          {submitted && (
            <div className="submitted">
              {submitted.status === 'sent' ? (
                <>
                  <h3>✓ Wiadomość wysłana</h3>
                  <p>Dziękujemy — wiadomość została wysłana na wskazany adres.</p>
                </>
              ) : (
                <>
                  <h3>✗ Błąd wysyłki</h3>
                  <p>Wystąpił problem: {submitted.message}</p>
                </>
              )}
            </div>
          )}
          </form>
        </div>
      </div>
    </div>
  )
}
