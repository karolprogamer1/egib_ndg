import { useState } from 'react'
import Form from './components/Form'
import P1 from './components/p1'
import P3 from './components/p3'
import P4 from './components/p4'
import P7 from './components/p7'
import Menu from './components/Menu'

export default function App() {
  const [selectedForm, setSelectedForm] = useState('Form')

  const renderForm = () => {
    switch (selectedForm) {
      case 'Form': return <Form />
      case 'p1': return <P1 formType="p1" />
      case 'p3': return <P3 formType="p3" />
      case 'p4': return <P4 formType="p4" />
      case 'p7': return <P7 formType="p7" />
      default: return <Form />
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderForm()}
      </div>
      <Menu selectedForm={selectedForm} onSelectForm={setSelectedForm} />
    </div>
  )
}
