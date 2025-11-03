import type { RouteLocationRaw } from 'vue-router'

export type AppNavLink = {
    label: string
    to: RouteLocationRaw
    icon?: string
    badge?: string | number
    external?: boolean
    target?: '_blank' | '_self'
    children?: AppNavLink[]
}

export type AppNavLinks = Record<string, AppNavLink>

export const primaryNavLinks: AppNavLinks = {
    'ค่าบริการ': {
        label: 'ค่าบริการ',
        to: { path: '/', hash: '#per-item-pricing' },
        icon: 'i-lucide-book-open'
    },
    'สมัครสมาชิก': {
        label: 'สมัครสมาชิก',
        to: { path: '/', hash: '#monthly-membership' },
        icon: 'i-lucide-box'
    },
    'เช็คสถานะ': {
        label: 'เช็คสถานะ',
        to: { path: '/', hash: '#status-tracking' },
        icon: 'i-simple-icons-figma'
    },
    'คำถามที่พบบ่อย': {
        label: 'คำถามที่พบบ่อย',
        to: { path: '/', hash: '#faq' },
        icon: 'i-lucide-rocket'
    },
    'ติดต่อเรา': {
        label: 'ติดต่อเรา',
        to: { path: '/', hash: '#contact' },
        icon: 'i-lucide-phone'
    }
}

export const authNavLinks: AppNavLinks = {
    login: {
        label: 'Login',
        to: '/login',
        icon: 'i-lucide-log-in'
    },
    register: {
        label: 'Register',
        to: '/sign-up',
        icon: 'i-lucide-user-plus'
    }
}

export const lineNavLinks: AppNavLink = {
    label: 'Add Line',
    to: 'https://line.me/R/ti/p/@883vmdct',
    external: true,
    target: '_blank',
}
