# SDEV-255 Final Project: Group 7


```
npm install -D tailwindcss@latest \
  @tailwindcss/typography@latest \
  @tailwindcss/forms@latest \
  @tailwindcss/aspect-ratio@latest \
  @tailwindcss/line-clamp@latest \
  postcss@latest \
  autoprefixer@latest
```


## Build

> Start the Tailwind CLI build process
Run the CLI tool to scan your template files for classes and build your CSS.

```css
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```

---

## Plug-ins 

```javascript
plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/container-queries"),
  ],
```

```
npm install -D @tailwindcss/typography
```
```
npm install -D @tailwindcss/forms
```
```
npm install -D @tailwindcss/aspect-ratio
```
```
npm install @tailwindcss/container-queries
```
```