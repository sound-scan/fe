import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sound-green': '#22c55e',
        'sound-yellow': '#eab308',
        'sound-orange': '#f97316',
        'sound-red': '#ef4444',
      },
    },
  },
  plugins: [],
}
export default config
