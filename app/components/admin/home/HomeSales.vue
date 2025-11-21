<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { Period, Range } from '~/types'

const props = defineProps<{
  period: Period
  range: Range
}>()

const UBadge = resolveComponent('UBadge')
const UAvatar = resolveComponent('UAvatar')

// Mock data interface matching the proposed API structure
interface RecentSale {
  id: string
  user: {
    name: string
    email: string
    avatar?: string
    packageName?: string // Show if user has an active package
  }
  type: 'STOREFRONT' | 'PACKAGE_PURCHASE' | 'PACKAGE_USAGE'
  status: 'COMPLETED' | 'PENDING_CHECK' | 'PENDING_PAYMENT' | 'PAID' | 'CANCELLED' | 'WASHING' | 'IRONING' | 'READY_FOR_PICKUP'
  amount?: number // For Storefront and Package Purchase
  credits?: number // For Package Usage
  itemsCount: number
  date: string
}

const { data } = await useAsyncData('sales', async () => {
  // Mock data generation
  const sales: RecentSale[] = []
  const currentDate = new Date()

  const sampleUsers = [
    { name: 'James Anderson', email: 'james.anderson@example.com', packageName: 'รายเดือน 50 ชิ้น' },
    { name: 'Mia White', email: 'mia.white@example.com', packageName: undefined },
    { name: 'William Brown', email: 'william.brown@example.com', packageName: 'รายเดือน 30 ชิ้น' },
    { name: 'Emma Davis', email: 'emma.davis@example.com', packageName: undefined },
    { name: 'Ethan Harris', email: 'ethan.harris@example.com', packageName: 'รายเดือน 100 ชิ้น' }
  ]

  for (let i = 0; i < 8; i++) {
    const hoursAgo = randomInt(0, 48)
    const date = new Date(currentDate.getTime() - hoursAgo * 3600000)
    const user = randomFrom(sampleUsers)

    // Determine type based on user context (if they have package, they might use it)
    const types: RecentSale['type'][] = ['STOREFRONT', 'PACKAGE_PURCHASE']
    if (user.packageName) types.push('PACKAGE_USAGE')

    const type = randomFrom(types) as RecentSale['type']

    let status: RecentSale['status']
    let itemsCount = 0
    let amount: number | undefined
    let credits: number | undefined

    if (type === 'PACKAGE_PURCHASE') {
      // Buying a package
      status = randomFrom(['PENDING_PAYMENT', 'PAID']) as 'PENDING_PAYMENT' | 'PAID'
      itemsCount = 1 // 1 Package
      amount = randomFrom([990, 1590, 2990])
    } else if (type === 'PACKAGE_USAGE') {
      // Using package credits
      status = randomFrom(['COMPLETED', 'PENDING_CHECK', 'WASHING', 'IRONING', 'READY_FOR_PICKUP']) as RecentSale['status']
      itemsCount = randomInt(5, 20)
      credits = itemsCount // 1 item = 1 credit usually
    } else {
      // Storefront (Cash)
      status = randomFrom(['COMPLETED', 'PENDING_CHECK', 'WASHING', 'IRONING', 'READY_FOR_PICKUP', 'CANCELLED']) as RecentSale['status']
      itemsCount = randomInt(2, 15)
      amount = itemsCount * randomInt(15, 50) // Rough price calc
    }

    sales.push({
      id: (4600 - i).toString(),
      user: {
        name: user.name,
        email: user.email,
        packageName: user.packageName
      },
      type,
      status,
      amount,
      credits,
      itemsCount,
      date: date.toISOString()
    })
  }

  return sales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}, {
  watch: [() => props.period, () => props.range],
  default: () => []
})

