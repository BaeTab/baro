import { Link } from 'react-router-dom'

export default function TermsOfService() {
    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
            <Header />

            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
                <article style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '3rem',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1e293b' }}>
                        서비스 이용약관
                    </h1>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                        시행일: 2024년 12월 18일
                    </p>

                    <div style={{ lineHeight: '1.8', color: '#334155' }}>

                        <Section title="제1조 (목적)">
                            <p>이 약관은 바로견적(이하 "서비스")이 제공하는 견적서 및 영수증 생성 서비스의 이용조건 및 절차, 서비스와 이용자의 권리·의무 및 책임사항 등을 규정함을 목적으로 합니다.</p>
                        </Section>

                        <Section title="제2조 (정의)">
                            <ul>
                                <li><strong>"서비스"</strong>란 바로견적이 제공하는 웹 기반 견적서/영수증 생성, 저장, 관리 서비스를 의미합니다.</li>
                                <li><strong>"이용자"</strong>란 이 약관에 따라 서비스가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
                                <li><strong>"회원"</strong>이란 서비스에 개인정보를 제공하여 회원등록을 한 자로서, 서비스의 정보를 지속적으로 제공받으며 서비스가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.</li>
                                <li><strong>"비회원"</strong>이란 회원으로 가입하지 않고 서비스가 제공하는 서비스를 이용하는 자를 말합니다.</li>
                            </ul>
                        </Section>

                        <Section title="제3조 (약관의 효력 및 변경)">
                            <ul>
                                <li>이 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.</li>
                                <li>서비스는 합리적인 사유가 발생할 경우 이 약관을 변경할 수 있으며, 변경된 약관은 적용일자 7일 전부터 공지합니다.</li>
                                <li>이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.</li>
                            </ul>
                        </Section>

                        <Section title="제4조 (서비스의 내용)">
                            <p>서비스는 다음과 같은 서비스를 제공합니다.</p>
                            <ul>
                                <li>견적서 작성 및 PDF 다운로드</li>
                                <li>영수증 작성 및 PDF 다운로드</li>
                                <li>견적서/영수증 저장 및 관리 (회원에 한함)</li>
                                <li>템플릿 저장 기능 (회원에 한함)</li>
                                <li>기타 서비스가 추가 개발하여 제공하는 일체의 서비스</li>
                            </ul>
                        </Section>

                        <Section title="제5조 (서비스 이용)">
                            <ul>
                                <li>비회원은 견적서/영수증 작성 및 PDF 다운로드 기능을 이용할 수 있습니다.</li>
                                <li>회원은 모든 서비스 기능(저장, 관리, 템플릿 등)을 이용할 수 있습니다.</li>
                                <li>서비스는 연중무휴, 1일 24시간 제공함을 원칙으로 합니다. 다만, 시스템 점검 등의 사유로 서비스가 일시 중단될 수 있습니다.</li>
                            </ul>
                        </Section>

                        <Section title="제6조 (회원가입)">
                            <ul>
                                <li>이용자는 Google 계정을 통한 소셜 로그인 방식으로 회원가입을 할 수 있습니다.</li>
                                <li>회원가입은 이용자가 약관의 내용에 대하여 동의를 한 후 로그인을 완료함으로써 성립됩니다.</li>
                            </ul>
                        </Section>

                        <Section title="제7조 (회원 탈퇴 및 자격 상실)">
                            <ul>
                                <li>회원은 서비스에 언제든지 탈퇴를 요청할 수 있으며, 서비스는 즉시 회원탈퇴를 처리합니다.</li>
                                <li>회원 탈퇴 시 저장된 견적서, 템플릿 등의 데이터는 즉시 삭제되며 복구가 불가능합니다.</li>
                                <li>회원이 다음 각 호의 사유에 해당하는 경우, 서비스는 회원자격을 제한 또는 상실시킬 수 있습니다.
                                    <ul style={{ marginTop: '0.5rem' }}>
                                        <li>가입 신청 시 허위 내용을 등록한 경우</li>
                                        <li>다른 사람의 서비스 이용을 방해하거나 그 정보를 도용한 경우</li>
                                        <li>서비스를 이용하여 법령 또는 이 약관이 금지하는 행위를 하는 경우</li>
                                    </ul>
                                </li>
                            </ul>
                        </Section>

                        <Section title="제8조 (이용자의 의무)">
                            <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
                            <ul>
                                <li>신청 또는 변경 시 허위 내용의 등록</li>
                                <li>타인의 정보 도용</li>
                                <li>서비스에 게시된 정보의 변경</li>
                                <li>서비스가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                                <li>서비스 및 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                                <li>서비스 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                                <li>외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위</li>
                                <li>서비스를 이용하여 불법적인 목적의 문서를 생성하는 행위</li>
                            </ul>
                        </Section>

                        <Section title="제9조 (서비스의 책임 제한)">
                            <ul>
                                <li>서비스는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
                                <li>서비스는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
                                <li>서비스는 이용자가 서비스를 이용하여 작성한 문서의 내용에 대하여 책임을 지지 않습니다.</li>
                                <li>서비스는 이용자가 서비스를 이용하여 기대하는 수익을 얻지 못하거나 상실한 것에 대하여 책임을 지지 않습니다.</li>
                            </ul>
                        </Section>

                        <Section title="제10조 (저작권)">
                            <ul>
                                <li>서비스가 작성한 저작물(디자인, 템플릿, 로고 등)에 대한 저작권은 서비스에 귀속됩니다.</li>
                                <li>이용자가 서비스를 이용하여 작성한 문서(견적서, 영수증)의 내용에 대한 권리는 이용자에게 귀속됩니다.</li>
                                <li>이용자는 서비스를 이용하여 얻은 정보를 서비스의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.</li>
                            </ul>
                        </Section>

                        <Section title="제11조 (무료 서비스)">
                            <ul>
                                <li>서비스는 현재 무료로 제공됩니다.</li>
                                <li>서비스는 일부 기능에 대해 유료화를 시행할 수 있으며, 이 경우 사전에 공지합니다.</li>
                                <li>무료 서비스 이용 시 광고가 표시될 수 있습니다.</li>
                            </ul>
                        </Section>

                        <Section title="제12조 (분쟁 해결)">
                            <ul>
                                <li>서비스와 이용자 간에 발생한 분쟁에 관한 소송은 대한민국 법률을 따릅니다.</li>
                                <li>서비스와 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다.</li>
                            </ul>
                        </Section>

                        <Section title="부칙">
                            <p>이 약관은 2024년 12월 18일부터 시행됩니다.</p>
                        </Section>

                    </div>
                </article>
            </main>

            <Footer />
        </div>
    )
}

