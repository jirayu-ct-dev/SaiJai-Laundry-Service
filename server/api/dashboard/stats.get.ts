import { PrismaClient } from '@/generated/prisma/client'
import { sub, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const period = (query.period as string) || 'daily'

    // Determine date range
    const now = new Date()
    let currentStart: Date
    let currentEnd: Date = now
    let previousStart: Date
    let previousEnd: Date

    switch (period) {
        case 'daily':
            currentStart = startOfDay(now)
            currentEnd = endOfDay(now)
            previousStart = startOfDay(sub(now, { days: 1 }))
            previousEnd = endOfDay(sub(now, { days: 1 }))
            break
        case 'weekly':
            currentStart = startOfWeek(now, { weekStartsOn: 1 })
            currentEnd = endOfWeek(now, { weekStartsOn: 1 })
            previousStart = startOfWeek(sub(now, { weeks: 1 }), { weekStartsOn: 1 })
            previousEnd = endOfWeek(sub(now, { weeks: 1 }), { weekStartsOn: 1 })
            break
        case 'monthly':
            currentStart = startOfMonth(now)
            currentEnd = endOfMonth(now)
            previousStart = startOfMonth(sub(now, { months: 1 }))
            previousEnd = endOfMonth(sub(now, { months: 1 }))
            break
        default:
            currentStart = startOfDay(now)
            previousStart = startOfDay(sub(now, { days: 1 }))
            previousEnd = endOfDay(sub(now, { days: 1 }))
    }

    // Helper to calculate percentage change
    const calculateGrowth = (current: number, previous: number) => {
        if (previous === 0) return current > 0 ? 100 : 0
        return Math.round(((current - previous) / previous) * 100)
    }

    // 1. Revenue (Storefront Orders + Package Sales)
    const getRevenueValue = async (start: Date, end: Date) => {
        const storefront = await prisma.order.aggregate({
            _sum: { totalAmount: true },
            where: {
                createdAt: { gte: start, lte: end },
                currentStatus: 'COMPLETED',
                orderType: 'STOREFRONT'
            }
        })

        const newPackages = await prisma.userPackage.findMany({
            where: {
                startDate: { gte: start, lte: end }
            },
            include: { package: true }
        })

        const packageRevenue = newPackages.reduce((sum, up) => sum + Number(up.package.price), 0)
        return (Number(storefront._sum.totalAmount) || 0) + packageRevenue
    }

    const currentRevenue = await getRevenueValue(currentStart, currentEnd)
    const previousRevenue = await getRevenueValue(previousStart, previousEnd)

    // 2. Active Orders (Not Completed, Not Cancelled)
    const activeOrdersCount = await prisma.order.count({
        where: {
            currentStatus: {
                notIn: ['COMPLETED', 'CANCELLED']
            }
        }
    })

    // 3. New Customers
    const getNewCustomers = async (start: Date, end: Date) => {
        return await prisma.user.count({
            where: {
                createdAt: { gte: start, lte: end },
                role: 'User'
            }
        })
    }

    const currentNewCustomers = await getNewCustomers(currentStart, currentEnd)
    const previousNewCustomers = await getNewCustomers(previousStart, previousEnd)

    // 4. Active Packages
    const activePackagesCount = await prisma.userPackage.count({
        where: {
            status: 'ACTIVE'
        }
    })

    return {
        revenue: {
            value: currentRevenue,
            variation: calculateGrowth(currentRevenue, previousRevenue)
        },
        activeOrders: {
            value: activeOrdersCount,
            variation: 0
        },
        newCustomers: {
            value: currentNewCustomers,
            variation: calculateGrowth(currentNewCustomers, previousNewCustomers)
        },
        activePackages: {
            value: activePackagesCount,
            variation: 0
        }
    }
})
