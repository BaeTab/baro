import { useState, useEffect } from 'react'

export default function InputPanel({ data, setData, t }) {
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setData(prev => ({ ...prev, stampImage: reader.result }))
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
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="taxInclude"
                        checked={data.isTaxIncluded}
                        onChange={(e) => setData({ ...data, isTaxIncluded: e.target.checked })}
                    />
                    <label htmlFor="taxInclude" style={{ fontSize: '0.9rem' }}>{t.taxIncluded}</label>
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
                </div>
            </div>

            {/* Customer */}
            <div className="card">
                <label className="label">{t.customerInfo}</label>
                <input
                    className="input-field" placeholder={t.customerName}
                    value={data.customer}
                    onChange={(e) => setData({ ...data, customer: e.target.value })}
                />
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
                <div className="flex flex-col gap-2">
                    {data.items.map((item, idx) => (
                        <div key={item.id} className="flex gap-2 items-center">
                            <input
                                className="input-field" style={{ flex: 2 }} placeholder={t.itemName}
                                value={item.name}
                                onChange={(e) => {
                                    const newItems = [...data.items]
                                    newItems[idx].name = e.target.value
                                    setData({ ...data, items: newItems })
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
                    ))}
                </div>
            </div>

            {/* Stamp */}
            <div className="card">
                <label className="label">{t.stamp}</label>
                <input type="file" accept="image/png" onChange={handleFileChange} className="input-field" />
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    {t.stampDesc}
                </p>
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

        </div>
    )
}
