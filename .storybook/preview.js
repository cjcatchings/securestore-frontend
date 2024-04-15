/** @type { import('@storybook/react').Preview } */
import { themes } from '@storybook/theming';
import '../node_modules/tailwindcss/tailwind.css'
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff'},
        { name: 'dark', value: '#222222'},
        { name: 'twitter', value: '#00aced' },
        { name: 'facebook', value: '#3b5998' },
      ]
    }
  },
  globalTypes: {
    darkMode: {
      defaultValue: true, // Enable dark mode by default on all stories
    },
    className: {
      defaultValue: 'dark', // Set your custom dark mode class name
    },
  }
};

export default preview;
