# skwist

## Description

This project was originally from some time between March and August 2019. The original repo (if there was one) is likely lost. "Old" source code was recovered directly from https://skwist.stxalq.dev where sourcemaps revealed the full source. It's likely that `skwist` used the `ejs` templating enging like many other of my side projects from the time, but that too is lost. Oldsrc instead has a representative `index.html`.

"New" source code faithfully recreates the original web page, but with some changes to keep up with the endless version treadmill. Key differences:
- `react-router-dom` replaced with `wouter`
- stateful forms replaced with `jotai`
- javascript source replaced with typescript
- webpack bundler replaced with esbuild

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```
