<script setup lang="ts">
import type { ButtonProps } from '#ui/types'

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

</script>
<template>
    <div class="flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
        <UPageHero 
            headline="บริการดูแลผ้าแบบครบวงจร" 
            description="บริการซัก อบ รีด และดูแลผ้าอย่างพิถีพิถัน ส่งตรงถึงหน้าบ้านของคุณ" 
            :links="links"
        >
            <template #title>
                <ClientOnly>
                    <h1>
                        <span class="text-primary">ใส่ใจ </span>
                        <span class="text-gray-900 dark:text-white">ผ้าเรียบ</span>
                    </h1>
                </ClientOnly>
            </template>
        </UPageHero>
        <nuxt-img src="/logo-saijai-laundry-service.png" alt="logo-saijai-laundry-service"
            class="relative mx-auto max-w-xs sm:max-w-sm lg:max-w-md object-contain" />
    </div>

    <div class="mt-20 space-y-24">
        <section id="per-item-pricing" class="scroll-mt-28">
            <UPageSection
                headline="ค่าบริการ"
                title="แพ็กเกจและการคิดค่าบริการ"
                description="เลือกบริการซัก อบ รีด หรือบริการเสริมอื่น ๆ ได้ตามต้องการ พร้อมราคาที่โปร่งใส"
                orientation="horizontal"
            />
        </section>

        <section id="monthly-membership" class="scroll-mt-28">
            <UPageSection
                headline="สมัครสมาชิก"
                title="สะดวก ประหยัด ด้วยแพ็กเกจสมาชิกรายเดือน"
                description="รับสิทธิพิเศษและส่วนลดสำหรับการใช้งานบริการซักรีดประจำ พร้อมสะสมแต้มทุกครั้ง"
                orientation="horizontal"
            />
        </section>

        <section id="status-tracking" class="scroll-mt-28">
            <UPageSection
                headline="เช็คสถานะ"
                title="อัปเดตสถานะผ้าของคุณแบบเรียลไทม์"
                description="ติดตามขั้นตอนตั้งแต่รับผ้าถึงส่งคืนผ่านระบบติดตามสถานะในแอป"
                orientation="horizontal"
            />
        </section>

        <section id="faq" class="scroll-mt-28">
            <UPageSection
                headline="คำถามที่พบบ่อย"
                title="คำตอบสำหรับปัญหาที่คุณอยากรู้"
                description="รวมคำถามเกี่ยวกับการใช้งาน การรับส่ง และการดูแลผ้า เพื่อให้คุณมั่นใจทุกขั้นตอน"
                orientation="horizontal"
            />
        </section>

        <section id="contact" class="scroll-mt-28">
            <UPageSection
                headline="ติดต่อเรา"
                title="พร้อมดูแลทุกคำถาม"
                description="พูดคุยกับทีมงานผ่าน LINE, โทรศัพท์ หรืออีเมล เพื่อรับการช่วยเหลือทันที"
                orientation="horizontal"
            />
        </section>
    </div>
</template>
