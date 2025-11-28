<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'
import { getPaginationRowModel } from '@tanstack/table-core'
import type { Row } from '@tanstack/table-core'
import type { User } from '~/types'
import AdminCustomersAddModal from '~/components/admin/customers/AddModal.vue'
import AdminCustomersDeleteModal from '~/components/admin/customers/DeleteModal.vue'

const UAvatar = resolveComponent('UAvatar')
const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

const toast = useToast()
const table = useTemplateRef('table')

const columnFilters = ref([{
  id: 'email',
  value: ''
}])
const columnVisibility = ref({})
const rowSelection = ref({})

const { data, status } = await useFetch<User[]>('/api/customers')

function handleUsersRemoved(removedUsers: User[]) {
  if (!data.value) return
  
  // Remove users from data array
  
  // console.log(removedUsers)
  // Reset row selection
  data.value = data.value?.filter(user => !removedUsers.some(removedUser => removedUser.id === user.id))
  rowSelection.value = {}
  // Show success toast
  toast.add({
    title: 'ลบสำเร็จ',
    description: `ลบผู้ใช้ ${removedUsers.length} รายการ`,
    color: 'success'
  })
}


function getRowItems(row: Row<User>) {
  return [
    {
      type: 'label',
      label: 'การดำเนินการ'
    },
    {
      label: 'คัดลอก ID ลูกค้า',
      icon: 'i-lucide-copy',
      onSelect() {
        navigator.clipboard.writeText(row.original.id.toString())
        toast.add({
          title: 'คัดลอกแล้ว',
          description: 'คัดลอก ID ลูกค้าแล้ว'
        })
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'ดูรายละเอียดลูกค้า',
      icon: 'i-lucide-list'
    },
    {
      label: 'ดูประวัติการชำระเงิน',
      icon: 'i-lucide-wallet'
    },
    {
      type: 'separator'
    },
    {
      label: 'ลบลูกค้า',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect() {
        toast.add({
          title: 'ลบลูกค้าแล้ว',
          description: 'ลบลูกค้าเรียบร้อยแล้ว'
        })
      }
    }
  ]
}

const columns: TableColumn<User>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h('div', h(UCheckbox, {
        'modelValue': table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Select all'
      })),
    cell: ({ row }) =>
      h('div', h(UCheckbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        'ariaLabel': 'Select row'
      }))
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'name',
    header: 'ชื่อผู้ใช้',
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h(UAvatar, {
          ...row.original.avatar,
          size: 'lg'
        }),
        h('div', undefined, [
          h('p', { class: 'font-medium text-highlighted' }, row.original.name),
          h('p', { class: '' }, `@${row.original.name}`)
        ])
      ])
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h('div', h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'อีเมล',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      }))
    }
  },
  {
    accessorKey: 'role',
    header: 'บทบาท',
    cell: ({ row }) => row.original.role
  },
  {
    accessorKey: 'package',
    header: 'แพคเกจ',
    cell: ({ row }) => {
      const packageValue = row.original.package || 'None'
      const color = row.original.package === 'Basic' ? 'primary' : row.original.package === 'Standard' ? 'info' : row.original.package === 'Premium' ? 'success' : 'neutral'
      return h('div', h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () => packageValue))
    }
  },
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   filterFn: 'equals',
  //   cell: ({ row }) => {
  //     const color = {
  //       subscribed: 'success' as const,
  //       unsubscribed: 'error' as const,
  //   }
  // },
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   filterFn: 'equals',
  //   cell: ({ row }) => {
  //     const color = {
  //       subscribed: 'success' as const,
  //       unsubscribed: 'error' as const,
  //       bounced: 'warning' as const
  //     }[row.original.status]

  //     return h('div', h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
  //       row.original.status
  //     ))
  //   }
  // },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end'
            },
            items: getRowItems(row)
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto'
            })
        )
      )
    }
  }
]

const packageFilter = ref('all')
const roleFilter = ref('all')

watch(() => packageFilter.value, (newVal) => {
  if (!table?.value?.tableApi) return

  const packageColumn = table.value.tableApi.getColumn('package')
  if (!packageColumn) return

  if (newVal === 'all') {
    packageColumn.setFilterValue(undefined)
  } else {
    packageColumn.setFilterValue(newVal)
  }
})

watch(() => roleFilter.value, (newVal) => {
  if (!table?.value?.tableApi) return

  const roleColumn = table.value.tableApi.getColumn('role')
  if (!roleColumn) return

  if (newVal === 'all') {
    roleColumn.setFilterValue(undefined)
  } else {
    roleColumn.setFilterValue(newVal)
  }
})

