<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { User } from '~/types'


const schema = z.object({
  name: z.string().min(2, 'กรุณากรอกชื่อผู้ใช้'),
  email: z.email('กรุณากรอกอีเมล'),
  password: z.string().min(8, 'กรุณากรอกรหัสผ่าน')
})
const open = ref(false)

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: '',
  email: '',
  password: ''
})

const toast = useToast()

// Password visibility state
const showPassword = ref(false)

// Generate random password
function generateRandomPassword() {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*_'
  const allChars = uppercase + lowercase + numbers + symbols
  
  const length = 12
  let password = ''
  
  // Ensure at least one of each type
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }
  
  // Shuffle the password
  password = password.split('').sort(() => Math.random() - 0.5).join('')
  
  state.password = password
  // showPassword.value = false
  
  toast.add({
    title: 'สร้างแล้ว',
    description: 'คัดลอกและเก็บรักษาไว้อย่างปลอดภัย',
    color: 'success'
  })
}

function copyPassword() {
  if (state.password) {
    navigator.clipboard.writeText(state.password)
    toast.add({ title: 'คัดลอกแล้ว', color: 'success' })
  }
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // toast.add({ title: 'สำเร็จ', description: `เพิ่มลูกค้า ${event.data.name} แล้ว`, color: 'success' })
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" title="เพิ่มผู้ใช้ใหม่" description="เพิ่มผู้ใช้ใหม่เข้าสู่ระบบ">
    <UButton label="เพิ่มผู้ใช้" icon="i-lucide-plus" />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="ชื่อ" name="name">
          <UInput v-model="state.name" placeholder="สมชาย ใจดี" class="w-full" />
        </UFormField>
        <UFormField label="อีเมล" name="email">
          <UInput v-model="state.email" placeholder="example@email.com" class="w-full" />
        </UFormField>
        <UFormField label="รหัสผ่าน" name="password">
          <UInput 
            v-model="state.password" 
            :type="showPassword ? 'text' : 'password'"
            class="w-full"
            placeholder="••••••••"
          >
            <template #trailing>
              <div class="flex items-center gap-1">
                <UButton
                  :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  @click="showPassword = !showPassword"
                />
                <UButton
                  v-if="state.password"
                  icon="i-lucide-copy"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  @click="copyPassword"
                />
              </div>
            </template>
          </UInput>
          <template #hint>
            <UButton
              label="สร้าง Password แบบสุ่ม"
              icon="i-lucide-refresh-cw"
              color="primary"
              variant="link"
              size="xs"
              class="mt-1"
              @click="generateRandomPassword"
            />
          </template>
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton
            label="ยกเลิก"
            color="neutral"
            variant="subtle"
            @click="open = false"
          />
          <UButton
            label="สร้าง"
            color="primary"
            variant="solid"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
