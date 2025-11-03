export default defineAppConfig({
  ui: {
    header: {
      slots: {
        // กรอบ header กว้างเท่าคอนเทนต์ และมี padding ซ้ายขวาเท่ากัน
        container: 'w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full',
        // ให้เมนูกลางอยู่ “กลางจริง” ระหว่างโลโก้กับปุ่มขวา
        left: 'lg:flex-1 flex items-center gap-1.5',
        center: 'hidden lg:flex lg:flex-1 justify-center',
        right: 'flex items-center justify-end lg:flex-1 gap-1.5',
        title: 'shrink-0 font-bold text-xl text-highlighted flex items-end gap-1.5',
        // ถ้าใช้เมนูมือถือ: ลด padding ให้เท่ากับคอนเทนต์
        header: 'px-4 sm:px-6 h-(--ui-header-height) shrink-0 flex items-center justify-between gap-3',
        body: 'p-4 sm:p-6 overflow-y-auto'
      }
    },
    colors: {
      primary: 'sky',
      secondary: 'teal',
      neutral: 'slate'
    },
    icons: {
      light: 'i-ph-sun',
      dark: 'i-ph-moon'
    },
    toaster: {
      defaultVariants: {
        position: 'top-center',
      }
    },
    button: {
      slots: {
        base: 'cursor-pointer'
      }
    },
    pageLogos: {
      slots: {
        root: 'relative overflow-hidden',
        title: 'text-lg text-center font-semibold text-highlighted',
        logos: 'mt-0',
        logo: 'size-7 shrink-0'
      }
    }
  }
})
