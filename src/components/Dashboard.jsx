import { useState } from 'react'
import { Link } from 'react-router-dom'
import InputPanel from './InputPanel'
import PreviewPanel from './PreviewPanel'
import { translations } from '../translations'
import { useAuth } from '../contexts/AuthContext'
import { saveEstimate, saveTemplate } from '../services/firestoreService'

export default function Dashboard() {
    const { user, loginWithGoogle, logout } = useAuth()
    const [lang, setLang] = useState('ko')
    const t = translations[lang]
    const [saving, setSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState('')
    const [showMobilePreview, setShowMobilePreview] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false)

    const [data, setData] = useState({
        docType: 'QUOTE',
        layout: 'classic',
        colorScheme: 'blue',
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
                    <div className="header-title" style={{ display: 'block' }}>
                        <h1 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '700' }}>{t.appTitle}</h1>
                        <div className="header-subtitle" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.appSubtitle}</div>
                    </div>
                </Link>
                <div className="header-actions" style={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                    overflowX: 'auto',
                    flexShrink: 0
                }}>
                    <style>{`
                        @media (max-width: 768px) {
                            .header-title { display: none !important; }
                            .header-actions { gap: 0.25rem !important; }
                            .header-btn { 
                                padding: 0.3rem 0.5rem !important; 
                                font-size: 0.7rem !important;
                            }
                        }
                    `}</style>
                    {/* Save Buttons */}
                    <button
                        className="header-btn"
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
                            fontWeight: '500',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        💾 저장
                    </button>
                    <button
                        className="header-btn"
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
                            fontWeight: '500',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        📋
                    </button>

                    {/* My Estimates Link */}
                    <Link
                        className="header-btn"
                        to="/my"
                        style={{
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.8rem',
                            background: '#f1f5f9',
                            color: '#64748b',
                            border: 'none',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: '500',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        📂
                    </Link>

                    {/* Customers Link */}
                    <Link
                        className="header-btn"
                        to="/customers"
                        style={{
                            padding: '0.4rem 0.75rem',
                            fontSize: '0.8rem',
                            background: '#f1f5f9',
                            color: '#64748b',
                            border: 'none',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: '500',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        👥
                    </Link>

                    {/* User/Login */}
                    {user ? (
                        <div style={{ position: 'relative' }}>
                            <img
                                src={user.photoURL || 'https://via.placeholder.com/32'}
                                alt="Profile"
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: '50%',
                                    flexShrink: 0,
                                    cursor: 'pointer',
                                    border: showProfileMenu ? '2px solid #2563eb' : '2px solid transparent'
                                }}
                                title={user.displayName}
                            />
                            {/* Profile Dropdown */}
                            {showProfileMenu && (
                                <>
                                    {/* Backdrop to close menu */}
                                    <div
                                        onClick={() => setShowProfileMenu(false)}
                                        style={{
                                            position: 'fixed',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            zIndex: 99
                                        }}
                                    />
                                    <div style={{
                                        position: 'fixed',
                                        top: '60px',
                                        right: '16px',
                                        background: 'white',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                                        border: '1px solid #e2e8f0',
                                        minWidth: '200px',
                                        zIndex: 100,
                                        overflow: 'hidden'
                                    }}>
                                        {/* User Info */}
                                        <div style={{
                                            padding: '12px 16px',
                                            borderBottom: '1px solid #e2e8f0',
                                            background: '#f8fafc'
                                        }}>
                                            <div style={{ fontWeight: '600', fontSize: '0.85rem', color: '#1e293b' }}>
                                                {user.displayName}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                                                {user.email}
                                            </div>
                                        </div>
                                        {/* Logout Button */}
                                        <button
                                            onClick={() => {
                                                logout()
                                                setShowProfileMenu(false)
                                                // Reset data to initial state
                                                setData({
                                                    docType: 'QUOTE',
                                                    layout: 'classic',
                                                    colorScheme: 'blue',
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
                                            }}
                                            style={{
                                                width: '100%',
                                                padding: '10px 16px',
                                                background: 'white',
                                                border: 'none',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                fontSize: '0.85rem',
                                                color: '#dc2626',
                                                fontWeight: '500',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}
                                            onMouseOver={(e) => e.target.style.background = '#fef2f2'}
                                            onMouseOut={(e) => e.target.style.background = 'white'}
                                        >
                                            🚪 로그아웃
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <button
                            className="header-btn"
                            onClick={loginWithGoogle}
                            style={{
                                padding: '0.4rem 0.75rem',
                                fontSize: '0.8rem',
                                background: 'white',
                                color: '#64748b',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            🔐
                        </button>
                    )}

                    {/* Language Toggle */}
                    <div style={{ display: 'flex', gap: '0.15rem', flexShrink: 0 }}>
                        <button
                            onClick={() => setLang('ko')}
                            style={{
                                padding: '0.3rem 0.4rem',
                                fontSize: '0.7rem',
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
                                padding: '0.3rem 0.4rem',
                                fontSize: '0.7rem',
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

            {/* Mobile Preview Modal */}
            {showMobilePreview && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.9)',
                    zIndex: 2000,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    {/* Modal Header */}
                    <div style={{
                        padding: '0.75rem 1rem',
                        background: 'white',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #e2e8f0',
                        flexShrink: 0
                    }}>
                        <div>
                            <span style={{ fontWeight: '700', fontSize: '1rem' }}>📄 미리보기</span>
                            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>좌우로 스크롤하여 전체 보기</div>
                        </div>
                        <button
                            onClick={() => setShowMobilePreview(false)}
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#f1f5f9',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            ✕ 닫기
                        </button>
                    </div>
                    {/* Modal Content - Scrollable both directions */}
                    <div style={{
                        flex: 1,
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        padding: '1rem',
                        background: '#f1f5f9'
                    }}>
                        <div style={{
                            minWidth: 'fit-content',
                            display: 'flex',
                            justifyContent: 'flex-start'
                        }}>
                            <PreviewPanel data={data} t={t} />
                        </div>
                    </div>
                </div>
            )}

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
                        .dashboard-preview-desktop {
                            display: none !important;
                        }
                        .mobile-preview-btn {
                            display: flex !important;
                        }
                    }
                `}</style>
                <div className="dashboard-input" style={{
                    overflowY: 'auto',
                    padding: '1.25rem',
                    borderRight: '1px solid var(--border)',
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <InputPanel data={data} setData={setData} t={t} />

                    {/* Mobile Preview Button - Only visible on mobile */}
                    <button
                        className="mobile-preview-btn"
                        onClick={() => setShowMobilePreview(true)}
                        style={{
                            display: 'none',
                            marginTop: '1.5rem',
                            padding: '1rem',
                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
                        }}
                    >
                        📄 견적서 미리보기 & 다운로드
                    </button>
                </div>
                <div className="dashboard-preview-desktop" style={{
                    overflowY: 'auto',
                    padding: '2rem',
                    background: '#f1f5f9',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start'
                }}>
                    <PreviewPanel data={data} t={t} />
                </div>
            </main>
        </div>
    )
}

