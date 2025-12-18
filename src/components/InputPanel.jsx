import { useState, useEffect } from 'react'
import { getAllLayouts, getAllColors } from '../data/designTemplates'
import { useAuth } from '../contexts/AuthContext'
import { getCustomers, getSavedItems, saveItem, getUserProfile, saveUserProfile } from '../services/firestoreService'

export default function InputPanel({ data, setData, t }) {
    const { user, loginWithGoogle } = useAuth()
    const layouts = getAllLayouts()
    const colors = getAllColors()

    // Customer & Items state
    const [customers, setCustomers] = useState([])
    const [savedItems, setSavedItems] = useState([])
    const [showCustomerDropdown, setShowCustomerDropdown] = useState(false)
    const [itemSuggestions, setItemSuggestions] = useState({})
    const [savingSupplier, setSavingSupplier] = useState(false)
    const [supplierSaved, setSupplierSaved] = useState(false)

    // Load customers, saved items, and user profile when user logs in
    useEffect(() => {
        if (user) {
            loadUserData()
        }
    }, [user])

    const loadUserData = async () => {
        try {
            const [customerList, itemList, profile] = await Promise.all([
                getCustomers(user.uid),
                getSavedItems(user.uid),
                getUserProfile(user.uid)
            ])
            setCustomers(customerList)
            setSavedItems(itemList)

            // Auto-fill supplier info and stamp from saved profile
            if (profile) {
                setData(prev => ({
                    ...prev,
                    supplier: profile.supplier || prev.supplier,
                    stampImage: profile.stampImage || prev.stampImage
                }))
            }
        } catch (error) {
            console.error('Failed to load user data:', error)
        }
    }

    // Save supplier info + stamp image
    const handleSaveSupplier = async () => {
        if (!user || !data.supplier.name) return
        setSavingSupplier(true)
        try {
            // Save supplier info and stamp together
            await saveUserProfile(user.uid, {
                supplier: data.supplier,
                stampImage: data.stampImage || null  // Base64 string
            })
            setSupplierSaved(true)
            setTimeout(() => setSupplierSaved(false), 2000)
        } catch (error) {
            console.error('Failed to save supplier:', error)
        }
        setSavingSupplier(false)
    }

    // Filter items for suggestions based on input
    const getItemSuggestions = (inputValue, itemIndex) => {
        if (!inputValue || inputValue.length < 1) return []
        const lowerInput = inputValue.toLowerCase()
        return savedItems.filter(item =>
            item.name.toLowerCase().includes(lowerInput)
        ).slice(0, 5)
    }

    // Handle selecting a saved item
    const handleSelectSavedItem = (savedItem, idx) => {
        const newItems = [...data.items]
        newItems[idx].name = savedItem.name
        newItems[idx].unitPrice = savedItem.unitPrice
        setData({ ...data, items: newItems })
        setItemSuggestions(prev => ({ ...prev, [idx]: [] }))
    }

    // Handle saving a new item
    const handleSaveNewItem = async (item) => {
        if (!user || !item.name) return
        try {
            await saveItem(user.uid, item)
            await loadUserData() // Refresh the list
        } catch (error) {
            console.error('Failed to save item:', error)
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const img = new Image()
                img.onload = () => {
                    const canvas = document.createElement('canvas')
                    const MAX_WIDTH = 200 // 직인에는 200px 정도면 충분
                    const MAX_HEIGHT = 200
                    let width = img.width
                    let height = img.height

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width
                            width = MAX_WIDTH
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height
                            height = MAX_HEIGHT
                        }
                    }

                    canvas.width = width
                    canvas.height = height
                    const ctx = canvas.getContext('2d')
                    ctx.drawImage(img, 0, 0, width, height)

                    // Compress to PNG
                    const dataUrl = canvas.toDataURL('image/png', 0.8)
                    setData(prev => ({ ...prev, stampImage: dataUrl }))
                }
                img.src = event.target.result
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Settings */}
            <div className="card">
                <label className="label">{t.docSettings}</label>
                <div className="flex gap-2 mb-2">
                    <button
                        className={`btn w-full ${data.docType === 'QUOTE' ? 'btn-primary' : 'input-field'}`}
                        onClick={() => setData({ ...data, docType: 'QUOTE' })}
                    >
                        {t.quote}
                    </button>
                    <button
                        className={`btn w-full ${data.docType === 'RECEIPT' ? 'btn-primary' : 'input-field'}`}
                        onClick={() => setData({ ...data, docType: 'RECEIPT' })}
                    >
                        {t.receipt}
                    </button>
                </div>
                <div className="flex items-center gap-2 mb-3">
                    <input
                        type="checkbox"
                        id="taxInclude"
                        checked={data.isTaxIncluded}
                        onChange={(e) => setData({ ...data, isTaxIncluded: e.target.checked })}
                    />
                    <label htmlFor="taxInclude" style={{ fontSize: '0.9rem' }}>{t.taxIncluded}</label>
                </div>

                {/* Date Picker */}
                <div className="flex items-center gap-2 mb-3">
                    <label style={{ fontSize: '0.9rem', minWidth: '60px' }}>📅 {t.date}</label>
                    <input
                        type="date"
                        className="input-field"
                        value={data.date}
                        onChange={(e) => setData({ ...data, date: e.target.value })}
                        style={{ flex: 1 }}
                    />
                </div>
                <div style={{ position: 'relative' }}>
                    {/* Blur overlay for non-logged-in users */}
                    {!user && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'rgba(255,255,255,0.8)',
                            backdropFilter: 'blur(4px)',
                            zIndex: 10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '8px',
                            gap: '0.5rem'
                        }}>
                            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>
                                🔒 디자인 커스터마이징
                            </span>
                            <button
                                onClick={loginWithGoogle}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 8px rgba(37,99,235,0.3)'
                                }}
                            >
                                로그인하여 사용
                            </button>
                        </div>
                    )}

                    {/* Layout Style Selector */}
                    <label className="label" style={{ marginTop: '0.5rem' }}>📐 레이아웃</label>
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        marginBottom: '1rem'
                    }}>
                        {layouts.map(layout => (
                            <button
                                key={layout.id}
                                onClick={() => user && setData({ ...data, layout: layout.id })}
                                disabled={!user}
                                style={{
                                    padding: '0.4rem 0.75rem',
                                    border: data.layout === layout.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                                    borderRadius: layout.borderRadius,
                                    background: data.layout === layout.id ? '#eff6ff' : 'white',
                                    cursor: user ? 'pointer' : 'not-allowed',
                                    fontSize: '0.75rem',
                                    fontWeight: '600',
                                    color: data.layout === layout.id ? '#2563eb' : '#64748b',
                                    transition: 'all 0.2s',
                                    opacity: user ? 1 : 0.6
                                }}
                            >
                                {layout.name}
                            </button>
                        ))}
                    </div>

                    {/* Color Scheme Selector */}
                    <label className="label">🎨 색상</label>
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap'
                    }}>
                        {colors.map(color => (
                            <button
                                key={color.id}
                                onClick={() => user && setData({ ...data, colorScheme: color.id })}
                                disabled={!user}
                                title={color.name}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: color.preview,
                                    border: data.colorScheme === color.id ? '3px solid #1e293b' : '2px solid #e2e8f0',
                                    cursor: user ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.2s',
                                    boxShadow: data.colorScheme === color.id ? '0 0 0 2px white, 0 0 0 4px ' + color.preview : 'none',
                                    opacity: user ? 1 : 0.6
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Supplier */}
            <div className="card">
                <label className="label">{t.supplierInfo}</label>
                <div className="flex flex-col gap-2">
                    <input
                        className="input-field" placeholder={t.bizName}
                        value={data.supplier.name}
                        onChange={(e) => setData({ ...data, supplier: { ...data.supplier, name: e.target.value } })}
                    />
                    <input
                        className="input-field" placeholder={t.ownerName}
                        value={data.supplier.owner}
                        onChange={(e) => setData({ ...data, supplier: { ...data.supplier, owner: e.target.value } })}
                    />
                    <input
                        className="input-field" placeholder={t.regNum}
                        value={data.supplier.regNum}
                        onChange={(e) => setData({ ...data, supplier: { ...data.supplier, regNum: e.target.value } })}
                    />
                    <input
                        className="input-field" placeholder={t.address}
                        value={data.supplier.address}
                        onChange={(e) => setData({ ...data, supplier: { ...data.supplier, address: e.target.value } })}
                    />
                    {/* Optional contact info */}
                    <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px', marginBottom: '4px' }}>
                        📞 연락처 (선택)
                    </div>
                    <div className="flex gap-2">
                        <input
                            className="input-field" placeholder="전화번호"
                            value={data.supplier.phone || ''}
                            onChange={(e) => setData({ ...data, supplier: { ...data.supplier, phone: e.target.value } })}
                            style={{ flex: 1 }}
                        />
                        <input
                            className="input-field" placeholder="팩스"
                            value={data.supplier.fax || ''}
                            onChange={(e) => setData({ ...data, supplier: { ...data.supplier, fax: e.target.value } })}
                            style={{ flex: 1 }}
                        />
                    </div>
                    <input
                        className="input-field" placeholder="이메일"
                        value={data.supplier.email || ''}
                        onChange={(e) => setData({ ...data, supplier: { ...data.supplier, email: e.target.value } })}
                    />

                    {/* Stamp Input */}
                    <div style={{ marginTop: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                        <label className="label" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>{t.stamp}</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="file"
                                accept="image/png"
                                onChange={handleFileChange}
                                className="input-field"
                                style={{ fontSize: '0.8rem' }}
                            />
                            {data.stampImage && (
                                <div style={{ fontSize: '0.75rem', color: '#10b981', whiteSpace: 'nowrap' }}>
                                    ✓ 등록됨
                                </div>
                            )}
                        </div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                            {t.stampDesc}
                        </p>
                    </div>
                </div>
                {/* Save supplier button for logged-in users */}
                {user && (
                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                            onClick={handleSaveSupplier}
                            disabled={savingSupplier || !data.supplier.name}
                            style={{
                                padding: '6px 12px',
                                fontSize: '0.8rem',
                                background: supplierSaved ? '#10b981' : '#2563eb',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: savingSupplier || !data.supplier.name ? 'not-allowed' : 'pointer',
                                opacity: savingSupplier || !data.supplier.name ? 0.6 : 1,
                                fontWeight: '500'
                            }}
                        >
                            {savingSupplier ? '저장 중...' : supplierSaved ? '✓ 저장됨' : '💾 공급자 정보 + 직인 저장'}
                        </button>
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                            다음 로그인 시 자동 입력됩니다 (직인 포함)
                        </span>
                    </div>
                )}
            </div>

            {/* Customer */}
            <div className="card">
                <label className="label">{t.customerInfo}</label>
                <div style={{ position: 'relative' }}>
                    <input
                        className="input-field"
                        placeholder={t.customerName}
                        value={data.customer}
                        onChange={(e) => setData({ ...data, customer: e.target.value })}
                        onFocus={() => user && customers.length > 0 && setShowCustomerDropdown(true)}
                    />
                    {/* Customer Dropdown */}
                    {user && showCustomerDropdown && customers.length > 0 && (
                        <>
                            <div
                                onClick={() => setShowCustomerDropdown(false)}
                                style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9 }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                right: 0,
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '6px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                maxHeight: '200px',
                                overflowY: 'auto',
                                zIndex: 10
                            }}>
                                {customers.map(customer => (
                                    <div
                                        key={customer.id}
                                        onClick={() => {
                                            setData({ ...data, customer: customer.name })
                                            setShowCustomerDropdown(false)
                                        }}
                                        style={{
                                            padding: '10px 12px',
                                            cursor: 'pointer',
                                            borderBottom: '1px solid #f1f5f9',
                                            fontSize: '0.9rem'
                                        }}
                                        onMouseOver={(e) => e.target.style.background = '#f8fafc'}
                                        onMouseOut={(e) => e.target.style.background = 'white'}
                                    >
                                        <div style={{ fontWeight: '500' }}>{customer.name}</div>
                                        {customer.phone && (
                                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{customer.phone}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                {user && customers.length > 0 && (
                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px' }}>
                        💡 입력창을 클릭하면 저장된 고객 목록이 표시됩니다
                    </div>
                )}
            </div>

            {/* Items */}
            <div className="card">
                <div className="flex justify-between items-center mb-2">
                    <label className="label">{t.items}</label>
                    <button
                        className="btn" style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', border: '1px solid var(--border)' }}
                        onClick={() => setData({
                            ...data,
                            items: [...data.items, { id: Date.now(), name: '', qty: 1, unitPrice: 0 }]
                        })}
                    >
                        {t.addItem}
                    </button>
                </div>
                {user && savedItems.length > 0 && (
                    <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '8px' }}>
                        💡 품목명 입력 시 저장된 품목이 자동완성됩니다
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    {data.items.map((item, idx) => (
                        <div key={item.id} style={{ position: 'relative' }}>
                            <div className="flex gap-2 items-center">
                                <input
                                    className="input-field" style={{ flex: 2 }} placeholder={t.itemName}
                                    value={item.name}
                                    onChange={(e) => {
                                        const newItems = [...data.items]
                                        newItems[idx].name = e.target.value
                                        setData({ ...data, items: newItems })
                                        // Show suggestions
                                        if (user && e.target.value) {
                                            const suggestions = getItemSuggestions(e.target.value)
                                            setItemSuggestions(prev => ({ ...prev, [idx]: suggestions }))
                                        } else {
                                            setItemSuggestions(prev => ({ ...prev, [idx]: [] }))
                                        }
                                    }}
                                    onBlur={() => {
                                        // Hide suggestions after a delay (to allow click)
                                        setTimeout(() => {
                                            setItemSuggestions(prev => ({ ...prev, [idx]: [] }))
                                        }, 200)
                                    }}
                                />
                                <input
                                    className="input-field" style={{ flex: 1 }} type="number" placeholder={t.qty}
                                    value={item.qty}
                                    onChange={(e) => {
                                        const newItems = [...data.items]
                                        newItems[idx].qty = parseInt(e.target.value) || 0
                                        newItems[idx].total = newItems[idx].qty * newItems[idx].unitPrice
                                        setData({ ...data, items: newItems })
                                    }}
                                />
                                <input
                                    className="input-field" style={{ flex: 1.5 }} type="number" placeholder={t.price}
                                    value={item.unitPrice}
                                    onChange={(e) => {
                                        const newItems = [...data.items]
                                        newItems[idx].unitPrice = parseInt(e.target.value) || 0
                                        newItems[idx].total = newItems[idx].qty * newItems[idx].unitPrice
                                        setData({ ...data, items: newItems })
                                    }}
                                />
                                {/* Save item button */}
                                {user && item.name && !savedItems.some(s => s.name === item.name) && (
                                    <button
                                        title="품목 저장"
                                        onClick={() => handleSaveNewItem(item)}
                                        style={{
                                            color: '#10b981',
                                            fontSize: '1rem',
                                            padding: '2px 6px',
                                            border: '1px solid #10b981',
                                            borderRadius: '4px',
                                            background: 'white'
                                        }}
                                    >
                                        💾
                                    </button>
                                )}
                                <button
                                    style={{ color: 'red', fontSize: '1.2rem' }}
                                    onClick={() => {
                                        const newItems = data.items.filter((_, i) => i !== idx)
                                        setData({ ...data, items: newItems })
                                    }}
                                >
                                    ×
                                </button>
                            </div>
                            {/* Item suggestions dropdown */}
                            {itemSuggestions[idx] && itemSuggestions[idx].length > 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    width: '60%',
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '6px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                    zIndex: 20,
                                    marginTop: '2px'
                                }}>
                                    {itemSuggestions[idx].map(savedItem => (
                                        <div
                                            key={savedItem.id}
                                            onClick={() => handleSelectSavedItem(savedItem, idx)}
                                            style={{
                                                padding: '8px 12px',
                                                cursor: 'pointer',
                                                borderBottom: '1px solid #f1f5f9',
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                justifyContent: 'space-between'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'}
                                            onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                                        >
                                            <span>{savedItem.name}</span>
                                            <span style={{ color: '#64748b' }}>₩{savedItem.unitPrice?.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>



            {/* Notes / Bank Account */}
            <div className="card">
                <label className="label">{t.notes}</label>
                <textarea
                    className="input-field"
                    rows={3}
                    placeholder={t.notesPlaceholder || "입금계좌: 은행명 000-000-0000 예금주\n유효기간: 발행일로부터 30일"}
                    value={data.notes || ''}
                    onChange={(e) => setData({ ...data, notes: e.target.value })}
                    style={{ resize: 'vertical' }}
                />
            </div>

        </div >
    )
}
