import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
    colors: {
      'gray': "#F8F8F8",
      'brandcolor': '#FF4545',
      'secondarycolor': '#43497A',
      'colortext': '#404040',
      'white': '#FFFFFF',
      'blue': '#3849DD',
      'blue-notification': '#EBEDFF',
      'bordercolor': '#DADADA',
      'table-head': '#646464',
      'green': '#059669',
      'gray-blue': '#EBEDFF',
      'custom-overlay': 'rgba(64, 64, 64, 0.58)',
      'red': '#DD3838',
      'error': '#FD3434'
    },
    extend: {
      'boxShadow': {
        'table': '0px 0px 14px 0px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [nextui()],
};
export default config;
