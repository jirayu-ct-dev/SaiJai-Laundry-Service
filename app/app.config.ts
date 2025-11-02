export default defineAppConfig({
  ui: {
    colors: {
      primary: 'sky',
      secondary: 'teal',
      neutral: 'slate'
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
    }
  }
})
