<!---
<title>React app dark and light theme toggle</title>
<description>In this blog post, I'm going through one way to implement dark and light theme toggle to your React app.</description>
<keywords>React, CSS</keywords>
<author>Tapio Salonen</author>
--->
### React app dark and light theme toggle.

You can find an example app from [here](https://github.com/tsa-dom/example-apps/tree/main/react/darkmode-example).

In this blog post, I'm going through one way to implement dark and light theme toggle to your React app. I decided to use CSS variables to change styles. All style properties to each theme, I defined in a theme.js file like so
```jsx
export const themes = {
  dark: [
    { var: '--background-color', value: 'rgb(40, 44, 52)' },
    { var: '--text-color', value: 'white' },
    { var: '--app-link-color', value: 'rgb(97, 218, 251)' }
  ],
  light: [
    { var: '--background-color', value: 'white' },
    { var: '--text-color', value: 'black' },
    { var: '--app-link-color', value: 'rgb(50, 178, 213)' }
  ]
}
```

This approach makes it easier to iterate through all style properties and update them on one go. You only need to specify the theme as a function param.
```jsx
// This function switches all CSS variable values with the selected theme values.
export const switchTheme = (themeName) => {
  localStorage.setItem('app-theme', themeName)
  themes[themeName].forEach(theme => {
    document.documentElement.style.setProperty(theme.var, theme.value)
  })
}
```

Next, you need to define CSS variables. Those variables are manipulated on runtime when the theme changes. You need to specify all defined variables to style definitions inside CSS files.
```css
/* CSS-variable definitions */
:root {
  --background-color: rgb(40, 44, 52);
  --text-color: white;
  --app-link-color: rgb(97, 218, 251);
}

/* Styles that uses CSS variables are defined here */
.App-header {
  background-color: var(--background-color);
  color: var(--text-color);
  ...
}
.App-link {
  color: var(--app-link-color);
}
```

You can also store the current theme to local storage so a client can use it further when visiting the page next time.

This method is also reusable in other situations where you need conditional CSS rendering. You can hide specific elements in the DOM tree if a particular setting is activated.
