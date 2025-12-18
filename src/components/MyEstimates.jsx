import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getEstimates, deleteEstimate, getTemplates, deleteTemplate } from '../services/firestoreService'

export default function MyEstimates() {
    const { user, loginWithGoogle, logout } = useAuth()
    const [estimates, setEstimates] = useState([])
    const [templates, setTemplates] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('estimates')

    useEffect(() => {
        if (user) {
            loadData()
        } else {
            setLoading(false)
        }
    }, [user])

    const loadData = async () => {
        try {
            setLoading(true)
            const [estimatesData, templatesData] = await Promise.all([
                getEstimates(user.uid),
                getTemplates(user.uid)
            ])
            setEstimates(estimatesData)
            setTemplates(templatesData)
        } catch (error) {
            console.error('Error loading data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteEstimate = async (id) => {
        if (window.confirm('이 견적서를 삭제하시겠습니까?')) {
            await deleteEstimate(user.uid, id)
            setEstimates(estimates.filter(e => e.id !== id))
        }
    }

    const handleDeleteTemplate = async (id) => {
        if (window.confirm('이 템플릿을 삭제하시겠습니까?')) {
            await deleteTemplate(user.uid, id)
            setTemplates(templates.filter(t => t.id !== id))
        }
    }

    const formatDate = (timestamp) => {
        if (!timestamp) return '-'
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
        return date.toLocaleDateString('ko-KR')
    }

    const formatCurrency = (amount) => {
        return (amount || 0).toLocaleString() + '원'
    }

    // Not logged in
    if (!user) {
        return (
            <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
                <Header />
                <main style={{
                    maxWidth: '500px',
                    margin: '0 auto',
                    padding: '4rem 2rem',
                    textAlign: 'center'
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '16px',
                        padding: '3rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#1e293b' }}>
                            로그인이 필요합니다
                        </h2>
                        <p style={{ color: '#64748b', marginBottom: '2rem', lineHeight: '1.6' }}>
                            견적서를 저장하고 관리하려면<br />Google 계정으로 로그인하세요.
                        </p>
                        <button
                            onClick={loginWithGoogle}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.75rem',
                                width: '100%',
                                padding: '0.875rem',
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
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
                {/* User Info */}
                <div style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <img
                        src={user.photoURL || 'https://via.placeholder.com/48'}
                        alt="Profile"
                        style={{ width: 48, height: 48, borderRadius: '50%' }}
                    />
                    <div>
                        <div style={{ fontWeight: '600', color: '#1e293b' }}>{user.displayName}</div>
                        <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{user.email}</div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <button
                        onClick={() => setActiveTab('estimates')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: activeTab === 'estimates' ? '#2563eb' : 'white',
                            color: activeTab === 'estimates' ? 'white' : '#64748b',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        📄 내 견적서 ({estimates.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('templates')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: activeTab === 'templates' ? '#2563eb' : 'white',
                            color: activeTab === 'templates' ? 'white' : '#64748b',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        📋 템플릿 ({templates.length})
                    </button>
                </div>

                {/* Content */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
                        로딩 중...
                    </div>
                ) : activeTab === 'estimates' ? (
                    <div>
                        {estimates.length === 0 ? (
                            <EmptyState
                                icon="📄"
                                title="저장된 견적서가 없습니다"
                                description="새 견적서를 작성하고 저장해보세요."
                                actionLabel="새 견적서 만들기"
                                actionLink="/app"
                            />
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {estimates.map(estimate => (
                                    <div
                                        key={estimate.id}
                                        style={{
                                            background: 'white',
                                            borderRadius: '12px',
                                            padding: '1.25rem',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                                <span style={{
                                                    background: estimate.docType === 'QUOTE' ? '#dbeafe' : '#dcfce7',
                                                    color: estimate.docType === 'QUOTE' ? '#2563eb' : '#16a34a',
                                                    padding: '0.2rem 0.5rem',
                                                    borderRadius: '4px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600'
                                                }}>
                                                    {estimate.docType === 'QUOTE' ? '견적서' : '영수증'}
                                                </span>
                                                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                                    {formatDate(estimate.createdAt)}
                                                </span>
                                            </div>
                                            <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                                                {estimate.customer || '(고객명 없음)'}
                                            </div>
                                            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                                                {formatCurrency(estimate.grandTotal)}
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleDeleteEstimate(estimate.id)}
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    background: '#fee2e2',
                                                    color: '#dc2626',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    fontSize: '0.8rem',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {templates.length === 0 ? (
                            <EmptyState
                                icon="📋"
                                title="저장된 템플릿이 없습니다"
                                description="자주 사용하는 품목을 템플릿으로 저장하세요."
                            />
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {templates.map(template => (
                                    <div
                                        key={template.id}
                                        style={{
                                            background: 'white',
                                            borderRadius: '12px',
                                            padding: '1.25rem',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#1e293b' }}>
                                                {template.name || '(이름 없음)'}
                                            </div>
                                            <div style={{ fontSize: '0.9rem', color: '#64748b' }}>
                                                품목 {template.items?.length || 0}개
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteTemplate(template.id)}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: '#fee2e2',
                                                color: '#dc2626',
                                                border: 'none',
                                                borderRadius: '6px',
                                                fontSize: '0.8rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}

function Header({ user, onLogout }) {
    return (
        <header style={{
            background: 'white',
            borderBottom: '1px solid #e2e8f0',
            padding: '1rem 2rem'
        }}>
            <div style={{
                maxWidth: '1000px',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
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
                    <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>바로견적</span>
                </Link>
                <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <Link to="/app" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem' }}>새 견적서</Link>
                    <Link to="/my" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '600', fontSize: '0.9rem' }}>내 견적서</Link>
                    {user && (
                        <button
                            onClick={onLogout}
                            style={{
                                padding: '0.5rem 1rem',
                                background: '#f1f5f9',
                                color: '#64748b',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '0.85rem',
                                cursor: 'pointer'
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

function EmptyState({ icon, title, description, actionLabel, actionLink }) {
    return (
        <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '3rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                {title}
            </h3>
            <p style={{ color: '#64748b', marginBottom: actionLabel ? '1.5rem' : 0 }}>
                {description}
            </p>
            {actionLabel && (
                <Link
                    to={actionLink}
                    style={{
                        display: 'inline-block',
                        padding: '0.75rem 1.5rem',
                        background: '#2563eb',
                        color: 'white',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600'
                    }}
                >
                    {actionLabel}
                </Link>
            )}
        </div>
    )
}
