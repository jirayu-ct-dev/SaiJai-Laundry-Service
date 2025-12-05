<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const fileRef = ref<HTMLInputElement>()
const { user } = useUser()

const profileSchema = z.object({
  name: z.string().min(2, 'กรุณากรอกชื่อ'),
  email: z.email('กรุณากรอกอีเมลที่ถูกต้อง'),
  username: z.string().min(2, 'กรุณากรอกชื่อผู้ใช้'),
  avatar: z.string().optional(),
  bio: z.string().optional()
})


type ProfileSchema = z.output<typeof profileSchema>

const profile = reactive<Partial<ProfileSchema>>({
  name: user.value?.name || '',
  email: user.value?.email || '',
  username: '',
  avatar: '',
  bio: ''
})
const toast = useToast()
const onSubmit = (event: FormSubmitEvent<ProfileSchema>) => {
  toast.add({
    title: 'สำเร็จ',
    description: 'บันทึกการตั้งค่าเรียบร้อยแล้ว',
    icon: 'i-lucide-check',
    color: 'success'
  })
  console.log(event.data)
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) {
    return
  }

  profile.avatar = URL.createObjectURL(input.files[0]!)
}

function onFileClick() {
  fileRef.value?.click()
}
</script>

<template>
  <UForm
    id="settings"
    :schema="profileSchema"
    :state="profile"
    @submit="onSubmit"
  >
    <UPageCard
      title="โปรไฟล์"
      description="ข้อมูลเหล่านี้จะแสดงต่อสาธารณะ"
      variant="naked"
      orientation="horizontal"
      class="mb-4"
    >
      <UButton
        form="settings"
        label="บันทึกการเปลี่ยนแปลง"
        color="neutral"
        type="submit"
        class="w-fit lg:ms-auto"
      />
    </UPageCard>

    <UPageCard variant="subtle">
      <UFormField
        name="name"
        label="ชื่อ"
        description="จะแสดงในใบเสร็จ การแจ้งเตือน และการสื่อสารอื่นๆ"
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="profile.name"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="email"
        label="อีเมล"
        description="ใช้สำหรับเข้าสู่ระบบ และแก้ไขรหัสผ่าน"
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="profile.email"
          type="email"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="username"
        label="ชื่อผู้ใช้"
        description="ชื่อผู้ใช้เฉพาะของคุณสำหรับเข้าสู่ระบบและ URL โปรไฟล์"
        required
        class="flex max-sm:flex-col justify-between items-start gap-4"
      >
        <UInput
          v-model="profile.username"
          type="username"
          autocomplete="off"
        />
      </UFormField>
      <USeparator />
      <UFormField
        name="avatar"
        label="รูปโปรไฟล์"
        description="JPG, GIF หรือ PNG ขนาดไม่เกิน 1MB"
        class="flex max-sm:flex-col justify-between sm:items-center gap-4"
      >
        <div class="flex flex-wrap items-center gap-3">
          <UAvatar
            :src="profile.avatar"
            :alt="profile.name"
            size="lg"
          />
          <UButton
            label="เลือกไฟล์"
            color="neutral"
            @click="onFileClick"
          />
          <input
            ref="fileRef"
            type="file"
            class="hidden"
            accept=".jpg, .jpeg, .png, .gif"
            @change="onFileChange"
          >
        </div>
      </UFormField>
      <USeparator />
      <UFormField
        name="bio"
        label="ประวัติย่อ"
        description="คำอธิบายสั้นๆ สำหรับโปรไฟล์ของคุณ URL จะถูกเชื่อมโยงอัตโนมัติ"
        class="flex max-sm:flex-col justify-between items-start gap-4"
        :ui="{ container: 'w-full' }"
      >
        <UTextarea
          v-model="profile.bio"
          :rows="5"
          autoresize
          class="w-full"
        />
      </UFormField>
    </UPageCard>
  </UForm>
</template>
