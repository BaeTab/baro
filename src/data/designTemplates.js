// 레이아웃 스타일 (디자인)
export const layoutStyles = {
    classic: {
        id: 'classic',
        name: '클래식',
        description: '전통적인 비즈니스 스타일',
        headerStyle: 'split',
        titleSize: '32px',
        borderRadius: '8px',
        tableStyle: 'solid',
        infoBoxStyle: 'card',
        showDivider: true
    },
    modern: {
        id: 'modern',
        name: '모던',
        description: '세련된 현대적 스타일',
        headerStyle: 'center',
        titleSize: '36px',
        borderRadius: '16px',
        tableStyle: 'bordered',
        infoBoxStyle: 'flat',
        showDivider: false
    },
    minimal: {
        id: 'minimal',
        name: '미니멀',
        description: '심플하고 깔끔한 스타일',
        headerStyle: 'left',
        titleSize: '28px',
        borderRadius: '4px',
        tableStyle: 'striped',
        infoBoxStyle: 'bordered',
        showDivider: true
    },
    rounded: {
        id: 'rounded',
        name: '라운드',
        description: '부드럽고 둥근 스타일',
        headerStyle: 'center',
        titleSize: '32px',
        borderRadius: '20px',
        tableStyle: 'bordered',
        infoBoxStyle: 'card',
        showDivider: false
    },
    sharp: {
        id: 'sharp',
        name: '샤프',
        description: '각진 고급스러운 스타일',
        headerStyle: 'split',
        titleSize: '34px',
        borderRadius: '0px',
        tableStyle: 'solid',
        infoBoxStyle: 'bordered',
        showDivider: true
    }
}

// 색상 팔레트
export const colorSchemes = {
    blue: {
        id: 'blue',
        name: '블루',
        preview: '#2563eb',
        primary: '#1e3a5f',
        secondary: '#2563eb',
        accent: '#f8fafc',
        text: '#1a1a1a',
        muted: '#64748b',
        border: '#e2e8f0',
        headerBg: '#1e3a5f',
        headerText: '#ffffff'
    },
    purple: {
        id: 'purple',
        name: '퍼플',
        preview: '#8b5cf6',
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#f5f3ff',
        text: '#1e1b4b',
        muted: '#6b7280',
        border: '#e5e7eb',
        headerBg: '#6366f1',
        headerText: '#ffffff'
    },
    black: {
        id: 'black',
        name: '블랙',
        preview: '#18181b',
        primary: '#18181b',
        secondary: '#3f3f46',
        accent: '#fafafa',
        text: '#18181b',
        muted: '#71717a',
        border: '#d4d4d8',
        headerBg: '#18181b',
        headerText: '#ffffff'
    },
    orange: {
        id: 'orange',
        name: '오렌지',
        preview: '#f97316',
        primary: '#ea580c',
        secondary: '#f97316',
        accent: '#fff7ed',
        text: '#1c1917',
        muted: '#78716c',
        border: '#fed7aa',
        headerBg: '#ea580c',
        headerText: '#ffffff'
    },
    green: {
        id: 'green',
        name: '그린',
        preview: '#10b981',
        primary: '#059669',
        secondary: '#10b981',
        accent: '#ecfdf5',
        text: '#064e3b',
        muted: '#6b7280',
        border: '#a7f3d0',
        headerBg: '#059669',
        headerText: '#ffffff'
    },
    gold: {
        id: 'gold',
        name: '골드',
        preview: '#b8860b',
        primary: '#1e3a5f',
        secondary: '#b8860b',
        accent: '#fefce8',
        text: '#1e3a5f',
        muted: '#6b7280',
        border: '#fde68a',
        headerBg: '#1e3a5f',
        headerText: '#fde68a'
    },
    red: {
        id: 'red',
        name: '레드',
        preview: '#dc2626',
        primary: '#b91c1c',
        secondary: '#dc2626',
        accent: '#fef2f2',
        text: '#1f2937',
        muted: '#6b7280',
        border: '#fecaca',
        headerBg: '#b91c1c',
        headerText: '#ffffff'
    },
    teal: {
        id: 'teal',
        name: '틸',
        preview: '#14b8a6',
        primary: '#0d9488',
        secondary: '#14b8a6',
        accent: '#f0fdfa',
        text: '#134e4a',
        muted: '#6b7280',
        border: '#99f6e4',
        headerBg: '#0d9488',
        headerText: '#ffffff'
    }
}

export const getLayoutById = (id) => {
    return layoutStyles[id] || layoutStyles.classic
}

export const getColorById = (id) => {
    return colorSchemes[id] || colorSchemes.blue
}

export const getAllLayouts = () => {
    return Object.values(layoutStyles)
}

export const getAllColors = () => {
    return Object.values(colorSchemes)
}