function Section({ title, children }) {
    return (
        <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>
                {title}
            </h2>
            <div style={{ paddingLeft: '0.5rem' }}>
                {children}
            </div>
            <style>{`
        section ul { margin: 0.5rem 0; padding-left: 1.5rem; }
        section li { margin-bottom: 0.5rem; }
        section p { margin-bottom: 0.75rem; }
      `}</style>
        </section>
    )
}

function Header() {
    return (
        <header style={{
            background: 'white',
            borderBottom: '1px solid #e2e8f0',
            padding: '1rem 2rem'
        }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                        width: 36, height: 36,
                        background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                        borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontWeight: 'bold', fontSize: '18px'
                    }}>B</div>
                    <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>바로견적</span>
                </Link>
                <Link to="/app" style={{
                    padding: '0.5rem 1rem', background: '#2563eb', color: 'white',
                    borderRadius: '8px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500'
                }}>견적서 만들기</Link>
            </div>
        </header>
    )
}

function Footer() {
    return (
        <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '1rem' }}>
                <Link to="/privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>개인정보처리방침</Link>
                <Link to="/terms" style={{ color: '#94a3b8', textDecoration: 'none' }}>이용약관</Link>
            </div>
            <div style={{ fontSize: '0.85rem' }}>© 2024 바로견적. All rights reserved.</div>
        </footer>
    )
}
