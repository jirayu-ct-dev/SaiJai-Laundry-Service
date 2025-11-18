export default defineAppConfig({
  ui: {
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
