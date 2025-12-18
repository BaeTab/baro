import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { getLayoutById, getColorById } from '../data/designTemplates'

export default function PreviewPanel({ data, t }) {
    const docRef = useRef()
    const [isGenerating, setIsGenerating] = useState(false)

    // Get selected layout and color scheme independently
    const layout = getLayoutById(data.layout || 'classic')
    const colors = getColorById(data.colorScheme || 'blue')


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

    const { subtotal, tax, grandTotal } = calculateTotals()

    const handleDownload = async () => {
        const adConfirmed = window.confirm("PDF를 다운로드하려면 먼저 스폰서 페이지를 방문해주세요.\n확인을 클릭하면 PDF가 생성됩니다.")
        if (adConfirmed) {
            window.open('https://deg.kr/799c1ba', '_blank')

            setIsGenerating(true)
            setTimeout(async () => {
                const element = docRef.current
                const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' })
                const imgData = canvas.toDataURL('image/png')

                const pdf = new jsPDF('p', 'mm', 'a4')
                const pdfWidth = pdf.internal.pageSize.getWidth()
                const pdfHeight = (canvas.height * pdfWidth) / canvas.width

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
                pdf.save(`${data.docType}_${data.customer || 'Draft'}.pdf`)
                setIsGenerating(false)
            }, 1000)
        }
    }

    // Dynamic header style based on layout
    const getHeaderStyle = () => {
        const base = {
            marginBottom: '30px',
            paddingBottom: '20px',
        }
        if (layout.headerStyle === 'center') {
            return { ...base, textAlign: 'center', borderBottom: layout.showDivider ? `3px solid ${colors.secondary}` : 'none' }
        } else if (layout.headerStyle === 'left') {
            return { ...base, textAlign: 'left', borderBottom: layout.showDivider ? `2px solid ${colors.border}` : 'none' }
        }
        // split (default)
        return {
            ...base,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: layout.showDivider ? `3px solid ${colors.secondary}` : 'none'
        }
    }

    const styles = {
        // Wrapper for mobile scaling
        wrapper: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        paper: {
            width: '210mm',
            minWidth: '210mm',
            minHeight: 'auto',
            background: '#ffffff',
            padding: '15mm 20mm',
            position: 'relative',
            boxSizing: 'border-box',
            fontFamily: '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, sans-serif',
            color: colors.text,
            fontSize: '11px',
            lineHeight: '1.6',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            transformOrigin: 'top center'
        },
        header: getHeaderStyle(),
        titleSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
        },
        title: {
            fontSize: layout.titleSize,
            fontWeight: '800',
            color: colors.primary,
            letterSpacing: '0.1em',
            margin: 0
        },
        docMeta: {
            fontSize: '11px',
            color: colors.muted
        },
        infoGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            marginBottom: '24px'
        },
        infoBox: {
            background: layout.infoBoxStyle === 'flat' ? 'transparent' : colors.accent,
            borderRadius: layout.borderRadius,
            padding: '16px 20px',
            border: layout.infoBoxStyle === 'flat' ? 'none' : `1px solid ${colors.border}`
        },
        infoTitle: {
            fontSize: '10px',
            fontWeight: '700',
            color: colors.muted,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '12px',
            paddingBottom: '8px',
            borderBottom: `1px solid ${colors.border}`
        },
        infoName: {
            fontSize: '16px',
            fontWeight: '700',
            color: colors.text,
            marginBottom: '8px'
        },
        infoDetail: {
            fontSize: '11px',
            color: colors.muted,
            lineHeight: '1.8'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '24px',
            borderRadius: layout.borderRadius,
            overflow: 'hidden'
        },
        th: {
            background: colors.headerBg,
            color: colors.headerText,
            padding: '12px 8px',
            fontSize: '10px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textAlign: 'center',
            border: layout.tableStyle === 'bordered' ? `1px solid ${colors.border}` : 'none'
        },
        td: {
            padding: '14px 8px',
            borderBottom: `1px solid ${colors.border}`,
            fontSize: '11px',
            color: colors.text,
            border: layout.tableStyle === 'bordered' ? `1px solid ${colors.border}` : 'none'
        },
        tdAlt: {
            padding: '14px 8px',
            borderBottom: `1px solid ${colors.border}`,
            fontSize: '11px',
            color: colors.text,
            background: layout.tableStyle === 'striped' ? colors.accent : 'transparent',
            border: layout.tableStyle === 'bordered' ? `1px solid ${colors.border}` : 'none'
        },
        summaryContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '32px'
        },
        summaryBox: {
            width: '280px',
            background: colors.accent,
            borderRadius: layout.borderRadius,
            padding: '16px 20px',
            border: `1px solid ${colors.border}`
        },
        summaryRow: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '8px 0',
            fontSize: '12px',
            color: colors.muted
        },
        totalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 0',
            marginTop: '8px',
            borderTop: `2px solid ${colors.primary}`,
            fontSize: '16px',
            fontWeight: '700',
            color: colors.primary
        },
        notesBox: {
            background: colors.accent,
            border: `1px solid ${colors.border}`,
            borderRadius: layout.borderRadius,
            padding: '16px 20px',
            marginBottom: '32px'
        },
        notesTitle: {
            fontSize: '10px',
            fontWeight: '700',
            color: '#92400e',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px'
        },
        notesText: {
            fontSize: '11px',
            color: '#78716c',
            lineHeight: '1.8'
        },
        footer: {
            textAlign: 'center',
            paddingTop: '24px',
            borderTop: '1px solid #e2e8f0'
        },
        greeting: {
            fontSize: '13px',
            fontWeight: '500',
            color: '#475569',
            marginBottom: '8px'
        },
        companyName: {
            fontSize: '10px',
            color: '#94a3b8',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
        },
        stampArea: {
            position: 'absolute',
            right: '40px',
            top: '160px',
            width: '70px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        stampImage: {
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            opacity: 0.9
        },
        stampPlaceholder: {
            width: '100%',
            height: '100%',
            border: '2px dashed #cbd5e1',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            fontSize: '10px'
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', alignItems: 'center' }}>
            {/* Paper Document */}
            <div ref={docRef} style={styles.paper}>

                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.titleSection}>
                        <h1 style={styles.title}>
                            {data.docType === 'QUOTE' ? t.estimateTitle : t.receiptTitle}
                        </h1>
                        <div style={styles.docMeta}>
                            {t.date}: {data.date}
                        </div>
                    </div>
                </div>

                {/* Info Grid */}
                <div style={styles.infoGrid}>
                    {/* Recipient */}
                    <div style={styles.infoBox}>
                        <div style={styles.infoTitle}>{t.recipient}</div>
                        <div style={styles.infoName}>{data.customer || '(미입력)'}</div>
                        <div style={styles.infoDetail}>귀하</div>
                    </div>

                    {/* Supplier */}
                    <div style={{ ...styles.infoBox, position: 'relative' }}>
                        <div style={styles.infoTitle}>{t.supplier}</div>
                        <div style={styles.infoName}>{data.supplier.name || '(미입력)'}</div>
                        <div style={styles.infoDetail}>
                            <div><strong>{t.ownerName}:</strong> {data.supplier.owner}</div>
                            <div><strong>{t.regLabel}:</strong> {data.supplier.regNum}</div>
                            <div><strong>{t.address}:</strong> {data.supplier.address}</div>
                        </div>
                        {/* Stamp */}
                        <div style={{ position: 'absolute', right: '12px', bottom: '12px', width: '60px', height: '60px' }}>
                            {data.stampImage ? (
                                <img src={data.stampImage} alt="Stamp" style={styles.stampImage} />
                            ) : (
                                <div style={styles.stampPlaceholder}>(인)</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={{ ...styles.th, width: '40px', textAlign: 'center', borderRadius: '6px 0 0 0' }}>No</th>
                            <th style={{ ...styles.th, textAlign: 'center' }}>{t.tableItem}</th>
                            <th style={{ ...styles.th, width: '60px', textAlign: 'center' }}>{t.tableQty}</th>
                            <th style={{ ...styles.th, width: '100px', textAlign: 'center' }}>{t.tablePrice}</th>
                            <th style={{ ...styles.th, width: '120px', textAlign: 'center', borderRadius: '0 6px 0 0' }}>{t.tableAmount}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.items.map((item, idx) => (
                            <tr key={item.id}>
                                <td style={{ ...(idx % 2 === 0 ? styles.td : styles.tdAlt), textAlign: 'center' }}>{idx + 1}</td>
                                <td style={{ ...(idx % 2 === 0 ? styles.td : styles.tdAlt), textAlign: 'left', fontWeight: '500' }}>{item.name}</td>
                                <td style={{ ...(idx % 2 === 0 ? styles.td : styles.tdAlt), textAlign: 'center' }}>{item.qty}</td>
                                <td style={{ ...(idx % 2 === 0 ? styles.td : styles.tdAlt), textAlign: 'right' }}>{item.unitPrice.toLocaleString()}</td>
                                <td style={{ ...(idx % 2 === 0 ? styles.td : styles.tdAlt), textAlign: 'right', fontWeight: '600' }}>{(item.qty * item.unitPrice).toLocaleString()}</td>
                            </tr>
                        ))}
                        {/* Empty rows for minimum height */}
                        {[...Array(Math.max(0, 8 - data.items.length))].map((_, i) => (
                            <tr key={`empty-${i}`}>
                                <td style={{ ...((data.items.length + i) % 2 === 0 ? styles.td : styles.tdAlt), height: '42px' }}>&nbsp;</td>
                                <td style={{ ...((data.items.length + i) % 2 === 0 ? styles.td : styles.tdAlt) }}></td>
                                <td style={{ ...((data.items.length + i) % 2 === 0 ? styles.td : styles.tdAlt) }}></td>
                                <td style={{ ...((data.items.length + i) % 2 === 0 ? styles.td : styles.tdAlt) }}></td>
                                <td style={{ ...((data.items.length + i) % 2 === 0 ? styles.td : styles.tdAlt) }}></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Summary */}
                <div style={styles.summaryContainer}>
                    <div style={styles.summaryBox}>
                        <div style={styles.summaryRow}>
                            <span>{t.subtotal}</span>
                            <span>{subtotal.toLocaleString()} {t.currency}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>{t.tax} {data.isTaxIncluded ? t.taxInc : '(10%)'}</span>
                            <span>{tax.toLocaleString()} {t.currency}</span>
                        </div>
                        <div style={styles.totalRow}>
                            <span>{t.total}</span>
                            <span>{grandTotal.toLocaleString()} {t.currency}</span>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                <div style={styles.notesBox}>
                    <div style={styles.notesTitle}>{t.notes}</div>
                    <div style={{ ...styles.notesText, whiteSpace: 'pre-wrap' }}>
                        {data.notes || '입금계좌: (은행명/계좌번호를 입력해 주세요)\n유효기간: 발행일로부터 30일'}
                    </div>
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <div style={styles.greeting}>{t.greeting}</div>
                    <div style={styles.companyName}>{data.supplier.name || 'Company Name'}</div>
                </div>

            </div>

            {/* Download Button */}
            <div style={{ position: 'sticky', bottom: '16px', zIndex: 10, width: '100%', maxWidth: '400px' }}>
                <button
                    onClick={handleDownload}
                    disabled={isGenerating}
                    style={{
                        width: '100%',
                        padding: '16px 24px',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#ffffff',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: isGenerating ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 14px 0 rgba(37, 99, 235, 0.39)',
                        transition: 'all 0.2s ease',
                        opacity: isGenerating ? 0.7 : 1
                    }}
                >
                    {isGenerating ? t.generating : t.downloadBtn}
                </button>
            </div>
        </div>
    )
}
