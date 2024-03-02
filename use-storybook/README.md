# Steps
## Create a new project
```bash
yarn create vite use-storybook --template react-ts
cd use-storybook
yarn
yarn dev
```
## Use formatter
ESLint, Prettier
```bash
yarn add -D prettier eslint eslint-config-prettier eslint-plugin-{import,prettier,react,react-hooks}
yarn add -D @typescript-eslint/{parser,eslint-plugin}
yarn add -D npm-run-all
touch .eslintrc .prettierrc .eslintignore .prettierignore
```
## Formatter settings
### eslint
- add `.eslintrc`
```json
{
  "root": true,
  "env": {
    "es6": true,
    "browser": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": ["@typescript-eslint", "import", "react", "react-hooks"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": ["tsconfig.json"],
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    // Possible Errors
    "no-unexpected-multiline": "error",
    // Best Practices
    "class-methods-use-this": "off",
    "consistent-return": [
      "error",
      {
        "treatUndefinedAsUnspecified": true
      }
    ],
    "dot-location": ["error", "property"],
    "no-implicit-globals": "error",
    "no-invalid-this": "error",
    "no-param-reassign": [
      "error",
      {
        "props": false
      }
    ],
    "no-unmodified-loop-condition": "error",
    "no-useless-call": "error",
    "no-void": "off",
    "no-else-return": "off",
    "no-catch-shadow": "error",
    "no-label-var": "error",
    "no-shadow": "off",
    "no-undef-init": "error",
    "no-unused-expressions": [
      "error",
      {
        "allowShortCircuit": true
      }
    ],
    "no-unused-vars": 1,
    "no-undef": "off",
    "no-empty": "off",
    "sort-imports": 0,
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "parent", "sibling", "index", "object", "type"],
        "pathGroups": [
          {
            "pattern": "@alias/**",
            "group": "parent",
            "position": "before"
          }
        ],
        "alphabetize": {
          "order": "asc"
        },
        "newlines-between": "always"
      }
    ],
    // ES2015
    "constructor-super": "error",
    "generator-star-spacing": ["error", "after"],
    "no-this-before-super": "error",
    "prefer-arrow-callback": [
      "error",
      {
        "allowNamedFunctions": true
      }
    ],
    "prefer-spread": "error",
    "prefer-template": "off",
    // React
    "react/no-danger": "error",
    "react/no-deprecated": "error",
    "react/no-did-mount-set-state": "error",
    "react/no-did-update-set-state": "error",
    "react/no-direct-mutation-state": "error",
    "react/no-is-mounted": "error",
    "react/no-set-state": "error",
    "react/no-string-refs": "error",
    "react/prefer-stateless-function": "error",
    "react/prop-types": "off",
    "react/self-closing-comp": "off",
    "react/destructuring-assignment": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react-hooks/rules-of-hooks": "error",
    "react/react-in-jsx-scope": "off"
  }
}

```
- add `.eslintignore`
```
node_modules
dist
dist-ssr
```

### prettier
- add `.prettierrc`
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "useTabs": false,
  "jsxSingleQuote": true
}
```
- add `.prettierignore`
```
node_modules
dist
dist-ssr
```

### Additional
- fix `tsconfig.json`
```json
{
  // ...
  "include": ["./src", "./vite.config.ts"]
  // ...
}
```
- fix scripts section in `package.json`
```json
{
  // ...
 "scripts": {
    // ...
    "fix": "npm-run-all -p fix:*",
    "fix:eslint": "eslint . --ext .js,.ts,.jsx,.tsx --fix",
    "fix:prettier": "prettier --write .",
    "eslint": "eslint . --ext .js,.ts,.jsx,.tsx"
 },
  // ...
}
```

## Format execution
```bash
yarn eslint       # eslint
yarn fix:eslint   # eslint fix
yarn fix:prettier # prettier fix
yarn fix          # fix:eslint & fix:prettier
```

## Commit & push tools settings
```bash
yarn add -D husky lint-staged
npx husky-init && yarn install
```
- fix `package.json`
```json
{
  // ...
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,html,css}": [
      "prettier --write"
    ]
  },
  // ...
}
```
- fix `.husky/pre-commit`
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

## VSCode settings
- add `.vscode/launch.json`
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```
- add `.vscode/settings.json`
```json
{
  "css.lint.unknownAtRules": "ignore",
  "files.exclude": {
    "node_modules": true,
    "dist": true,
    "yarn.lock": true,
  }
}
```
- add `.editorconfig`
```
root = true

[*]

indent_style = space
indent_size = 2

end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false
```

