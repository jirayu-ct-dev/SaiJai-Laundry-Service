<script setup lang="ts">
const state = reactive<{ [key: string]: boolean }>({
  // ช่องทางการแจ้งเตือน
  line: true,
  
  // การแจ้งเตือนออเดอร์
  new_order: true,
  order_status_change: true,
  order_ready: true,
  order_delivered: true,
  
  // การแจ้งเตือนการชำระเงิน
  payment_received: true,
  payment_pending: true,
  
  // การแจ้งเตือนลูกค้า
  customer_pickup_reminder: true,
  customer_late_pickup: true,
  
  // การแจ้งเตือนระบบ
  late_order_alert: true,
  new_review: true,
  low_stock_alert: true
})

const sections = [{
  title: 'ช่องทางการแจ้งเตือน',
  description: 'เลือกช่องทางที่ต้องการรับการแจ้งเตือน',
  fields: [{
    name: 'line',
    label: 'Line Notify',
    description: 'รับการแจ้งเตือนผ่าน Line'
  }]
}, {
  title: 'การแจ้งเตือนออเดอร์',
  description: 'การแจ้งเตือนเกี่ยวกับสถานะออเดอร์',
  fields: [{
    name: 'new_order',
    label: 'ออเดอร์ใหม่',
    description: 'แจ้งเตือนเมื่อมีออเดอร์ใหม่เข้ามา'
  }, {
    name: 'order_status_change',
    label: 'เปลี่ยนสถานะออเดอร์',
    description: 'แจ้งเตือนเมื่อสถานะออเดอร์เปลี่ยนแปลง'
  }, {
    name: 'order_ready',
    label: 'ออเดอร์พร้อมส่ง',
    description: 'แจ้งเตือนเมื่อออเดอร์พร้อมส่งมอบ'
  }, {
    name: 'order_delivered',
    label: 'ส่งออเดอร์แล้ว',
    description: 'แจ้งเตือนเมื่อส่งมอบออเดอร์เรียบร้อย'
  }]
}, {
  title: 'การแจ้งเตือนการชำระเงิน',
  description: 'การแจ้งเตือนเกี่ยวกับการชำระเงิน',
  fields: [{
    name: 'payment_received',
    label: 'รับชำระเงินแล้ว',
    description: 'แจ้งเตือนเมื่อได้รับการชำระเงิน'
  }, {
    name: 'payment_pending',
    label: 'รอชำระเงิน',
    description: 'แจ้งเตือนเมื่อมีออเดอร์ที่รอชำระเงิน'
  }]
}, {
  title: 'การแจ้งเตือนลูกค้า',
  description: 'การแจ้งเตือนเกี่ยวกับการรับของของลูกค้า',
  fields: [{
    name: 'customer_pickup_reminder',
    label: 'เตือนลูกค้ามารับของ',
    description: 'ส่งการแจ้งเตือนให้ลูกค้าเมื่อถึงเวลารับของ'
  }, {
    name: 'customer_late_pickup',
    label: 'ลูกค้ารับของล่าช้า',
    description: 'แจ้งเตือนเมื่อลูกค้ารับของเกินกำหนด'
  }]
}, {
  title: 'การแจ้งเตือนระบบ',
  description: 'การแจ้งเตือนเกี่ยวกับการทำงานของระบบ',
  fields: [{
    name: 'late_order_alert',
    label: 'ออเดอร์ล่าช้า',
    description: 'แจ้งเตือนเมื่อออเดอร์ล่าช้ากว่ากำหนด'
  }, {
    name: 'new_review',
    label: 'รีวิวใหม่',
    description: 'แจ้งเตือนเมื่อมีรีวิวจากลูกค้า'
  }, {
    name: 'low_stock_alert',
    label: 'สต็อกต่ำ',
    description: 'แจ้งเตือนเมื่อวัสดุสิ้นเปลืองใกล้หมด'
  }]
}]

const toast = useToast()

async function onChange(fieldName: string, value: boolean) {
  // บันทึกการตั้งค่า
  console.log(`${fieldName}: ${value}`)
  
  // แสดง toast notification
  toast.add({
    title: 'บันทึกแล้ว',
    description: 'บันทึกการตั้งค่าการแจ้งเตือนเรียบร้อย',
    icon: 'i-lucide-check',
    color: 'success'
  })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="(section, index) in sections" :key="index">
      <UPageCard
        :title="section.title"
        :description="section.description"
        variant="naked"
        class="mb-4"
      />

      <UPageCard variant="subtle" :ui="{ container: 'divide-y divide-default' }">
        <UFormField
          v-for="field in section.fields"
          :key="field.name"
          :name="field.name"
          :label="field.label"
          :description="field.description"
          class="flex items-center justify-between not-last:pb-4 gap-2"
        >
          <USwitch
            v-model="state[field.name]"
            @update:model-value="(value) => onChange(field.name, value)"
          />
        </UFormField>
      </UPageCard>
    </div>
  </div>
</template>