const columns: TableColumn<RecentSale>[] = [
  {
    accessorKey: 'user',
    header: 'ลูกค้า',
    cell: ({ row }) => {
      const user = row.getValue('user') as RecentSale['user']
      return h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, {
          src: user.avatar,
          alt: user.name,
          size: 'sm'
        }),
        h('div', { class: 'flex flex-col' }, [
          h('div', { class: 'flex items-center gap-2' }, [
            h('span', { class: 'text-sm font-medium text-highlighted' }, user.name),
            user.packageName ? h(UBadge, { color: 'primary', variant: 'subtle', size: 'xs', class: 'hidden sm:inline-flex' }, () => user.packageName) : null
          ]),
          h('span', { class: 'text-xs text-muted' }, user.email)
        ])
      ])
    }
  },
  {
    accessorKey: 'type',
    header: 'ประเภท',
    cell: ({ row }) => {
      const type = row.getValue('type') as RecentSale['type']
      let label = ''
      let color = 'neutral'

      switch (type) {
        case 'PACKAGE_PURCHASE':
          label = 'ซื้อแพ็กเกจ'
          color = 'primary'
          break
        case 'PACKAGE_USAGE':
          label = 'ใช้แพ็กเกจ'
          color = 'info'
          break
        case 'STOREFRONT':
          label = 'หน้าร้าน'
          color = 'neutral'
          break
      }

      return h(UBadge, {
        variant: 'subtle',
        color,
        class: 'capitalize'
      }, () => label)
    }
  },
  {
    accessorKey: 'itemsCount',
    header: () => h('div', { class: 'text-center' }, 'จำนวนผ้า'),
    cell: ({ row }) => {
      const type = row.getValue('type') as RecentSale['type']
      // If buying a package, itemsCount is 1 (the package itself), maybe show "-" or "1 แพ็กเกจ"
      // But user said "Package Purchase -> Price", "Storefront -> Item Count & Price"
      // Let's show item count for Usage and Storefront.
      if (type === 'PACKAGE_PURCHASE') return h('div', { class: 'text-center text-muted' }, '-')

      return h('div', { class: 'text-center font-medium' }, `${row.getValue('itemsCount')} ชิ้น`)
    }
  },
  {
    accessorKey: 'status',
    header: 'สถานะ',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      let color = 'neutral'
      let label = status

      switch (status) {
        case 'COMPLETED':
          color = 'success'
          label = 'เสร็จสิ้น'
          break
        case 'PAID':
          color = 'success'
          label = 'ชำระแล้ว'
          break
        case 'PENDING_PAYMENT':
          color = 'warning'
          label = 'รออนุมัติ'
          break
        case 'PENDING_CHECK':
          color = 'info'
          label = 'รอตรวจสอบ'
          break
        case 'WASHING':
          color = 'info'
          label = 'กำลังซัก'
          break
        case 'IRONING':
          color = 'info'
          label = 'กำลังรีด'
          break
        case 'READY_FOR_PICKUP':
          color = 'primary'
          label = 'รอรับ'
          break
        case 'CANCELLED':
          color = 'error'
          label = 'ยกเลิก'
          break
      }

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => label)
    }
  },
  {
    id: 'value', // Combined Amount / Credits
    header: () => h('div', { class: 'text-right' }, 'ยอดรวม'),
    cell: ({ row }) => {
      const type = row.getValue('type') as RecentSale['type']

      if (type === 'PACKAGE_USAGE') {
        const credits = row.original.credits
        return h('div', { class: 'text-right font-medium text-primary-500' }, `-${credits} เครดิต`)
      }

      const amount = row.original.amount || 0
      const formatted = new Intl.NumberFormat('th-TH', {
        style: 'currency',
        currency: 'THB',
        maximumFractionDigits: 0
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    }
  },
  {
    accessorKey: 'date',
    header: 'วันที่',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('th-TH', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  }
]
</script>

<template>
  <UTable :data="data" :columns="columns" class="shrink-0" :ui="{
    base: 'table-fixed border-separate border-spacing-0',
    thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
    tbody: '[&>tr]:last:[&>td]:border-b-0',
    th: 'first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
    td: 'border-b border-default'
  }" />
</template>
