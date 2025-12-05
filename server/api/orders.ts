const orders = [
    {
        status: "success",
        data: [
            {
                id: 5001,
                orderType: "PACKAGE",
                currentStatus: "WASHING",
                basketQrId: "BASKET-A01",
                creditsUsed: 15,
                userPackageId: 1001,
                notes: "ผ้าห่มมีขนสัตว์เลี้ยง กรุณาขจัดให้ดี",
                deliveryAddressId: 201,
                createdAt: "2025-11-25T10:00:00Z",
                customer: {
                    id: "cuid_customer_001",
                    name: "สมชาย รักสะอาด",
                    phoneNumber: "081-234-5678"
                },
                employee: {
                    id: "cuid_employee_001",
                    name: "พนักงาน A"
                }
            },
            {
                id: 5002,
                orderType: "STOREFRONT",
                currentStatus: "PENDING_CHECK",
                basketQrId: "BASKET-B02",
                totalAmount: 340.00,
                notes: "ลูกค้ารอด่วน รับภายในวันนี้",
                createdAt: "2025-11-25T11:30:00Z",
                customer: {
                    id: "cuid_customer_002",
                    name: "สมหญิง จริงใจ",
                    phoneNumber: "082-345-6789"
                },
                employee: null
            },
            {
                id: 5003,
                orderType: "PACKAGE",
                currentStatus: "DRYING",
                basketQrId: "BASKET-A03",
                creditsUsed: 20,
                userPackageId: 1002,
                deliveryAddressId: 202,
                notes: null,
                createdAt: "2025-11-24T09:15:00Z",
                customer: {
                    id: "cuid_customer_003",
                    name: "วิชัย มั่นคง",
                    phoneNumber: "083-456-7890"
                },
                employee: {
                    id: "cuid_employee_002",
                    name: "พนักงาน B"
                }
            },
            {
                id: 5004,
                orderType: "STOREFRONT",
                currentStatus: "IRONING",
                basketQrId: "BASKET-B04",
                totalAmount: 580.00,
                notes: "รีดให้เรียบร้อย มีเสื้อเชิ้ตธุรกิจ",
                createdAt: "2025-11-24T14:20:00Z",
                customer: {
                    id: "cuid_customer_004",
                    name: "กมลวรรณ สวยงาม",
                    phoneNumber: "084-567-8901"
                },
                employee: {
                    id: "cuid_employee_003",
                    name: "พนักงาน C"
                }
            },
            {
                id: 5005,
                orderType: "PACKAGE",
                currentStatus: "READY_FOR_PICKUP",
                basketQrId: "BASKET-A05",
                creditsUsed: 12,
                userPackageId: 1003,
                deliveryAddressId: null,
                notes: "ลูกค้ามารับเอง ไม่ต้องส่ง",
                createdAt: "2025-11-23T08:30:00Z",
                customer: {
                    id: "cuid_customer_005",
                    name: "ประเสริฐ ชนะเลิศ",
                    phoneNumber: "085-678-9012"
                },
                employee: {
                    id: "cuid_employee_001",
                    name: "พนักงาน A"
                }
            },
            {
                id: 5006,
                orderType: "STOREFRONT",
                currentStatus: "COMPLETED",
                basketQrId: "BASKET-B06",
                totalAmount: 920.00,
                notes: "ลูกค้ารับผ้าแล้ว ชำระเงินครบถ้วน",
                createdAt: "2025-11-22T10:00:00Z",
                customer: {
                    id: "cuid_customer_006",
                    name: "สุกัญญา เจริญรุ่ง",
                    phoneNumber: "086-789-0123"
                },
                employee: {
                    id: "cuid_employee_002",
                    name: "พนักงาน B"
                }
            },
            {
                id: 5007,
                orderType: "PACKAGE",
                currentStatus: "COMPLETED",
                basketQrId: "BASKET-A07",
                creditsUsed: 18,
                userPackageId: 1004,
                deliveryAddressId: 203,
                notes: "จัดส่งสำเร็จ ลูกค้าพอใจมาก",
                createdAt: "2025-11-21T13:45:00Z",
                customer: {
                    id: "cuid_customer_007",
                    name: "ธนวัฒน์ วงศ์ใหญ่",
                    phoneNumber: "087-890-1234"
                },
                employee: {
                    id: "cuid_employee_003",
                    name: "พนักงาน C"
                }
            },
            {
                id: 5008,
                orderType: "STOREFRONT",
                currentStatus: "CANCELLED",
                basketQrId: "BASKET-B08",
                totalAmount: 0,
                notes: "ลูกค้ายกเลิก - ติดธุระด่วน",
                createdAt: "2025-11-26T16:00:00Z",
                customer: {
                    id: "cuid_customer_008",
                    name: "รัตนา ศรีสุข",
                    phoneNumber: "088-901-2345"
                },
                employee: null
            },
            {
                id: 5009,
                orderType: "PACKAGE",
                currentStatus: "WASHING",
                basketQrId: "BASKET-A09",
                creditsUsed: 25,
                userPackageId: 1005,
                deliveryAddressId: 204,
                notes: "แพ็คเกจพรีเมียม - ใช้ผงซักฟอกพิเศษ",
                createdAt: "2025-11-26T07:30:00Z",
                customer: {
                    id: "cuid_customer_009",
                    name: "อนุชา ดีเด่น",
                    phoneNumber: "089-012-3456"
                },
                employee: {
                    id: "cuid_employee_001",
                    name: "พนักงาน A"
                }
            },
            {
                id: 5010,
                orderType: "STOREFRONT",
                currentStatus: "READY_FOR_PICKUP",
                basketQrId: "BASKET-B10",
                totalAmount: 450.00,
                notes: "แจ้งลูกค้าแล้ว รอมารับในตอนเย็น",
                createdAt: "2025-11-25T15:00:00Z",
                customer: {
                    id: "cuid_customer_010",
                    name: "มนัสนันท์ รุ่งเรือง",
                    phoneNumber: "090-123-4567"
                },
                employee: {
                    id: "cuid_employee_002",
                    name: "พนักงาน B"
                }
            }
        ]
    }
]


