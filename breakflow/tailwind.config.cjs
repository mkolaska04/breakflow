module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        accent: 'var(--accent-color)',
        success: 'var(--theme-success)',
      },
      spacing: {
        'header': 'var(--header-height)',
        'sidebar': 'var(--sidebar-width)',
      }
    }
  },
  plugins: [],
}