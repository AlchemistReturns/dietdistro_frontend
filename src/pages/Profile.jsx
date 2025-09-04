import { useEffect, useState } from 'react'
import { useAuth } from '../state/AuthContext.jsx'
import { mockApi, api } from '../api/api.js'

export default function Profile() {
  const { user, setUser } = useAuth()
  const [form, setForm] = useState(user || {})
  const [saving, setSaving] = useState(false)

  useEffect(()=>{
    setForm(user || {})
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (['height', 'weight', 'age', 'gender'].includes(name)) {
      setForm(prev => ({ ...prev, health: { ...prev.health, [name]: name === 'gender' ? value : Number(value) } }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      let updated
      if (import.meta.env.VITE_USE_MOCK) {
        updated = await mockApi.user.updateMe({ name: form.name, health: form.health })
      } else {
        const res = await api.patch('/users/me', { name: form.name, health: form.health })
        updated = res.data
      }
      setUser(updated)
      localStorage.setItem('dd_user', JSON.stringify(updated))
    } finally {
      setSaving(false)
    }
  }

  if (!user) return null

  return (
    <div className="max-w-lg card mx-auto">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <form className="grid-gap" onSubmit={save}>
        <div>
          <label className="label">Name</label>
          <input className="input" name="name" value={form.name || ''} onChange={handleChange} />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">Height (cm)</label>
            <input className="input" type="number" name="height" value={form.health?.height || 0} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Weight (kg)</label>
            <input className="input" type="number" name="weight" value={form.health?.weight || 0} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Age</label>
            <input className="input" type="number" name="age" value={form.health?.age || 0} onChange={handleChange} />
          </div>
          <div>
            <label className="label">Gender</label>
            <select className="input" name="gender" value={form.health?.gender || 'other'} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <button className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
      </form>
    </div>
  )
}
