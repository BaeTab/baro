import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #f8fafc 0%, #e0e7ff 100%)' }}>

            {/* Navigation */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem 2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                        width: 40,
                        height: 40,
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '20px',
                        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)'
                    }}>B</div>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b' }}>바로견적</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <Link to="/blog" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem', fontWeight: '500' }}>
                        블로그
                    </Link>
                    <Link
                        to="/app"
                        style={{
                            padding: '0.6rem 1.5rem',
                            background: '#2563eb',
                            color: 'white',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            boxShadow: '0 2px 10px rgba(37, 99, 235, 0.3)',
                            transition: 'all 0.2s'
                        }}
                    >
                        무료로 시작하기
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '4rem 2rem 6rem',
                textAlign: 'center'
            }}>
                <div style={{
                    display: 'inline-block',
                    background: '#dbeafe',
                    color: '#1d4ed8',
                    padding: '0.4rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    marginBottom: '1.5rem'
                }}>
                    ✨ 소상공인을 위한 스마트 문서 솔루션
                </div>

                <h1 style={{
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    fontWeight: '800',
                    color: '#0f172a',
                    lineHeight: '1.2',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em'
                }}>
                    견적서, 영수증을<br />
                    <span style={{
                        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>1분 만에</span> 만드세요
                </h1>

                <p style={{
                    fontSize: '1.15rem',
                    color: '#64748b',
                    maxWidth: '600px',
                    margin: '0 auto 2.5rem',
                    lineHeight: '1.7'
                }}>
                    복잡한 엑셀 작업은 그만! 바로견적으로 전문가 수준의 견적서와 영수증을
                    몇 번의 클릭만으로 PDF로 다운로드 하세요.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link
                        to="/app"
                        style={{
                            padding: '1rem 2.5rem',
                            background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                            color: 'white',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            fontWeight: '700',
                            fontSize: '1.05rem',
                            boxShadow: '0 4px 20px rgba(37, 99, 235, 0.4)',
                            transition: 'all 0.2s'
                        }}
                    >
                        지금 바로 시작 →
                    </Link>
                </div>

                {/* Preview Image Mockup */}
                <div style={{
                    marginTop: '4rem',
                    background: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                    padding: '1.5rem',
                    maxWidth: '900px',
                    margin: '4rem auto 0'
                }}>
                    <div style={{
                        background: '#f8fafc',
                        borderRadius: '8px',
                        padding: '2rem',
                        textAlign: 'left',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e3a5f' }}>견 적 서</div>
                                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>날짜: 2024-12-18 | 번호: 2024-0001</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', flex: '1 1 200px' }}>
                                <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>공급받는자</div>
                                <div style={{ fontWeight: '600' }}>홍길동 귀하</div>
                            </div>
                            <div style={{ background: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', flex: '1 1 200px' }}>
                                <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '0.5rem' }}>공급자</div>
                                <div style={{ fontWeight: '600' }}>바로상사</div>
                            </div>
                        </div>
                        <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            <div style={{ minWidth: '500px' }}>
                                <div style={{
                                    background: '#1e3a5f',
                                    color: 'white',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '6px 6px 0 0',
                                    display: 'grid',
                                    gridTemplateColumns: '40px 1fr 60px 80px 100px',
                                    fontSize: '0.75rem',
                                    fontWeight: '600'
                                }}>
                                    <span>No</span>
                                    <span>품목</span>
                                    <span style={{ textAlign: 'center' }}>수량</span>
                                    <span style={{ textAlign: 'right' }}>단가</span>
                                    <span style={{ textAlign: 'right' }}>공급가액</span>
                                </div>
                                <div style={{
                                    background: 'white',
                                    padding: '0.75rem 1rem',
                                    borderBottom: '1px solid #e2e8f0',
                                    display: 'grid',
                                    gridTemplateColumns: '40px 1fr 60px 80px 100px',
                                    fontSize: '0.85rem'
                                }}>
                                    <span>1</span>
                                    <span>웹사이트 디자인</span>
                                    <span style={{ textAlign: 'center' }}>1</span>
                                    <span style={{ textAlign: 'right' }}>1,500,000</span>
                                    <span style={{ textAlign: 'right', fontWeight: '600' }}>1,500,000</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section style={{
                background: 'white',
                padding: '5rem 2rem'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '700',
                        color: '#0f172a',
                        textAlign: 'center',
                        marginBottom: '3rem'
                    }}>
                        왜 바로견적인가요?
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem'
                    }}>
                        {[
                            {
                                icon: '⚡',
                                title: '빠른 작성',
                                desc: '복잡한 양식 없이 필요한 정보만 입력하면 전문적인 문서가 완성됩니다.'
                            },
                            {
                                icon: '🎨',
                                title: '세련된 디자인',
                                desc: '현대적이고 깔끔한 디자인으로 고객에게 신뢰감을 줍니다.'
                            },
                            {
                                icon: '📱',
                                title: 'PC/모바일 호환',
                                desc: '어디서든 접속해서 문서를 만들고 바로 PDF로 저장하세요.'
                            },
                            {
                                icon: '🔒',
                                title: '개인정보 보호',
                                desc: '모든 데이터는 브라우저에만 저장되어 안전합니다.'
                            },
                            {
                                icon: '💰',
                                title: '완전 무료',
                                desc: '회원가입 없이 무료로 무제한 사용 가능합니다.'
                            },
                            {
                                icon: '🌍',
                                title: '한/영 지원',
                                desc: '한글과 영문 견적서를 모두 지원합니다.'
                            }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                style={{
                                    background: '#f8fafc',
                                    borderRadius: '12px',
                                    padding: '2rem',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                                <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
                padding: '4rem 2rem',
                textAlign: 'center'
            }}>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: 'white',
                    marginBottom: '1rem'
                }}>
                    지금 바로 견적서를 만들어 보세요
                </h2>
                <p style={{
                    color: 'rgba(255,255,255,0.8)',
                    marginBottom: '2rem',
                    fontSize: '1rem'
                }}>
                    무료로 시작하고, 1분 안에 첫 견적서를 완성하세요.
                </p>
                <Link
                    to="/app"
                    style={{
                        display: 'inline-block',
                        padding: '1rem 3rem',
                        background: 'white',
                        color: '#2563eb',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: '700',
                        fontSize: '1.05rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}
                >
                    무료로 시작하기 →
                </Link>
            </section>

            {/* Footer */}
            <footer style={{
                background: '#0f172a',
                color: '#94a3b8',
                padding: '3rem 2rem',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'white' }}>바로견적</span>
                        <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem' }}>| 소상공인을 위한 스마트 문서 솔루션</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>
                        <a href="/privacy" style={{ color: '#94a3b8', textDecoration: 'none', margin: '0 1rem' }}>개인정보처리방침</a>
                        <a href="/terms" style={{ color: '#94a3b8', textDecoration: 'none', margin: '0 1rem' }}>이용약관</a>
                    </div>
                    <div style={{ fontSize: '0.75rem' }}>
                        © 2024 바로견적. All rights reserved.
                    </div>
                </div>
            </footer>

        </div>
    )
}
