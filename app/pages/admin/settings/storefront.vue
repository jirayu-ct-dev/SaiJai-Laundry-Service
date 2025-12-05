<script setup lang="ts">
import { ref, reactive } from 'vue'

interface PriceItem {
  id: number
  category: string
  washIron: number | null
  washOnly: number | null
  ironOnly: number | null
  note?: string
}

const toast = useToast()

const priceList = ref<PriceItem[]>([
  { id: 1, category: 'เสื้อตัว / เสื้อโปโลแขนสั้น', washIron: 15, washOnly: 5, ironOnly: null, note: '' },
  { id: 2, category: 'เสื้อเชิ้ตแขนยาว', washIron: 20, washOnly: 10, ironOnly: 10, note: '' },
  { id: 3, category: 'เสื้อเชิ้ตแขนขาว', washIron: 20, washOnly: 10, ironOnly: 10, note: '' },
  { id: 4, category: 'เสื้อคลุม / เสื้อยืดใน', washIron: 10, washOnly: 10, ironOnly: 10, note: '' },
  { id: 5, category: 'เสื้อเด็กเล็ก / เสื้อกันหนาวบาง', washIron: 10, washOnly: 5, ironOnly: 5, note: '' },
  { id: 6, category: 'กางเกงยีนส์', washIron: 30, washOnly: 15, ironOnly: 20, note: '' },
  { id: 7, category: 'กางเกงขายาว / กางเกงแสลค', washIron: 15, washOnly: 8, ironOnly: 8, note: '' },
  { id: 8, category: 'กระโปรงสั้น', washIron: 20, washOnly: 10, ironOnly: 10, note: '' },
  { id: 9, category: 'กระโปรงยาว', washIron: 15, washOnly: 7, ironOnly: 8, note: '' },
  { id: 10, category: 'เดรสสั้น / เดรสยาว', washIron: 20, washOnly: 10, ironOnly: 10, note: '' },
  { id: 11, category: 'ผ้าห่ม', washIron: 30, washOnly: 15, ironOnly: 20, note: '' },
  { id: 12, category: 'ผ้าปูที่นอน / ผ้านวม', washIron: 20, washOnly: 10, ironOnly: 10, note: '' },
  { id: 13, category: 'ปลอกหมอน', washIron: 15, washOnly: null, ironOnly: null, note: '' },
  { id: 14, category: 'ผ้าม่านบาง 3 ฟุต', washIron: 15, washOnly: 7, ironOnly: 8, note: '' },
  { id: 15, category: 'ผ้าม่านบาง 6 ฟุต', washIron: 50, washOnly: 20, ironOnly: 30, note: '' },
  { id: 16, category: 'ผ้าม่าน 3 ฟุต', washIron: 60, washOnly: 30, ironOnly: 40, note: '' },
  { id: 17, category: 'ผ้าม่าน 6 ฟุต', washIron: 80, washOnly: null, ironOnly: null, note: '' },
  { id: 18, category: 'ปลอกผ้าม่วน', washIron: 150, washOnly: null, ironOnly: null, note: '' },
  { id: 19, category: 'ผ้าห่มเดี่ยว 3 ฟุต', washIron: 80, washOnly: 40, ironOnly: 40, note: '' },
  { id: 20, category: 'ผ้าห่มเดี่ยว 6 ฟุต', washIron: 70, washOnly: null, ironOnly: null, note: '' },
  { id: 21, category: 'ผ้าคลุมเดี่ยว 3 ฟุต', washIron: 80, washOnly: null, ironOnly: null, note: '' },
  { id: 22, category: 'ผ้าคลุมเดี่ยว 6 ฟุต', washIron: 60, washOnly: null, ironOnly: null, note: '' },
  { id: 23, category: 'ผ้ากันเปื้อน', washIron: 70, washOnly: null, ironOnly: null, note: '' },
  { id: 24, category: 'ผ้าปูโต๊ะ-เล็ก', washIron: 40, washOnly: 30, ironOnly: 30, note: '' },
  { id: 25, category: 'ผ้าปูโต๊ะ-ใหญ่', washIron: 60, washOnly: 35, ironOnly: 35, note: '' },
  { id: 26, category: 'ผ้าม่าน (คิดตามขนาด)', washIron: null, washOnly: null, ironOnly: null, note: '5 บาท/ตร.ม.' },
  { id: 27, category: 'ผ้าเช็ดหน้า / ผ้าเช็ดมือ', washIron: 5, washOnly: null, ironOnly: null, note: '' }
])

