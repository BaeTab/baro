import { useState } from 'react'
import { Link } from 'react-router-dom'
import InputPanel from './InputPanel'
import PreviewPanel from './PreviewPanel'
import { translations } from '../translations'
import { useAuth } from '../contexts/AuthContext'
import { saveEstimate, saveTemplate } from '../services/firestoreService'

export default function Dashboard() {
    const { user, loginWithGoogle } = useAuth()
    const [lang, setLang] = useState('ko')
    const t = translations[lang]
    const [saving, setSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState('')

    const [data, setData] = useState({
        docType: 'QUOTE',
        supplier: {
            name: '',
            regNum: '',
            owner: '',
            address: '',
            bizType: '',
            bizItem: ''
        },
        customer: '',
        items: [],
        taxRate: 0.1,
        isTaxIncluded: false,
        date: new Date().toISOString().split('T')[0],
        stampImage: null,
        notes: ''
    })

    const calculateTotals = () => {
        let subtotal = data.items.reduce((sum, item) => sum + (item.qty * item.unitPrice), 0)
        let tax = 0
        let grandTotal = 0

        if (data.isTaxIncluded) {
            grandTotal = subtotal
            subtotal = Math.round(grandTotal / 1.1)
            tax = grandTotal - subtotal
        } else {
            tax = Math.round(subtotal * data.taxRate)
            grandTotal = subtotal + tax
        }
        return { subtotal, tax, grandTotal }
    }

    const handleSaveEstimate = async () => {
        if (!user) {
            try {
                await loginWithGoogle()
            } catch (error) {
                return
            }
        }

        if (!user) return

        try {
            setSaving(true)
            const { subtotal, tax, grandTotal } = calculateTotals()
            await saveEstimate(user.uid, {
                ...data,
                subtotal,
                tax,
                grandTotal,
                stampImage: null // 이미지는 저장하지 않음
            })
            setSaveMessage('✅ 저장되었습니다!')
            setTimeout(() => setSaveMessage(''), 3000)
        } catch (error) {
            console.error('Save error:', error)
            setSaveMessage('❌ 저장 실패')
        } finally {
            setSaving(false)
        }
    }

    const handleSaveTemplate = async () => {
        if (!user) {
            try {
                await loginWithGoogle()
            } catch (error) {
                return
            }
        }

        if (!user) return

        const templateName = window.prompt('템플릿 이름을 입력하세요:', data.supplier.name || '새 템플릿')
        if (!templateName) return

        try {
            setSaving(true)
            await saveTemplate(user.uid, {
                name: templateName,
                supplier: data.supplier,
                items: data.items,
                notes: data.notes
            })
            setSaveMessage('✅ 템플릿 저장됨!')
            setTimeout(() => setSaveMessage(''), 3000)
        } catch (error) {
            console.error('Template save error:', error)
            setSaveMessage('❌ 저장 실패')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-page)' }}>
            <header className="dashboard-header" style={{
                padding: '0.75rem 1rem',
                background: 'white',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.5rem'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                        width: 36,
                        height: 36,
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '18px'
                    }}>B</div>
                    <div>
                        <h1 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>{t.appTitle}</h1>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.appSubtitle}</div>
                    </div>
                </Link>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    {/* Save Buttons */}
                    <button
                        onClick={handleSaveEstimate}
                        disabled={saving}
                        style={{
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.8rem',
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        💾 저장
                    </button>
                    <button
                        onClick={handleSaveTemplate}
                        disabled={saving}
                        style={{
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.8rem',
                            background: '#f1f5f9',
                            color: '#64748b',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        📋 템플릿
                    </button>

                    {/* My Estimates Link */}
                    <Link
                        to="/my"
                        style={{
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.8rem',
                            background: '#f1f5f9',
                            color: '#64748b',
                            border: 'none',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                    >
                        📂 내 견적서
                    </Link>

                    {/* User/Login */}
                    {user ? (
                        <img
                            src={user.photoURL || 'https://via.placeholder.com/32'}
                            alt="Profile"
                            style={{ width: 32, height: 32, borderRadius: '50%' }}
                            title={user.displayName}
                        />
                    ) : (
                        <button
                            onClick={loginWithGoogle}
                            style={{
                                padding: '0.4rem 0.75rem',
                                fontSize: '0.8rem',
                                background: 'white',
                                color: '#64748b',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            로그인
                        </button>
                    )}

                    {/* Language Toggle */}
                    <div style={{ display: 'flex', gap: '0.25rem', marginLeft: '0.5rem' }}>
                        <button
                            onClick={() => setLang('ko')}
                            style={{
                                padding: '0.35rem 0.5rem',
                                fontSize: '0.75rem',
                                background: lang === 'ko' ? '#2563eb' : '#f1f5f9',
                                color: lang === 'ko' ? 'white' : '#64748b',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            한
                        </button>
                        <button
                            onClick={() => setLang('en')}
                            style={{
                                padding: '0.35rem 0.5rem',
                                fontSize: '0.75rem',
                                background: lang === 'en' ? '#2563eb' : '#f1f5f9',
                                color: lang === 'en' ? 'white' : '#64748b',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            EN
                        </button>
                    </div>
                </div>
            </header>

            {/* Save Message Toast */}
            {saveMessage && (
                <div style={{
                    position: 'fixed',
                    top: '80px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#1e293b',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    zIndex: 1000,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                }}>
                    {saveMessage}
                </div>
            )}

            {/* Mobile Tab Toggle */}
            <div className="mobile-tabs" style={{
                display: 'none',
                background: 'white',
                borderBottom: '1px solid var(--border)',
                padding: '0.5rem'
            }}>
                <style>{`
                    @media (max-width: 768px) {
                        .mobile-tabs { display: flex !important; gap: 0.5rem; }
                        .mobile-input-panel { display: block !important; }
                        .mobile-preview-panel { display: none !important; }
                        .mobile-tabs.show-preview .mobile-input-panel { display: none !important; }
                        .mobile-tabs.show-preview + main .mobile-input-panel { display: none !important; }
                        .mobile-tabs.show-preview + main .mobile-preview-panel { display: block !important; }
                    }
                `}</style>
            </div>

            <main className="dashboard-grid" style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: 'minmax(320px, 28%) 1fr',
                overflow: 'hidden'
            }}>
                <style>{`
                    @media (max-width: 768px) {
                        .dashboard-grid {
                            grid-template-columns: 1fr !important;
                        }
                        .dashboard-input {
                            max-height: 50vh;
                        }
                        .dashboard-preview {
                            padding: 0.5rem !important;
                        }
                    }
                `}</style>
                <div className="dashboard-input" style={{ overflowY: 'auto', padding: '1.25rem', borderRight: '1px solid var(--border)', background: 'white' }}>
                    <InputPanel data={data} setData={setData} t={t} />
                </div>
                <div className="dashboard-preview" style={{ overflowY: 'auto', padding: '2rem', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <PreviewPanel data={data} t={t} />
                </div>
            </main>
        </div>
    )
}

