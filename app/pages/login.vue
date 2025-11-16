<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Liff } from '@line/liff'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'
import * as z from 'zod'


interface Profile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

const { $liff } = useNuxtApp()
const liff = await ($liff as Promise<Liff>)
const toast = useToast()
const { login } = useUser()
const loading = ref(false)
const message = ref('')
const error = ref<string | null>(null)
const loggedIn = ref(false)
const profile = ref<Profile | null>(null)

// const input = ref({
//     email: '',
//     password: ''
// })

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'อีเมล',
  placeholder: 'กรอกอีเมลของคุณ',
  required: true
}, {
  name: 'password',
  label: 'รหัสผ่าน',
  type: 'password',
  placeholder: 'กรอกรหัสผ่านของคุณ',
  required: true
}, {
  name: 'remember',
  label: 'จดจำฉัน',
  type: 'checkbox'
}]


const schema = z.object({
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  password: z.string().min(8, 'ต้องมีอย่างน้อย 8 ตัวอักษร')
})

type Schema = z.output<typeof schema>

const ensureInit = async () => {
  // ปลั๊กอินเรา init แล้วตั้งแต่ตอนโหลดหน้าอยู่แล้ว
  // รอให้ event loop ทำงานจบรอบหนึ่งเพื่อให้แน่ใจว่า LIFF ได้ init เรียบร้อยแล้ว
  await Promise.resolve()
}

onMounted(async () => {
  try {
    await ensureInit()
    message.value = 'LIFF init succeeded.'
    loggedIn.value = liff.isLoggedIn()
    if (loggedIn.value) {
      profile.value = await liff.getProfile()
    }
  } catch (err: unknown) {
    message.value = 'LIFF init failed.'
    error.value = err instanceof Error ? err.message : String(err)
  }
})

const onSubmit = async (payload: FormSubmitEvent<Schema>) => {
  console.log('Submitted', payload.data.email, payload.data.password)
  try {
    loading.value = true
    const data = await login(payload.data.email, payload.data.password)

    toast.add({
      title: `ลงชื่อเข้าใช้สำเร็จ! ${data.user.email}`,
      color: 'success'
    })

    // if(data.user.role)
    await navigateTo('/')
  } catch (error) {
    toast.add({
      title: (error as Error).message || 'ลงชื่อเข้าใช้ไม่สำเร็จ',
      color: 'error'
    })
    return
  }
  finally {
    loading.value = false
  }
}

// const onLogin = async () => {
//     try {
//         loading.value = true
//         const data = await login(input.value.email, input.value.password)

//         toast.add({
//             title: `Login Successful! on email ${data.user.email}`,
//             color: 'success'
//         })
//         await navigateTo('/')
//     } catch (error) {
//         toast.add({
//             title: (error as Error).message || 'Login Failed',
//             color: 'error'
//         })
//         return
//     }
//     finally {
//         loading.value = false
//     }
// }

// const onLoginWithGoogle = async () => {
//     try {
//         loading.value = true
//         await loginWithGoogle()

//         toast.add({
//             title: `Login Successful! on Google`,
//             color: 'success'
//         })
//         // await navigateTo('/')
//     } catch (error) {
//         toast.add({
//             title: (error as Error).message || 'Login Failed',
//             color: 'error'
//         })
//         return
//     }
//     finally {
//         loading.value = false
//     }
// }

</script>

<template>
  <div>
    <ClientOnly>
      <template #fallback>
        <div class="max-w-md mx-auto" />
      </template>
      <UPageCard class="max-w-md mx-auto">

        <UAuthForm 
          :schema="schema" 
          :fields="fields" 
          title="ลงชื่อเข้าใช้" 
          icon="i-lucide-lock" 
          :submit="{
            label: 'ลงชื่อเข้าใช้',
            color: 'primary',
          }" 
          @submit="onSubmit"
        >
          <template #description>
            ยังไม่มีบัญชี? <ULink to="/sign-up" class="text-primary font-medium">สมัครสมาชิก</ULink>
            <div class="my-6">
              <ButtonLoginWithLine />
            </div>
            <USeparator label="หรือ" />
          </template>
          <template #password-hint>
            <ULink to="#" class="text-primary font-medium" tabindex="-1">ลืมรหัสผ่าน?</ULink>
          </template>
          <template #validation>
            <UAlert color="error" icon="i-lucide-info" title="Error signing in" />
          </template>
        </UAuthForm>
      </UPageCard>
    </ClientOnly>
  </div>
</template>