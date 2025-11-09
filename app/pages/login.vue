<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Liff } from '@line/liff'
import type { FormSubmitEvent, AuthFormField, ButtonProps } from '@nuxt/ui'
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
const { login, loginWithGoogle } = useUser()
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
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox'
}]

const providers = ref<ButtonProps[]>([
  {
    label: 'Line',
    icon: 'i-simple-icons-line',
    color: 'neutral',
    variant: 'subtle',
    onClick: () => {
      void onloginWithLine()
    }
  }
])

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
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

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
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

const onloginWithLine = async () => {
  try {
    await ensureInit()
    if (!liff.isLoggedIn()) {
      liff.login()
      return
    }
    loggedIn.value = true
    profile.value = await liff.getProfile()
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : String(err)
  }
}

</script>

<template>
    <div class="max-w-md mx-auto">
        <!-- <form @submit.prevent="onLogin">
            <div class="flex flex-col gap-1">

                <UFormField label="Email">
                    <UInput v-model="input.email" name="email" class="w-full" placeholder="Email" type="email" />
                </UFormField>

                <UFormField label="Password">
                    <UInput v-model="input.password" name="password" class="w-full" placeholder="Password" type="password" />
                </UFormField>

                <div class="mt-4">
                    <UButton type="submit" block :loading="loading">Sign Up</UButton>
                </div>
            </div>
        </form> -->

        <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        :fields="fields"
        :providers="providers"
        title="ลงชื่อเข้าใช้"
        icon="i-lucide-lock"
        @submit="onSubmit"
      >
        <template #description>
          ยังไม่มีบัญชี? <ULink to="/sign-up" class="text-primary font-medium">Sign up</ULink>.
        </template>
        <template #password-hint>
          <ULink to="#" class="text-primary font-medium" tabindex="-1">ลืมรหัสผ่าน?</ULink>
        </template>
        <template #validation>
          <UAlert color="error" icon="i-lucide-info" title="Error signing in" />
        </template>
      </UAuthForm>
    </UPageCard>
    </div>
</template>