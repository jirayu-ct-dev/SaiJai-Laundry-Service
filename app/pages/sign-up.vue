<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'


const toast = useToast()
const loading = ref(false)

type Schema = z.output<typeof schema>

const schema = z.object({
    name: z.string('Name is required'),
    email: z.email('Invalid email'),
    password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})


const fields: AuthFormField[] = [
    {
        name: 'name',
        type: 'text',
        label: 'ชื่อ',
        placeholder: 'กรอกชื่อของคุณ',
        required: true,
        error: 'กรุณากรอกชื่อ'
    },
    {
        name: 'email',
        type: 'email',
        label: 'อีเมล',
        placeholder: 'กรอกอีเมลของคุณ',
        required: true,
        error: 'กรุณากรอกอีเมล'
    }, 
    {
        name: 'password',
        label: 'รหัสผ่าน',
        type: 'password',
        placeholder: 'กรอกรหัสผ่านของคุณ',
        required: true,
        error: 'กรุณากรอกรหัสผ่าน'
    }
]

const onSubmit = async(payload: FormSubmitEvent<Schema>) => {
    try {
        loading.value = true
        

        const { data, error } = await authClient.signUp.email({
            name: payload.data.name,
            email: payload.data.email,
            password: payload.data.password
        })

        if(error) {
            toast.add({
                title: error.message || 'สมัครสมาชิกไม่สำเร็จ',
                color: 'error'
            })
            return
        }

        toast.add({
            title: `สมัครสมาชิกสำเร็จ! คุณสามารถลงชื่อเข้าใช้ได้ทันที ${data.user.email}`,
            color: 'success'
        })

        await navigateTo('/login')
    } catch (error) {
        toast.add({
            title: (error as Error).message || 'สมัครสมาชิกไม่สำเร็จ',
            color: 'error'
        })
        return
    }
    finally {
        loading.value = false
    }
}

</script>

<template>
        <ClientOnly>
          <UPageCard class="max-w-md mx-auto">
            <UAuthForm
              :schema="schema"
              :fields="fields"
              title="ลงชื่อเข้าใช้"
              icon="i-lucide-lock"
              :loading="loading"
              button-label="ลงชื่อเข้าใช้"
              :submit="{
                label: 'สมัครสมาชิก',
                color: 'primary',
              }"
              @submit="onSubmit"
            >
            <template #description>
              มีบัญชีแล้ว? <ULink to="/login" class="text-primary font-medium">ลงชื่อเข้าใช้</ULink>
              <div class="my-6">
                <ClientOnly>
                  <ButtonLoginWithLine />
                </ClientOnly>
              </div>
              <USeparator label="หรือ" />
            </template>
            <!-- <template #password-hint>
              <ULink to="#" class="text-primary font-medium" tabindex="-1">ลืมรหัสผ่าน?</ULink>
            </template> -->
            <!-- <template #validation>
              <UAlert color="error" icon="i-lucide-info" title="Error signing in" />
            </template> -->
            </UAuthForm>
          </UPageCard>
          <template #fallback>
            <div class="max-w-md mx-auto" />
          </template>
        </ClientOnly>
</template>