const pagination = ref({
  pageIndex: 0,
  pageSize: 10
})
</script>

<template>
  <UDashboardPanel id="customers">
    <template #header>
      <UDashboardNavbar title="Customers">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <ClientOnly>
            <AdminCustomersAddModal />
          </ClientOnly>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-wrap items-center justify-between gap-1.5">
        <UInput
          :model-value="(table?.tableApi?.getColumn('email')?.getFilterValue() as string)"
          class="max-w-sm"
          icon="i-lucide-search"
          placeholder="ค้นหาอีเมล..."
          @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)"
        />

        <div class="flex flex-wrap items-center gap-1.5">
          <ClientOnly>
            <AdminCustomersDeleteModal
              :count="table?.tableApi?.getFilteredSelectedRowModel().rows.length"
              :selected-users="table?.tableApi?.getFilteredSelectedRowModel().rows.map((row: Row<User>) => row.original)"
              @users-removed-selected="(removedUsers: User[]) => {
                removedUsers.forEach(user => {
                  const rowIndex = table?.tableApi?.getRowModel().rows.findIndex(row => row.original.id === user.id)
                  if (rowIndex !== undefined && rowIndex >= 0) {
                    table?.tableApi?.getRowModel().rows[rowIndex]?.toggleSelected(false)
                  }
                })
              }"
              @users-removed="handleUsersRemoved"
            >
              <UButton
                v-if="table?.tableApi?.getFilteredSelectedRowModel().rows.length"
                label="ลบ"
                color="error"
                variant="subtle"
                icon="i-lucide-trash"
              >
                <template #trailing>
                  <UKbd>
                    {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length }}
                  </UKbd>
                </template>
              </UButton>
            </AdminCustomersDeleteModal>
          </ClientOnly>

          <USelect
            v-model="roleFilter"
            :items="[
              { label: 'บทบาททั้งหมด', value: 'all' },
              { label: 'ผู้ดูแลระบบ', value: 'admin' },
              { label: 'พนักงาน', value: 'employee' },
              { label: 'ผู้ใช้', value: 'user' }
            ]"
            :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
            placeholder="กรองตามบทบาท"
            class="min-w-28"
          />
          <USelect
            v-model="packageFilter"
            :items="[
              { label: 'แพ็คเกจทั้งหมด', value: 'all' },
              { label: 'Basic', value: 'basic' },
              { label: 'Standard', value: 'standard' },
              { label: 'Premium', value: 'premium' },
              { label: 'รอการอนุมัติ', value: 'รอการอนุมัติ' },
              { label: 'ไม่มี', value: null }
            ]"
            :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }"
            placeholder="กรองตามแพ็คเกจ"
            class="min-w-28"
          />
          <UDropdownMenu
            class="cursor-pointer"
            :items="
              table?.tableApi
                ?.getAllColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any) => ({
                  label: upperFirst(column.id),
                  type: 'checkbox' as const,
                  checked: column.getIsVisible(),
                  onUpdateChecked(checked: boolean) {
                    table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                  },
                  onSelect(e?: Event) {
                    e?.preventDefault()
                  }
                }))
            "
            :content="{ align: 'end' }"
          >
            <UButton
              label="แสดงคอลัมน์"
              color="neutral"
              variant="outline"
              trailing-icon="i-lucide-settings-2"
            />
          </UDropdownMenu>
        </div>
      </div>

      <UTable
        ref="table"
        v-model:column-filters="columnFilters"
        v-model:column-visibility="columnVisibility"
        v-model:row-selection="rowSelection"
        v-model:pagination="pagination"
        :pagination-options="{
          getPaginationRowModel: getPaginationRowModel()
        }"
        class="shrink-0"
        :data="data"
        :columns="columns"
        :loading="status === 'pending'"
        :ui="{
          base: 'table-fixed border-separate border-spacing-0',
          thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
          tbody: '[&>tr]:last:[&>td]:border-b-0',
          th: 'py-2 font-medium first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
          td: 'border-b border-default',
          separator: 'h-0'
        }"
      />

      <div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto">
        <div class="text-sm text-muted">
          เลือก {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }}
          จาก {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} แถวทั้งหมด
        </div>

        <div class="flex items-center gap-1.5">
          <UPagination
            :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="table?.tableApi?.getFilteredRowModel().rows.length"
            @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)"
          />
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>
