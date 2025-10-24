## 🎯 Project Overview

SaiJai Laundry Service เป็นระบบซักอบรีดอัจฉริยะที่พัฒนาขึ้นเพื่อใช้จริงในร้านของอาจารย์สกรณ์ บุษบง มหาวิทยาลัยราชภัฏบุรีรัมย์ โดยมีวัตถุประสงค์ในการลดงานเอกสาร เพิ่มความสะดวกให้ลูกค้า และสร้างระบบจัดการหลังร้านที่มีประสิทธิภาพ

**Features**

* ✅ ระบบแจ้งเตือนสถานะผ้าอัตโนมัติผ่าน LINE OA (รับผ้า → ซักผ้า → อบ → รีด → พร้อมรับ)
* ✅ ระบบสมาชิกสะสมแต้ม และรายเดือน
* ✅ Dashboard สำหรับพนักงาน: จัดการรายการผ้า ลูกค้า และสถิติรายได้
* ✅ ระบบ Login ด้วย LINE LIFF + Better Auth
* ✅ รองรับการขยายในอนาคตด้วย Docker และ Cloud Deployment

---

## 🛠 Tech Stack

| Category       | Technology                          |
| -------------- | ----------------------------------- |
| Frontend       | Nuxt 3, TypeScript, TailwindCSS     |
| Backend        | Supabase (PostgreSQL), Prisma ORM   |
| Authentication | Better Auth with LINE LIFF          |
| Deployment     | Cloudflare / Vercel / Railway (TBD) |
| DevOps         | Docker, GitHub CI/CD                |

---

## 📌 System Architecture

* LINE OA → LIFF → Nuxt Frontend (Customer Portal)
* Nuxt Admin → Supabase Backend → Prisma ORM
* Real-time Notifications via Messaging API
  (สามารถเพิ่มภาพ Diagram ทีหลัง)

---

## 🚀 Key Objectives

1. พัฒนาระบบที่ใช้งานได้จริงในร้าน SaiJai Laundry Service
2. ยกระดับประสบการณ์ลูกค้า ด้วยการแจ้งเตือนอัตโนมัติ
3. ลดภาระงานพนักงาน และเพิ่มประสิทธิภาพงานซักรีด

---

## 👨‍🏫 Advisor

**อาจารย์สกรณ์ บุษบง**
คณะวิทยาศาสตร์ สาขาวิทยาการคอมพิวเตอร์
มหาวิทยาลัยราชภัฏบุรีรัมย์

---

## 📄 License

This project is developed for academic purposes and real business deployment. All rights reserved © SaiJai Laundry Service.

---

