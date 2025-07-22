/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        xs: 'var(--radius-sm)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        DEFAULT: 'var(--radius)'
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)'
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)'
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)'
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)'
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)'
        },
        // SEO App specific colors
        seo: {
          'primary': 'hsl(var(--seo-primary))',
          'secondary': 'hsl(var(--seo-secondary))',
          'accent': 'hsl(var(--seo-accent))',
          'success': 'hsl(var(--seo-success))',
          'warning': 'hsl(var(--seo-warning))',
          'error': 'hsl(var(--seo-error))'
        },
        audit: {
          'excellent': 'hsl(var(--audit-excellent))',
          'good': 'hsl(var(--audit-good))',
          'average': 'hsl(var(--audit-average))',
          'poor': 'hsl(var(--audit-poor))'
        },
        keyword: {
          'high-volume': 'hsl(var(--keyword-high-volume))',
          'medium-volume': 'hsl(var(--keyword-medium-volume))',
          'low-volume': 'hsl(var(--keyword-low-volume))',
          'high-difficulty': 'hsl(var(--keyword-high-difficulty))',
          'low-difficulty': 'hsl(var(--keyword-low-difficulty))'
        }
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'seo-scan': {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' }
        },
        'keyword-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        'audit-progress': {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'seo-scan': 'seo-scan 2s ease-in-out infinite',
        'keyword-pulse': 'keyword-pulse 1.5s ease-in-out infinite',
        'audit-progress': 'audit-progress 0.8s ease-out'
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace']
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}