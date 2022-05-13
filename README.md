# Hey Taxi Frontend [WIP]

![hey-taxi-gh-1](https://user-images.githubusercontent.com/288159/168313473-dcd0e484-d22d-404e-abf4-45d4ccb70c35.png)

`Live Preview:` (*Not available yet*)
`Storybook:` https://orkungursel.github.io/hey-taxi-frontend/

## Used Technologies

- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [React](https://reactjs.org/) v18
- [x] [Redux](https://redux.js.org/)
- [x] [Redux-Toolkit](https://redux-toolkit.js.org/)
- [x] [Redux-Saga](https://redux-saga.js.org/)
- [ ] [Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/) Not implemented yet
- [x] [Storybook](https://storybook.js.org/)
- [x] [TailwindCSS](https://tailwindcss.com/)
- [x] [Eslint](https://eslint.org/) + [Prettier](https://prettier.io/)

# Development

Please follow the instructions in [HeyTaxi repository](https://github.com/orkungursel/hey-taxi) to run backend before starting development.


## Install

```bash
# --force flag is needed to use lastest version(v18) of React with other dependencies
```
```bash
npm install --force
```

## Run

```bash
npm run start
```

## Storybook

```bash
npm run storybook
```

## Environment Variables

  | Variable Name       | Description          | Default                 |
  | ------------------- | -------------------- | ----------------------- |
  | `REACT_APP_API_URL` | Backend API Base URL | `http://localhost:3001` |