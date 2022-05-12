import { themes } from '@storybook/theming';
import '../src/assets/styles/Global.css';

export const parameters = {
  darkMode: {
    dark: { ...themes.dark },
    light: { ...themes.normal, }
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}