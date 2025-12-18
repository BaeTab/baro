import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

export default function BlogList() {
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

            {/* Hero */}
            <section style={{
                background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 100%)',
                padding: '4rem 2rem',
                textAlign: 'center',
                color: 'white'
            }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>
                    바로견적 블로그
                </h1>
                <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
                    견적서, 영수증, 세금 관련 유용한 정보를 확인하세요
                </p>
            </section>

            {/* Blog List */}
            <main style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {blogPosts.map(post => (
                        <Link
                            key={post.id}
                            to={`/blog/${post.id}`}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <article style={{
                                background: 'white',
                                borderRadius: '12px',
                                padding: '1.5rem 2rem',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                transition: 'all 0.2s',
                                border: '1px solid #e2e8f0'
                            }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{
                                        background: '#dbeafe',
                                        color: '#2563eb',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>{post.category}</span>
                                    <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{post.date}</span>
                                </div>
                                <h2 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: '700',
                                    color: '#1e293b',
                                    marginBottom: '0.5rem',
                                    lineHeight: '1.4'
                                }}>
                                    {post.title}
                                </h2>
                                <p style={{
                                    color: '#64748b',
                                    fontSize: '0.95rem',
                                    lineHeight: '1.6',
                                    margin: 0
                                }}>
                                    {post.excerpt}
                                </p>
                            </article>
                        </Link>
                    ))}
                </div>
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
