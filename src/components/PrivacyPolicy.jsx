import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
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
                        개인정보처리방침
                    </h1>
                    <p style={{ color: '#64748b', marginBottom: '2rem' }}>
                        시행일: 2024년 12월 18일
                    </p>

                    <div style={{ lineHeight: '1.8', color: '#334155' }}>
                        <p>
                            바로견적(이하 "서비스")은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고
                            이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보
                            처리방침을 수립·공개합니다.
                        </p>

                        <Section title="제1조 (개인정보의 처리 목적)">
                            <p>서비스는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                            <ul>
                                <li><strong>회원 가입 및 관리:</strong> 회원제 서비스 이용에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지 목적으로 개인정보를 처리합니다.</li>
                                <li><strong>서비스 제공:</strong> 견적서/영수증 생성, 저장, 관리 서비스 제공을 목적으로 개인정보를 처리합니다.</li>
                            </ul>
                        </Section>

                        <Section title="제2조 (개인정보의 처리 및 보유 기간)">
                            <p>서비스는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                            <ul>
                                <li><strong>회원 정보:</strong> 회원 탈퇴 시까지</li>
                                <li><strong>견적서/영수증 데이터:</strong> 회원 탈퇴 시 또는 삭제 요청 시까지</li>
                            </ul>
                        </Section>

                        <Section title="제3조 (처리하는 개인정보 항목)">
                            <p>서비스는 다음의 개인정보 항목을 처리하고 있습니다.</p>
                            <ul>
                                <li><strong>Google 로그인 시:</strong> 이메일 주소, 이름, 프로필 사진 URL</li>
                                <li><strong>견적서 작성 시 (선택):</strong> 사업자명, 대표자명, 사업자등록번호, 주소, 거래처 정보</li>
                            </ul>
                            <p>※ 위 정보 중 견적서 관련 정보는 사용자가 직접 입력하는 정보이며, 입력하지 않아도 서비스 이용이 가능합니다.</p>
                        </Section>

                        <Section title="제4조 (개인정보의 제3자 제공)">
                            <p>서비스는 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.</p>
                            <p><strong>현재 서비스는 개인정보를 제3자에게 제공하지 않습니다.</strong></p>
                        </Section>

                        <Section title="제5조 (개인정보처리의 위탁)">
                            <p>서비스는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.</p>
                            <ul>
                                <li><strong>위탁받는 자:</strong> Google LLC (Firebase)</li>
                                <li><strong>위탁업무:</strong> 회원 인증, 데이터 저장 및 호스팅</li>
                            </ul>
                        </Section>

                        <Section title="제6조 (정보주체의 권리·의무 및 행사방법)">
                            <p>정보주체는 서비스에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
                            <ul>
                                <li>개인정보 열람 요구</li>
                                <li>오류 등이 있을 경우 정정 요구</li>
                                <li>삭제 요구</li>
                                <li>처리정지 요구</li>
                            </ul>
                            <p>권리 행사는 서비스 내 "내 견적서" 메뉴에서 직접 삭제하거나, 이메일을 통해 요청할 수 있습니다.</p>
                        </Section>

                        <Section title="제7조 (개인정보의 파기)">
                            <p>서비스는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.</p>
                            <ul>
                                <li><strong>파기절차:</strong> 회원 탈퇴 또는 삭제 요청 시 해당 정보를 즉시 파기</li>
                                <li><strong>파기방법:</strong> 전자적 파일 형태의 정보는 복구 불가능한 방법으로 영구 삭제</li>
                            </ul>
                        </Section>

                        <Section title="제8조 (개인정보의 안전성 확보조치)">
                            <p>서비스는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
                            <ul>
                                <li>개인정보의 암호화: Firebase에서 제공하는 암호화 저장 사용</li>
                                <li>해킹 등에 대비한 기술적 대책: SSL/TLS 암호화 통신 사용</li>
                                <li>접근권한 관리: Firebase 보안 규칙을 통한 접근 제어</li>
                            </ul>
                        </Section>

                        <Section title="제9조 (쿠키의 사용)">
                            <p>서비스는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 '쿠키(cookie)'를 사용합니다.</p>
                            <ul>
                                <li><strong>쿠키의 사용 목적:</strong> 로그인 상태 유지, 사용자 설정 저장</li>
                                <li><strong>쿠키 설정 거부:</strong> 웹브라우저 설정에서 쿠키를 거부할 수 있으나, 이 경우 로그인 기능 이용이 제한될 수 있습니다.</li>
                            </ul>
                        </Section>

                        <Section title="제10조 (개인정보 보호책임자)">
                            <p>서비스는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                            <ul>
                                <li><strong>담당:</strong> 바로견적 운영팀</li>
                                <li><strong>연락처:</strong> 서비스 내 문의 기능 또는 이메일</li>
                            </ul>
                        </Section>

                        <Section title="제11조 (개인정보 처리방침 변경)">
                            <p>이 개인정보처리방침은 2025년 12월 18일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</p>
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
