<script setup lang="ts">
import type { ButtonProps } from '#ui/types'
import { type Liff } from '@line/liff'

const { $liff } = useNuxtApp()
// const liff = await ($liff as Promise<Liff>)
const toast = useToast()
const { user, loginWithLine } = useUser()
const addLineFriend = ref(false)
const os = ref('')




const links = ref<ButtonProps[]>([
    {
        label: 'ค่าบริการ',
        to: { path: '/', hash: '#per-item-pricing', force: true },
        icon: 'i-lucide-square-play',
        color: 'primary'
    },
    {
        label: 'สมัครสมาชิก',
        to: { path: '/', hash: '#monthly-membership', force: true },
        color: 'primary',
        variant: 'subtle',
        trailingIcon: 'i-lucide-arrow-right'
    }
])


onMounted(async () => {
  try {
    const liff = (await $liff) as Liff  // ได้จากปลั๊กอินที่ init แล้ว
    os.value = liff.getOS() || ''
    if(liff.getOS() === 'web') return

    // 1) ถ้ายังไม่ล็อกอิน LIFF → เรียก login แล้วหยุด flow (จะรีไดเรกต์กลับหน้าเดิม)
    // if (!liff.isLoggedIn()) {
    //   liff.login()
    //   return
    // }

    // 2) ดึงโทเคนจาก LIFF (SDK การันตีว่าเชื่อถือได้)
    const idToken = liff.getIDToken()
    const accessToken = liff.getAccessToken()
    if (!idToken || !accessToken) throw new Error('No LINE tokens')

    // 3) ส่งเข้า Better Auth แบบ “idToken sign-in” (จะไม่ redirect)
    await loginWithLine(accessToken, idToken)

    // 4) (ออปชัน) โหลด session เพื่อให้แน่ใจว่ามี user แล้ว
    //   const { data: session } = await authClient.getSession()

    // 5) เช็คเป็นเพื่อน OA หรือยัง (ไม่บังคับ แต่แสดง CTA ได้)
    let friendFlag = false
    try {
      const res = await liff.getFriendship()
      friendFlag = !!res?.friendFlag
      addLineFriend.value = friendFlag
    } catch { /* ข้ามไป ถ้า channel ยังไม่ได้ลิงก์ OA */ }

    toast.add({
      title: friendFlag ? 'ล็อกอินสำเร็จ (เป็นเพื่อน OA แล้ว)' : 'ล็อกอินสำเร็จ (ยังไม่ได้เพิ่มเพื่อน OA)',
      color: 'success'
    })
  } catch (e) {
    console.error(e)
    toast.add({ title: 'LIFF Login Failed', color: 'error' })
  }
})
</script>
<template>
    <div>
        <div class="flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
            <UPageHero 
                headline="บริการดูแลผ้าแบบครบวงจร"
                description="บริการซัก อบ รีด และดูแลผ้าอย่างพิถีพิถัน ส่งตรงถึงหน้าบ้านของคุณ" :links="links">
                <template #title>
                    <ClientOnly>
                        <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                            <span class="text-primary">ใส่ใจ </span>
                            <span class="text-gray-900 dark:text-white">ผ้าเรียบ</span>
                        </h1>
                        <h2 class="text-2xl sm:text-7xl lg:text-4xl xl:text-5xl">
                            <span class="text-gray-900">LAUNDRY SERVICE</span>
                        </h2>
                    </ClientOnly>
                </template>
            </UPageHero>
            <nuxt-img 
                src="/logo-saijai-laundry-service.png" alt="logo-saijai-laundry-service"
                class="relative mx-auto max-w-xs sm:max-w-sm lg:max-w-md object-contain" />
        </div>

        <pre>
            os: {{ os }}
            {{ addLineFriend }}
            user: {{ user || 'No Login User' }}
        </pre>
    </div>


</template>
