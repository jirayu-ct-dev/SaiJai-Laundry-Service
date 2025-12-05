<script setup lang="ts">
import * as z from 'zod'
import type { FormError } from '@nuxt/ui'

const passwordSchema = z.object({
  current: z.string().min(8, 'ความยาวอย่างน้อย 8 ตัวอักษร'),
  new: z.string().min(8, 'ความยาวอย่างน้อย 8 ตัวอักษร')
})

type PasswordSchema = z.output<typeof passwordSchema>

const password = reactive<Partial<PasswordSchema>>({
  current: '',
  new: ''
})

const validate = (state: Partial<PasswordSchema>): FormError[] => {
  const errors: FormError[] = []
  if (state.current && state.new && state.current === state.new) {
    errors.push({ name: 'new', message: 'รหัสผ่านใหม่ต้องต่างจากรหัสผ่านปัจจุบัน' })
  }
  return errors
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <UPageCard
      title="รหัสผ่าน"
      description="ยืนยันรหัสผ่านปัจจุบันก่อนตั้งรหัสผ่านใหม่"
      variant="subtle"
    >
      <UForm
        :schema="passwordSchema"
        :state="password"
        :validate="validate"
        class="flex flex-col gap-4 max-w-xs"
      >
        <UFormField name="current">
          <UInput
            v-model="password.current"
            type="password"
            placeholder="รหัสผ่านปัจจุบัน"
            class="w-full"
          />
        </UFormField>

        <UFormField name="new">
          <UInput
            v-model="password.new"
            type="password"
            placeholder="รหัสผ่านใหม่"
            class="w-full"
          />
        </UFormField>

        <UButton label="อัพเดท" class="w-fit" type="submit" />
      </UForm>
    </UPageCard>

    <UPageCard
      title="บัญชี"
      description="ไม่ต้องการใช้บริการของเราอีกต่อไปหรือไม่? คุณสามารถลบบัญชีของคุณได้ที่นี่ การกระทำนี้ไม่สามารถย้อนกลับได้ ข้อมูลทั้งหมดจะถูกลบอย่างถาวร"
      class="bg-linear-to-tl from-error/10 from-5% to-default"
    >
      <template #footer>
        <UButton label="ลบบัญชี" color="error" />
      </template>
    </UPageCard>
  </div>
</template>
