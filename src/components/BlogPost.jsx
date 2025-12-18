import { Link, useParams } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

export default function BlogPost() {
    const { id } = useParams()
    const post = blogPosts.find(p => p.id === id)

    if (!post) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>글을 찾을 수 없습니다</h1>
                    <Link to="/blog" style={{ color: '#2563eb' }}>블로그 목록으로 돌아가기</Link>
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
            {/* Header */}
            <header style={{
                background: 'white',
                borderBottom: '1px solid #e2e8f0',
                padding: '1rem 2rem'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                    <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <Link to="/" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem' }}>홈</Link>
                        <Link to="/blog" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: '600', fontSize: '0.9rem' }}>블로그</Link>
                        <Link to="/app" style={{
                            textDecoration: 'none',
                            background: '#2563eb',
                            color: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            fontWeight: '500'
                        }}>견적서 만들기</Link>
                    </nav>
                </div>
            </header>

            {/* Article */}
            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
                <article>
                    {/* Meta */}
                    <div style={{ marginBottom: '2rem' }}>
                        <Link to="/blog" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem' }}>
                            ← 블로그 목록
                        </Link>
                    </div>

                    {/* Header */}
                    <header style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                            <span style={{
                                background: '#dbeafe',
                                color: '#2563eb',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                fontWeight: '600'
                            }}>{post.category}</span>
                            <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{post.date}</span>
                        </div>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: '800',
                            color: '#1e293b',
                            lineHeight: '1.3',
                            marginBottom: '1rem'
                        }}>
                            {post.title}
                        </h1>
                        <p style={{ color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            {post.excerpt}
                        </p>
                    </header>

                    {/* Content */}
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '2.5rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        border: '1px solid #e2e8f0'
                    }}>
                        <div
                            style={{
                                fontSize: '1rem',
                                lineHeight: '1.9',
                                color: '#334155'
                            }}
                            dangerouslySetInnerHTML={{
                                __html: post.content
                                    .replace(/## (.*)/g, '<h2 style="font-size: 1.5rem; font-weight: 700; color: #1e293b; margin: 2rem 0 1rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">$1</h2>')
                                    .replace(/### (.*)/g, '<h3 style="font-size: 1.15rem; font-weight: 600; color: #334155; margin: 1.5rem 0 0.75rem;">$1</h3>')
                                    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600; color: #1e293b;">$1</strong>')
                                    .replace(/\n\n/g, '</p><p style="margin-bottom: 1rem;">')
                                    .replace(/- (.*)/g, '<li style="margin-left: 1.5rem; margin-bottom: 0.5rem;">$1</li>')
                                    .replace(/\| (.*) \|/g, (match) => {
                                        const cells = match.split('|').filter(c => c.trim())
                                        return `<tr>${cells.map(c => `<td style="padding: 0.5rem; border: 1px solid #e2e8f0;">${c.trim()}</td>`).join('')}</tr>`
                                    })
                            }}
                        />
                    </div>

                    {/* CTA */}
                    <div style={{
                        marginTop: '3rem',
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        borderRadius: '12px',
                        padding: '2rem',
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem' }}>
                            지금 바로 견적서를 만들어 보세요!
                        </h3>
                        <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                            무료로 전문적인 견적서를 1분 만에 작성하세요.
                        </p>
                        <Link
                            to="/app"
                            style={{
                                display: 'inline-block',
                                background: 'white',
                                color: '#2563eb',
                                padding: '0.75rem 2rem',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: '600'
                            }}
                        >
                            무료로 시작하기 →
                        </Link>
                    </div>
                </article>
            </main>

            {/* Footer */}
            <footer style={{
                background: '#0f172a',
                color: '#94a3b8',
                padding: '2rem',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '0.85rem' }}>
                    © 2024 바로견적. All rights reserved.
                </div>
            </footer>
        </div>
    )
}