const orderDetail = [
    // 1. STOREFRONT - PENDING_CHECK
    {
        status: "success",
        data: {
            id: 5002,
            orderType: "STOREFRONT",
            currentStatus: "PENDING_CHECK",
            totalAmount: 340.00,
            basketQrId: "BASKET-B02",
            notes: "ลูกค้ารอด่วน รับภายในวันนี้",
            deliveryAddressId: null,
            creditsUsed: null,
            userPackageId: null,
            createdAt: "2025-11-25T11:30:00Z",
            updatedAt: "2025-11-25T11:30:00Z",
            customer: {
                id: "cuid_customer_002",
                name: "สมหญิง จริงใจ",
                email: "somying@example.com",
                phoneNumber: "082-345-6789",
                lineUserId: "Ue82345"
            },
            employee: null,
            deliveryAddress: null,
            orderItems: [
                {
                    id: 901,
                    quantity: 2,
                    unitPrice: 150.00,
                    totalPrice: 300.00,
                    storefrontPrice: {
                        id: 1001,
                        service: { id: 1, name: "ซักอบ" },
                        item: { id: 101, name: "ผ้าห่ม" }
                    },
                    images: []
                },
                {
                    id: 902,
                    quantity: 1,
                    unitPrice: 40.00,
                    totalPrice: 40.00,
                    storefrontPrice: {
                        id: 1002,
                        service: { id: 2, name: "ซักอบรีด" },
                        item: { id: 102, name: "เสื้อเชิ้ต" }
                    },
                    images: []
                }
            ],
            statusHistory: [
                {
                    id: 10001,
                    status: "PENDING_CHECK",
                    employeeId: null,
                    customerId: "cuid_customer_002",
                    notes: "ลูกค้ามาส่งผ้าหน้าร้าน",
                    createdAt: "2025-11-25T11:30:00Z"
                }
            ],
            images: []
        }
    },

    // 2. PACKAGE - WASHING
    {
        status: "success",
        data: {
            id: 5001,
            orderType: "PACKAGE",
            currentStatus: "WASHING",
            totalAmount: null,
            basketQrId: "BASKET-A01",
            notes: "ผ้าห่มมีขนสัตว์เลี้ยง กรุณาขจัดให้ดี",
            deliveryAddressId: 201,
            creditsUsed: 15,
            userPackageId: 1001,
            createdAt: "2025-11-25T10:00:00Z",
            updatedAt: "2025-11-25T10:45:00Z",
            customer: {
                id: "cuid_customer_001",
                name: "สมชาย รักสะอาด",
                email: "somchai@example.com",
                phoneNumber: "081-234-5678",
                lineUserId: "Ua81234"
            },
            employee: {
                id: "cuid_employee_001",
                name: "พนักงาน A",
                email: "employeeA@laundry.com"
            },
            deliveryAddress: {
                id: 201,
                addressLine1: "123 ถนนสุขุมวิท แขวงคลองเตย",
                city: "กรุงเทพมหานคร",
                postalCode: "10110",
                isDefault: true
            },
            orderItems: [
                {
                    id: 903,
                    quantity: 10,
                    unitPrice: 0,
                    totalPrice: 0,
                    storefrontPrice: {
                        id: 1003,
                        service: { id: 2, name: "ซักอบรีด" },
                        item: { id: 103, name: "เสื้อผ้าทั่วไป" }
                    },
                    images: []
                },
                {
                    id: 904,
                    quantity: 5,
                    unitPrice: 0,
                    totalPrice: 0,
                    storefrontPrice: {
                        id: 1004,
                        service: { id: 1, name: "ซักอบ" },
                        item: { id: 104, name: "ผ้าขนหนู" }
                    },
                    images: []
                }
            ],
            statusHistory: [
                {
                    id: 10002,
                    status: "PENDING_CHECK",
                    employeeId: null,
                    customerId: "cuid_customer_001",
                    notes: "ลูกค้าส่งผ้าผ่านระบบแพ็คเกจ",
                    createdAt: "2025-11-25T10:00:00Z"
                },
                {
                    id: 10003,
                    status: "WASHING",
                    employeeId: "cuid_employee_001",
                    customerId: null,
                    notes: "เริ่มซัก - ใช้โหมดขนสัตว์เลี้ยง",
                    createdAt: "2025-11-25T10:45:00Z"
                }
            ],
            images: [
                {
                    id: 1,
                    url: "https://res.cloudinary.com/demo/image/upload/basket-a01.jpg",
                    description: "รูปตะกร้าผ้าทั้งหมด"
                }
            ]
        }
    },

    // 3. PACKAGE - DRYING
    {
        status: "success",
        data: {
            id: 5003,
            orderType: "PACKAGE",
            currentStatus: "DRYING",
            totalAmount: null,
            basketQrId: "BASKET-A03",
            notes: null,
            deliveryAddressId: 202,
            creditsUsed: 20,
            userPackageId: 1002,
            createdAt: "2025-11-24T09:15:00Z",
            updatedAt: "2025-11-24T11:30:00Z",
            customer: {
                id: "cuid_customer_003",
                name: "วิชัย มั่นคง",
                email: "wichai@example.com",
                phoneNumber: "083-456-7890",
                lineUserId: "Uw83456"
            },
            employee: {
                id: "cuid_employee_002",
                name: "พนักงาน B",
                email: "employeeB@laundry.com"
            },
            deliveryAddress: {
                id: 202,
                addressLine1: "456 ถนนพระราม 4 แขวงสีลม",
                city: "กรุงเทพมหานคร",
                postalCode: "10500",
                isDefault: true
            },
            orderItems: [
                {
                    id: 905,
                    quantity: 15,
                    unitPrice: 0,
                    totalPrice: 0,
                    storefrontPrice: {
                        id: 1003,
                        service: { id: 2, name: "ซักอบรีด" },
                        item: { id: 103, name: "เสื้อผ้าทั่วไป" }
                    },
                    images: []
                },
                {
                    id: 906,
                    quantity: 5,
                    unitPrice: 0,
                    totalPrice: 0,
                    storefrontPrice: {
                        id: 1005,
                        service: { id: 3, name: "ซักแห้ง" },
                        item: { id: 105, name: "สูท" }
                    },
                    images: []
                }
            ],
            statusHistory: [
                {
                    id: 10004,
                    status: "PENDING_CHECK",
                    employeeId: null,
                    customerId: "cuid_customer_003",
                    notes: "ส่งผ้าทางไลน์",
                    createdAt: "2025-11-24T09:15:00Z"
                },
                {
                    id: 10005,
                    status: "WASHING",
                    employeeId: "cuid_employee_002",
                    customerId: null,
                    notes: "เริ่มซัก",
                    createdAt: "2025-11-24T10:00:00Z"
                },
                {
                    id: 10006,
                    status: "DRYING",
                    employeeId: "cuid_employee_002",
                    customerId: null,
                    notes: "ซักเสร็จ เริ่มอบแห้ง",
                    createdAt: "2025-11-24T11:30:00Z"
                }
            ],
            images: []
        }
    },

    // 4. STOREFRONT - IRONING
    {
        status: "success",
        data: {
            id: 5004,
            orderType: "STOREFRONT",
            currentStatus: "IRONING",
            totalAmount: 580.00,
            basketQrId: "BASKET-B04",
            notes: "รีดให้เรียบร้อย มีเสื้อเชิ้ตธุรกิจ",
            deliveryAddressId: null,
            creditsUsed: null,
            userPackageId: null,
            createdAt: "2025-11-24T14:20:00Z",
            updatedAt: "2025-11-24T16:45:00Z",
            customer: {
                id: "cuid_customer_004",
                name: "กมลวรรณ สวยงาม",
                email: "kamonwan@example.com",
                phoneNumber: "084-567-8901",
                lineUserId: "Uk84567"
            },
            employee: {
                id: "cuid_employee_003",
                name: "พนักงาน C",
                email: "employeeC@laundry.com"
            },
            deliveryAddress: null,
            orderItems: [
                {
                    id: 907,
                    quantity: 5,
                    unitPrice: 40.00,
                    totalPrice: 200.00,
                    storefrontPrice: {
                        id: 1002,
                        service: { id: 2, name: "ซักอบรีด" },
                        item: { id: 102, name: "เสื้อเชิ้ต" }
                    },
                    images: []
                },
                {
                    id: 908,
                    quantity: 2,
                    unitPrice: 150.00,
                    totalPrice: 300.00,
                    storefrontPrice: {
                        id: 1006,
                        service: { id: 3, name: "ซักแห้ง" },
                        item: { id: 106, name: "เดรส" }
                    },
                    images: []
                },
                {
                    id: 909,
                    quantity: 2,
                    unitPrice: 40.00,
                    totalPrice: 80.00,
                    storefrontPrice: {
                        id: 1007,
                        service: { id: 2, name: "ซักอบรีด" },
                        item: { id: 107, name: "กางเกงขายาว" }
                    },
                    images: []
                }
            ],
            statusHistory: [
                {
                    id: 10007,
                    status: "PENDING_CHECK",
                    employeeId: "cuid_employee_003",
                    customerId: null,
                    notes: "รับผ้าหน้าร้าน ตรวจนับ OK",
                    createdAt: "2025-11-24T14:20:00Z"
                },
                {
                    id: 10008,
                    status: "WASHING",
                    employeeId: "cuid_employee_003",
                    customerId: null,
                    notes: "เริ่มซัก แยกประเภทเสื้อผ้า",
                    createdAt: "2025-11-24T14:30:00Z"
                },
                {
                    id: 10009,
                    status: "DRYING",
                    employeeId: "cuid_employee_003",
                    customerId: null,
                    notes: "อบแห้ง",
                    createdAt: "2025-11-24T15:30:00Z"
                },
                {
                    id: 10010,
                    status: "IRONING",
                    employeeId: "cuid_employee_003",
                    customerId: null,
                    notes: "กำลังรีด ใช้ความร้อนปานกลาง",
                    createdAt: "2025-11-24T16:45:00Z"
                }
            ],
            images: []
        }
    },

    // 5. PACKAGE - READY_FOR_PICKUP
    {
        status: "success",
        data: {
            id: 5005,
            orderType: "PACKAGE",
            currentStatus: "READY_FOR_PICKUP",
            totalAmount: null,
            basketQrId: "BASKET-A05",
            notes: "ลูกค้ามารับเอง ไม่ต้องส่ง",
            deliveryAddressId: null,
            creditsUsed: 12,
            userPackageId: 1003,
            createdAt: "2025-11-23T08:30:00Z",
            updatedAt: "2025-11-23T14:20:00Z",
            customer: {
                id: "cuid_customer_005",
                name: "ประเสริฐ ชนะเลิศ",
                email: "prasert@example.com",
                phoneNumber: "085-678-9012",
                lineUserId: "Up85678"
            },
            employee: {
                id: "cuid_employee_001",
                name: "พนักงาน A",
                email: "employeeA@laundry.com"
            },
            deliveryAddress: null,
            orderItems: [
                {
                    id: 910,
                    quantity: 10,
                    unitPrice: 0,
                    totalPrice: 0,
                    storefrontPrice: {
                        id: 1003,
                        service: { id: 2, name: "ซักอบรีด" },
                        item: { id: 103, name: "เสื้อผ้าทั่วไป" }
                    },
                    images: []
                },
                {
                    id: 911,
                    quantity: 2,
                    unitPrice: 0,
                    totalPrice: 0,
                    storefrontPrice: {
                        id: 1008,
                        service: { id: 1, name: "ซักอบ" },
                        item: { id: 108, name: "ผ้าปูที่นอน" }
                    },
                    images: []
                }
            ],
            statusHistory: [
                {
                    id: 10011,
                    status: "PENDING_CHECK",
                    employeeId: null,
                    customerId: "cuid_customer_005",
                    notes: "ส่งผ้าทางแอพ",
                    createdAt: "2025-11-23T08:30:00Z"
                },
                {
                    id: 10012,
                    status: "WASHING",
                    employeeId: "cuid_employee_001",
                    customerId: null,
                    notes: "เริ่มซัก",
                    createdAt: "2025-11-23T09:00:00Z"
                },
                {
                    id: 10013,
                    status: "DRYING",
                    employeeId: "cuid_employee_001",
                    customerId: null,
                    notes: "อบแห้ง",
                    createdAt: "2025-11-23T11:00:00Z"
                },
                {
                    id: 10014,
                    status: "IRONING",
                    employeeId: "cuid_employee_001",
                    customerId: null,
                    notes: "รีดเสร็จ",
                    createdAt: "2025-11-23T13:00:00Z"
                },
                {
                    id: 10015,
                    status: "READY_FOR_PICKUP",
                    employeeId: "cuid_employee_001",
                    customerId: null,
                    notes: "แพ็คเสร็จ แจ้งลูกค้าแล้ว",
                    createdAt: "2025-11-23T14:20:00Z"
                }
            ],
            images: []
        }
    },

    // 6. STOREFRONT - COMPLETED
    {
        status: "success",
        data: {
            id: 5006,
            orderType: "STOREFRONT",
            currentStatus: "COMPLETED",
            totalAmount: 920.00,
            basketQrId: "BASKET-B06",
            notes: "ลูกค้ารับผ้าแล้ว ชำระเงินครบถ้วน",
            deliveryAddressId: null,
            creditsUsed: null,
            userPackageId: null,
            createdAt: "2025-11-22T10:00:00Z",
            updatedAt: "2025-11-22T18:30:00Z",
            customer: {
                id: "cuid_customer_006",
                name: "สุกัญญา เจริญรุ่ง",
                email: "sukanya@example.com",
                phoneNumber: "086-789-0123",
                lineUserId: "Us86789"
            },
            employee: {
                id: "cuid_employee_002",
                name: "พนักงาน B",
                email: "employeeB@laundry.com"
            },
            deliveryAddress: null,
            orderItems: [
                {
                    id: 912,
                    quantity: 2,
                    unitPrice: 280.00,
                    totalPrice: 560.00,
                    storefrontPrice: {
                        id: 1009,
                        service: { id: 3, name: "ซักแห้ง" },
                        item: { id: 109, name: "ผ้านวม Queen" }
                    },
                    images: [
                        {
                            id: 2,
                            url: "https://res.cloudinary.com/demo/image/upload/blanket-before.jpg",
                            description: "ผ้านวมก่อนซัก มีรอยเปื้อน"
                        }
                    ]
                },
                {
                    id: 913,
                    quantity: 3,
                    unitPrice: 120.00,
                    totalPrice: 360.00,
                    storefrontPrice: {
                        id: 1010,
                        service: { id: 3, name: "ซักแห้ง" },
                        item: { id: 110, name: "ม่าน" }
                    },
                    images: []
                }
            ],
            statusHistory: [
                {
                    id: 10016,
                    status: "PENDING_CHECK",
                    employeeId: "cuid_employee_002",
                    customerId: null,
                    notes: "รับผ้าหน้าร้าน",
                    createdAt: "2025-11-22T10:00:00Z"
                },
                {
                    id: 10017,
                    status: "WASHING",
                    employeeId: "cuid_employee_002",
                    customerId: null,
                    notes: "ซักแห้งพรีเมียม",
                    createdAt: "2025-11-22T10:30:00Z"
                },
                {
                    id: 10018,
                    status: "DRYING",
                    employeeId: "cuid_employee_002",
                    customerId: null,
                    notes: "อบด้วยความร้อนต่ำ",
                    createdAt: "2025-11-22T14:00:00Z"
                },
                {
                    id: 10019,
                    status: "READY_FOR_PICKUP",
                    employeeId: "cuid_employee_002",
                    customerId: null,
                    notes: "พร้อมส่งมอบ",
                    createdAt: "2025-11-22T16:00:00Z"
                },
                {
                    id: 10020,
                    status: "COMPLETED",
                    employeeId: "cuid_employee_002",
                    customerId: null,
                    notes: "ลูกค้ามารับ ชำระเงินสด 920 บาท",
                    createdAt: "2025-11-22T18:30:00Z"
                }
            ],
            images: [
                {
                    id: 3,
                    url: "https://res.cloudinary.com/demo/image/upload/order-5006-receipt.jpg",
                    description: "ใบเสร็จรับเงิน"
                }
            ]
        }
    },

    // 7. PACKAGE - COMPLETED (with delivery)
    {
        status: "success",
        data: {
            id: 5007,
            orderType: "PACKAGE",
            currentStatus: "COMPLETED",
            totalAmount: null,
            basketQrId: "BASKET-A07",
            notes: "จัดส่งสำเร็จ ลูกค้าพอใจมาก",
            deliveryAddressId: 203,
            creditsUsed: 18,
            userPackageId: 1004,
            createdAt: "2025-11-21T13:45:00Z",
            updatedAt: "2025-11-22T10:15:00Z",
            customer: {
                id: "cuid_customer_007",
                name: "ธนวัฒน์ วงศ์ใหญ่",
                email: "thanawat@example.com",
                phoneNumber: "087-890-1234",
                lineUserId: "Ut87890"
            },
            employee: {
                id: "cuid_employee_003",
                name: "พนักงาน C",
                email: "employeeC@laundry.com"
            },
            deliveryAddress: {
                id: 203,
                addressLine1: "789 ถนนสาทร แขวงทุ่งมหาเมฆ",
                city: "กรุงเทพมหานคร",
                postalCode: "10120",
                isDefault: false
            },
            orderItems: [
                {
                    id: 914,
                    quantity: 12,
                    unitPrice: 0,
                    totalPrice: 0,
                    storefrontPrice: {
                        id: 1003,
                        service: { id: 2, name: "ซักอบรีด" },
                        item: { id: 103, name: "เสื้อผ้าทั่วไป" }
                    },
                    images: []
                },
                {
                    id: 915,
                    quantity: 6,
                    unitPrice: 0,
                    totalPrice: 0,
                    storefrontPrice: {
                        id: 1011,
                        service: { id: 4, name: "รีดอย่างเดียว" },
                        item: { id: 102, name: "เสื้อเชิ้ต" }
                    },
                    images: []
                }
            ],
            statusHistory: [
                {
                    id: 10021,
                    status: "PENDING_CHECK",
                    employeeId: null,
                    customerId: "cuid_customer_007",
                    notes: "ส่งผ้าทางไลน์ มีรูปแนบ",
                    createdAt: "2025-11-21T13:45:00Z"
                },
                {
                    id: 10022,
                    status: "WASHING",
                    employeeId: "cuid_employee_003",
                    customerId: null,
                    notes: "เริ่มซัก",
                    createdAt: "2025-11-21T14:00:00Z"
                },
                {
                    id: 10023,
                    status: "DRYING",
                    employeeId: "cuid_employee_003",
                    customerId: null,
                    notes: "อบแห้ง",
                    createdAt: "2025-11-21T17:00:00Z"
                },
                {
                    id: 10024,
                    status: "IRONING",
                    employeeId: "cuid_employee_003",
                    customerId: null,
                    notes: "รีดเสร็จ",
                    createdAt: "2025-11-22T08:00:00Z"
                },
                {
                    id: 10025,
                    status: "READY_FOR_PICKUP",
                    employeeId: "cuid_employee_003",
                    customerId: null,
                    notes: "พร้อมจัดส่ง",
                    createdAt: "2025-11-22T09:00:00Z"
                },
                {
                    id: 10026,
                    status: "COMPLETED",
                    employeeId: "cuid_employee_003",
                    customerId: null,
                    notes: "จัดส่งสำเร็จ ลูกค้ายืนยันรับของแล้ว",
                    createdAt: "2025-11-22T10:15:00Z"
                }
            ],
            images: [
                {
                    id: 4,
                    url: "https://res.cloudinary.com/demo/image/upload/delivery-proof-5007.jpg",
                    description: "รูปหลักฐานการส่งมอบ"
                }
            ]
        }
    },

    // 8. STOREFRONT - CANCELLED
    {
        status: "success",
        data: {
            id: 5008,
            orderType: "STOREFRONT",
            currentStatus: "CANCELLED",
            totalAmount: 0,
            basketQrId: "BASKET-B08",
            notes: "ลูกค้ายกเลิก - ติดธุระด่วน",
            deliveryAddressId: null,
            creditsUsed: null,
            userPackageId: null,
            createdAt: "2025-11-26T16:00:00Z",
            updatedAt: "2025-11-26T16:15:00Z",
            customer: {
                id: "cuid_customer_008",
                name: "รัตนา ศรีสุข",
                email: "rattana@example.com",
                phoneNumber: "088-901-2345",
                lineUserId: "Ur88901"
            },
            employee: null,
            deliveryAddress: null,
            orderItems: [
                {
                    id: 916,
                    quantity: 3,
                    unitPrice: 40.00,
                    totalPrice: 120.00,
                    storefrontPrice: {
                        id: 1002,
                        service: { id: 2, name: "ซักอบรีด" },
                        item: { id: 102, name: "เสื้อเชิ้ต" }
                    },
                    images: []
                }
            ],
            statusHistory: [
                {
                    id: 10027,
                    status: "PENDING_CHECK",
                    employeeId: null,
                    customerId: "cuid_customer_008",
                    notes: "ลูกค้าสั่งทางไลน์",
                    createdAt: "2025-11-26T16:00:00Z"
                },
                {
                    id: 10028,
                    status: "CANCELLED",
                    employeeId: null,
                    customerId: "cuid_customer_008",
                    notes: "ลูกค้ายกเลิกเอง - ติดธุระด่วน ไม่สะดวกส่งผ้า",
                    createdAt: "2025-11-26T16:15:00Z"
                }
            ],
            images: []
        }
    },

    // 9. PACKAGE - WASHING (Premium with special items)
    {
        status: "success",
        data: {
            id: 5009,
            orderType: "PACKAGE",
            currentStatus: "WASHING",
            totalAmount: null,
            basketQrId: "BASKET-A09",
            notes: "แพ็คเกจพรีเมียม - ใช้ผงซักฟอกพิเศษ",
            deliveryAddressId: 204,
            creditsUsed: 25,
            userPackageId: 1005,
            createdAt: "2025-11-26T07:30:00Z",
            updatedAt: "2025-11-26T08:15:00Z",
            customer: {
                id: "cuid_customer_009",
                name: "อนุชา ดีเด่น",
                email: "anucha@example.com",
                phoneNumber: "089-012-3456",
                lineUserId: "Ua89012"
            },
            employee: {
                id: "cuid_employee_001",
                name: "พนักงาน A",
                email: "employeeA@laundry.com"
            },
            deliveryAddress: {
                id: 204,
                addressLine1: "321 ถนนพระราม 9 แขวงห้วยขวาง",
                city: "กรุงเทพมหานคร",
                postalCode: "10310",
                isDefault: true
            },
            orderItems: [
                {
                    id: 917,
                    quantity: 15,
                    unitPrice: 0,
                    totalPrice: 0,
                    storefrontPrice: {
                        id: 1003,
                        service: { id: 2, name: "ซักอบรีด" },
                        item: { id: 103, name: "เสื้อผ้าทั่วไป" }
                    },
                    images: []
                },
                {
                    id: 918,
                    quantity: 5,
                    unitPrice: 0,
                    totalPrice: 0,
                    storefrontPrice: {
                        id: 1005,
                        service: { id: 3, name: "ซักแห้ง" },
                        item: { id: 105, name: "สูท" }
                    },
                    images: [
                        {
                            id: 5,
                            url: "https://res.cloudinary.com/demo/image/upload/suit-detail.jpg",
                            description: "สูทสีน้ำเงินเข้ม ต้องการดูแลพิเศษ"
                        }
                    ]
                },
                {
                    id: 919,
                    quantity: 5,
                    unitPrice: 0,
                    totalPrice: 0,
                    storefrontPrice: {
                        id: 1012,
                        service: { id: 1, name: "ซักอบ" },
                        item: { id: 111, name: "ผ้าขนหนู พรีเมียม" }
                    },
                    images: []
                }
            ],
            statusHistory: [
                {
                    id: 10029,
                    status: "PENDING_CHECK",
                    employeeId: null,
                    customerId: "cuid_customer_009",
                    notes: "ลูกค้าแพ็คเกจพรีเมียม แจ้งรายละเอียดพิเศษ",
                    createdAt: "2025-11-26T07:30:00Z"
                },
                {
                    id: 10030,
                    status: "WASHING",
                    employeeId: "cuid_employee_001",
                    customerId: null,
                    notes: "เริ่มซัก - ใช้น้ำยาพรีเมียมสำหรับสูท",
                    createdAt: "2025-11-26T08:15:00Z"
                }
            ],
            images: [
                {
                    id: 6,
                    url: "https://res.cloudinary.com/demo/image/upload/basket-a09-full.jpg",
                    description: "ตะกร้าผ้าทั้งหมด - แพ็คเกจพรีเมียม"
                }
            ]
        }
    },

    // 10. STOREFRONT - READY_FOR_PICKUP
    {
        status: "success",
        data: {
            id: 5010,
            orderType: "STOREFRONT",
            currentStatus: "READY_FOR_PICKUP",
            totalAmount: 450.00,
            basketQrId: "BASKET-B10",
            notes: "แจ้งลูกค้าแล้ว รอมารับในตอนเย็น",
            deliveryAddressId: null,
            creditsUsed: null,
            userPackageId: null,
            createdAt: "2025-11-25T15:00:00Z",
            updatedAt: "2025-11-26T10:30:00Z",
            customer: {
                id: "cuid_customer_010",
                name: "มนัสนันท์ รุ่งเรือง",
                email: "manatsanan@example.com",
                phoneNumber: "090-123-4567",
                lineUserId: "Um90123"
            },
            employee: {
                id: "cuid_employee_002",
                name: "พนักงาน B",
                email: "employeeB@laundry.com"
            },
            deliveryAddress: null,
            orderItems: [
                {
                    id: 920,
                    quantity: 1,
                    unitPrice: 280.00,
                    totalPrice: 280.00,
                    storefrontPrice: {
                        id: 1009,
                        service: { id: 3, name: "ซักแห้ง" },
                        item: { id: 109, name: "ผ้านวม Queen" }
                    },
                    images: []
                },
                {
                    id: 921,
                    quantity: 2,
                    unitPrice: 40.00,
                    totalPrice: 80.00,
                    storefrontPrice: {
                        id: 1002,
                        service: { id: 2, name: "ซักอบรีด" },
                        item: { id: 102, name: "เสื้อเชิ้ต" }
                    },
                    images: []
                },
                {
                    id: 922,
                    quantity: 3,
                    unitPrice: 30.00,
                    totalPrice: 90.00,
                    storefrontPrice: {
                        id: 1013,
                        service: { id: 2, name: "ซักอบรีด" },
                        item: { id: 112, name: "เสื้อยืด" }
                    },
                    images: []
                }
            ],
            statusHistory: [
                {
                    id: 10031,
                    status: "PENDING_CHECK",
                    employeeId: "cuid_employee_002",
                    customerId: null,
                    notes: "รับผ้าหน้าร้าน ตรวจนับ OK",
                    createdAt: "2025-11-25T15:00:00Z"
                },
                {
                    id: 10032,
                    status: "WASHING",
                    employeeId: "cuid_employee_002",
                    customerId: null,
                    notes: "เริ่มซัก แยกผ้านวมซักแห้ง",
                    createdAt: "2025-11-25T15:30:00Z"
                },
                {
                    id: 10033,
                    status: "DRYING",
                    employeeId: "cuid_employee_002",
                    customerId: null,
                    notes: "อบแห้ง ใช้เวลาพิเศษสำหรับผ้านวม",
                    createdAt: "2025-11-26T08:00:00Z"
                },
                {
                    id: 10034,
                    status: "IRONING",
                    employeeId: "cuid_employee_002",
                    customerId: null,
                    notes: "รีดเสื้อผ้า ผ้านวมพับเรียบร้อย",
                    createdAt: "2025-11-26T09:30:00Z"
                },
                {
                    id: 10035,
                    status: "READY_FOR_PICKUP",
                    employeeId: "cuid_employee_002",
                    customerId: null,
                    notes: "พร้อมมอบ ส่งไลน์แจ้งลูกค้าแล้ว",
                    createdAt: "2025-11-26T10:30:00Z"
                }
            ],
            images: [
                {
                    id: 7,
                    url: "https://res.cloudinary.com/demo/image/upload/packed-order-5010.jpg",
                    description: "ผ้าแพ็คเรียบร้อย พร้อมส่งมอบ"
                }
            ]
        }
    }
]

export default eventHandler(async () => {
    return orders
})
