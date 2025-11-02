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
    perItemService: {
        label: 'ค่าบริการผ้ารายชิ้น',
        to: { path: '/', hash: '#per-item-pricing' },
        icon: 'i-lucide-shirt',
    },
    monthlyMembership: {
        label: 'สมัครสมาชิกรายเดือน',
        to: { path: '/', hash: '#monthly-membership' },
        icon: 'i-lucide-credit-card'
    },
    statusCheck: {
        label: 'เช็กสถานะ',
        to: { path: '/', hash: '#status-tracking' },
        icon: 'i-lucide-clipboard-check'
    },
    faq: {
        label: 'คำถามที่พบบ่อย',
        to: { path: '/', hash: '#faq' },
        icon: 'i-lucide-help-circle'
    },
    contact: {
        label: 'ติดต่อเรา',
        to: { path: '/', hash: '#contact' },
        icon: 'i-lucide-phone'
    }
    // login: {
    //     label: 'Login',
    //     to: '/login',
    //     icon: 'i-lucide-log-in'
    // },
    // register: {
    //     label: 'Register',
    //     to: '/sign-up',
    //     icon: 'i-lucide-user-plus'
    // }
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

export const lineNavLinks: AppNavLinks = {
    lineFriend: {
        label: 'เพิ่มเพื่อนใน LINE OA',
        to: 'https://line.me/R/ti/p/@saijai-laundry',
        external: true,
        target: '_blank',
        icon: 'i-lucide-message-circle'
    }
}