## Use path alias
```bash
yarn add -D @types/node
```
- fix `vite.config.ts`
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
})

```
- fix `tsconfig.json`
```json
{
  // ...
  "compilerOptions": {
    // ...
    "baseUrl": "./",
    "paths": {
      "~/*": ["src/*"]
    }
  }
  // ...
}
```

- fix import in `src/App.tsx`
```tsx
import Button from '~/components/Button';
```

## Use Tailwind CSS
### Install & configure
```bash
yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p
```
- fix `.eslintignore`
```
node_modules
dist
dist-ssr
postcss.config.js
tailwind.config.js
```
- fix root app by adding import in `src/main.tsx`
```tsx
// ...
import 'tailwindcss/tailwind.css'
// ...
```
- fix `tailwind.config.js`
```js
module.exports = {
  content: ['index.html', 'src/**/*.{ts,tsx}'],
  // ...
}
```
### Refactor app using Tailwind CSS
- fix `src/App.tsx`
```tsx
import { useState } from 'react'
import logo from '~/logo.svg'

const App: React.VFC = () => {
  const [count, setCount] = useState(0)

  return (
    <div className='text-center'>
      <header className='bg-slate-700 min-h-screen flex flex-col align-center justify-center text-3xl text-white'>
        <img src={logo} className='h-72' alt='logo' />
        <p className='text-4xl'>Hello Vite + React!</p>
        <p className='my-5'>
          count is:
          <button
            type='button'
            className='bg-gray-50 hover:bg-gray-100 text-black p-2 mx-2'
            onClick={() => setCount((count) => count + 1)}
          >
            {count}
          </button>
        </p>
        <p className='my-2'>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p className='my-2'>
          <a className='text-cyan-300' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
            Learn React
          </a>
          {' | '}
          <a
            className='text-cyan-300'
            href='https://vitejs.dev/guide/features.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
```

## Use Storybook
### Install & configure
```bash
npx sb init --builder webpack5
yarn add -D webpack@^5
yarn add -D @types/babel__core # if error with webpack
```
- delete all files except for `src/stories/Introduction.stories.mdx` and `src/stories/assets`
- launch storybook
```bash
yarn storybook
```

- add addon for tailwindcss
```bash
yarn add -D @storybook/addon-postcss
```

- fix alias in `.storybook/main.js`
```js
+ const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
   {
     name: '@storybook/addon-postcss',
     options: {
       postcssLoaderOptions: {
         implementation: require('postcss'),
       },
     },
   },
 ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, '../src'),
    }
    return config
  },
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
}
```

- fix `.storybook/previews.js`
```js
import '../src/index.css'
import 'tailwindcss/tailwind.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
```

## Use Button
- create `src/components/Button.tsx`
```tsx
import clsx from 'clsx'

export type ButtonProps = {
  children: React.ReactChild
  onClick?: () => void
  className?: string
  full?: boolean
  rounded?: boolean
  outlined?: boolean
}

export const Button: React.VFC<ButtonProps> = ({
  children,
  onClick,
  className,
  full = false,
  rounded = false,
  outlined = false,
}) => {
  return (
    <button
      onClick={onClick}
      type='button'
      className={clsx(
        className,
        'px-4 py-2 border shadow-sm text-base font-medium',
        full ? 'w-full' : '',
        rounded ? 'rounded-full' : 'rounded-md',
        outlined
          ? 'border-orange-600 text-orange-600 bg-white hover:bg-orange-50'
          : 'border-transparent text-white bg-orange-600 hover:bg-orange-700'
      )}
    >
      {children}
    </button>
  )
}
```

- fix `src/App.tsx` to use Button
```tsx
// ...
<Button outlined onClick={() => setCount((count) => count + 1)}>
  {count}
</Button>
// ...
```
- add `src/stories/components/Button.stories.tsx`
```tsx
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button, ButtonProps } from '~/components/button'

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />
const defaultArgs: ButtonProps = {
  children: 'ボタン',
  full: false,
  rounded: false,
  outlined: false,
}

export const Default = Template.bind({})
Default.storyName = 'ボタン'
Default.args = defaultArgs
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
