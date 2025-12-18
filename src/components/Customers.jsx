import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getCustomers, saveCustomer, updateCustomer, deleteCustomer } from '../services/firestoreService'

export default function Customers() {
    const { user, loginWithGoogle, logout } = useAuth()
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        phone: '',
        email: '',
        address: '',
        notes: ''
    })

    useEffect(() => {
        if (user) {
            loadCustomers()
        } else {
            setLoading(false)
        }
    }, [user])

    const loadCustomers = async () => {
        try {
            setLoading(true)
            const data = await getCustomers(user.uid)
            setCustomers(data)
        } catch (error) {
            console.error('Error loading customers:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name.trim()) {
            alert('고객명을 입력해주세요.')
            return
        }

        try {
            if (editingId) {
                await updateCustomer(user.uid, editingId, formData)
                setCustomers(customers.map(c => c.id === editingId ? { ...c, ...formData } : c))
            } else {
                const id = await saveCustomer(user.uid, formData)
                setCustomers([{ id, ...formData }, ...customers])
            }
            resetForm()
        } catch (error) {
            console.error('Error saving customer:', error)
            alert('저장에 실패했습니다.')
        }
    }

    const handleEdit = (customer) => {
        setFormData({
            name: customer.name || '',
            company: customer.company || '',
            phone: customer.phone || '',
            email: customer.email || '',
            address: customer.address || '',
            notes: customer.notes || ''
        })
        setEditingId(customer.id)
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('이 고객을 삭제하시겠습니까?')) {
            try {
                await deleteCustomer(user.uid, id)
                setCustomers(customers.filter(c => c.id !== id))
            } catch (error) {
                console.error('Error deleting customer:', error)
            }
        }
    }

    const resetForm = () => {
        setFormData({ name: '', company: '', phone: '', email: '', address: '', notes: '' })
        setEditingId(null)
        setShowForm(false)
    }

    // Not logged in
    if (!user) {
        return (
            <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
                <Header />
                <main style={{ maxWidth: '500px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '3rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👥</div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#1e293b' }}>
                            로그인이 필요합니다
                        </h2>
                        <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>
                            고객을 관리하려면<br />Google 계정으로 로그인하세요.
                        </p>
                        <button
                            onClick={loginWithGoogle}
                            style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                                width: '100%', padding: '0.875rem', background: 'white', border: '1px solid #e2e8f0',
                                borderRadius: '10px', fontSize: '1rem', fontWeight: '500', cursor: 'pointer'
                            }}
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" style={{ width: 20, height: 20 }} />
                            Google로 로그인
                        </button>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
            <Header user={user} onLogout={logout} />

            <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
                {/* Title & Add Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>
                        👥 고객 관리
                    </h1>
                    <button
                        onClick={() => setShowForm(true)}
                        style={{
                            padding: '0.6rem 1.25rem', background: '#2563eb', color: 'white',
                            border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
                        }}
                    >
                        + 고객 추가
                    </button>
                </div>

                {/* Add/Edit Form Modal */}
                {showForm && (
                    <div style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 1000, padding: '1rem'
                    }}>
                        <div style={{
                            background: 'white', borderRadius: '16px', padding: '2rem',
                            width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto'
                        }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#1e293b' }}>
                                {editingId ? '고객 수정' : '새 고객 추가'}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#64748b' }}>
                                            고객명 *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                            placeholder="홍길동"
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#64748b' }}>
                                            회사명
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                            placeholder="(주)길동상사"
                                        />
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#64748b' }}>
                                                전화번호
                                            </label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                                placeholder="010-1234-5678"
                                            />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#64748b' }}>
                                                이메일
                                            </label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                                placeholder="email@example.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#64748b' }}>
                                            주소
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                                            placeholder="서울시 강남구..."
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem', color: '#64748b' }}>
                                            메모
                                        </label>
                                        <textarea
                                            value={formData.notes}
                                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '8px', minHeight: '80px', resize: 'vertical' }}
                                            placeholder="고객 관련 메모..."
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        style={{
                                            flex: 1, padding: '0.75rem', background: '#f1f5f9', color: '#64748b',
                                            border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
                                        }}
                                    >
                                        취소
                                    </button>
                                    <button
                                        type="submit"
                                        style={{
                                            flex: 1, padding: '0.75rem', background: '#2563eb', color: 'white',
                                            border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
                                        }}
                                    >
                                        {editingId ? '수정' : '추가'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Customer List */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>로딩 중...</div>
                ) : customers.length === 0 ? (
                    <div style={{
                        background: 'white', borderRadius: '12px', padding: '3rem',
                        textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                            등록된 고객이 없습니다
                        </h3>
                        <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
                            고객을 추가하여 견적서 작성 시 빠르게 선택하세요.
                        </p>
                        <button
                            onClick={() => setShowForm(true)}
                            style={{
                                padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white',
                                border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'
                            }}
                        >
                            + 첫 고객 추가하기
                        </button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {customers.map(customer => (
                            <div
                                key={customer.id}
                                style={{
                                    background: 'white', borderRadius: '12px', padding: '1.25rem',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex',
                                    justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'
                                }}
                            >
                                <div style={{ flex: 1, minWidth: '200px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                        <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '1rem' }}>
                                            {customer.name}
                                        </span>
                                        {customer.company && (
                                            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                                ({customer.company})
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#64748b' }}>
                                        {customer.phone && <span>📞 {customer.phone}</span>}
                                        {customer.email && <span>✉️ {customer.email}</span>}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => handleEdit(customer)}
                                        style={{
                                            padding: '0.5rem 1rem', background: '#f1f5f9', color: '#64748b',
                                            border: 'none', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer'
                                        }}
                                    >
                                        수정
                                    </button>
                                    <button
                                        onClick={() => handleDelete(customer.id)}
                                        style={{
                                            padding: '0.5rem 1rem', background: '#fee2e2', color: '#dc2626',
                                            border: 'none', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer'
                                        }}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

function Header({ user, onLogout }) {
    return (
        <header style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 2rem' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                        width: 36, height: 36,
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 'bold', fontSize: '18px'
                    }}>B</div>
                    <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>바로견적</span>
                </Link>
                <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Link to="/app" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem' }}>새 견적서</Link>
                    <Link to="/my" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem' }}>내 견적서</Link>
                    <Link to="/customers" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '600', fontSize: '0.9rem' }}>고객 관리</Link>
                    {user && (
                        <button
                            onClick={onLogout}
                            style={{
                                padding: '0.5rem 1rem', background: '#f1f5f9', color: '#64748b',
                                border: 'none', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer'
                            }}
                        >
                            로그아웃
                        </button>
                    )}
                </nav>
            </div>
        </header>
    )
}