const isEditing = ref(false)

function toggleEdit() {
  if (isEditing.value) {
    // Save changes
    toast.add({
      title: 'บันทึกสำเร็จ',
      description: 'บันทึกราคาเรียบร้อยแล้ว',
      icon: 'i-lucide-check',
      color: 'success'
    })
  }
  isEditing.value = !isEditing.value
}

function formatPrice(price: number | null): string {
  if (price === null) return '-'
  return price.toString()
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <UPageCard
      title="ตารางราคาซักรีด"
      description="จัดการราคาบริการซักรีดและรีดผ้า"
      variant="naked"
      class="mb-4"
    >
      <template #footer>
        <UButton
          :label="isEditing ? 'บันทึกการเปลี่ยนแปลง' : 'แก้ไขราคา'"
          :icon="isEditing ? 'i-lucide-save' : 'i-lucide-edit'"
          :color="isEditing ? 'primary' : 'neutral'"
          @click="toggleEdit"
        />
      </template>
    </UPageCard>

    <UPageCard variant="subtle">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-primary text-primary-foreground ">
              <th class="border border-default px-4 py-3 text-center font-medium text-sm">ลำดับ</th>
              <th class="border border-default px-4 py-3 text-left font-medium text-sm min-w-[250px]">รายการ</th>
              <th class="border border-default px-4 py-3 text-center font-medium text-sm">
                <div>ซักอบรีด</div>
                <div class="text-xs font-normal">(บาท)</div>
              </th>
              <th class="border border-default px-4 py-3 text-center font-medium text-sm">
                <div>ซักอย่างเดียว</div>
                <div class="text-xs font-normal">(เดี่ยว)</div>
              </th>
              <th class="border border-default px-4 py-3 text-center font-medium text-sm">
                <div>รีดอย่างเดียว</div>
                <div class="text-xs font-normal">(เดี่ยว)</div>
              </th>
              <th class="border border-default px-4 py-3 text-center font-medium text-sm min-w-[150px]">หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in priceList"
              :key="item.id"
              class="hover:bg-elevated/50 transition-colors"
            >
              <td class="border border-default px-4 py-2 text-center text-sm">{{ item.id }}</td>
              <td class="border border-default px-4 py-2 text-sm">{{ item.category }}</td>
              <td class="border border-default px-4 py-2 text-center">
                <UInput
                  v-if="isEditing && item.washIron !== null"
                  v-model="item.washIron"
                  type="number"
                  class="w-20 mx-auto"
                  size="sm"
                />
                <span v-else class="text-sm">{{ formatPrice(item.washIron) }}</span>
              </td>
              <td class="border border-default px-4 py-2 text-center">
                <UInput
                  v-if="isEditing && item.washOnly !== null"
                  v-model="item.washOnly"
                  type="number"
                  class="w-20 mx-auto"
                  size="sm"
                />
                <span v-else class="text-sm">{{ formatPrice(item.washOnly) }}</span>
              </td>
              <td class="border border-default px-4 py-2 text-center">
                <UInput
                  v-if="isEditing && item.ironOnly !== null"
                  v-model="item.ironOnly"
                  type="number"
                  class="w-20 mx-auto"
                  size="sm"
                />
                <span v-else class="text-sm">{{ formatPrice(item.ironOnly) }}</span>
              </td>
              <td class="border border-default px-4 py-2 text-center text-sm text-muted">
                {{ item.note || '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UPageCard>
  </div>
</template>

<style scoped>
/* Custom scrollbar for table */
.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: var(--color-gray-100);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: var(--color-gray-300);
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: var(--color-gray-400);
}

/* Make table more compact on mobile */
@media (max-width: 768px) {
  table {
    font-size: 0.75rem;
  }
  
  th, td {
    padding: 0.5rem !important;
  }
}
</style>
