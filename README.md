# Voltix

Voltix is a responsive electronics storefront prototype built with React and Vite. It includes a product catalog, shopping and account flows, and admin-facing screens, using sample data bundled with the app.

## Features

- Browse and search products across phones, laptops, monitors, and accessories
- Filter products and view product details
- Add products to a shopping cart and place a demo order
- Save products to a wishlist
- Explore account, order history, and order detail screens
- Explore admin dashboard, product, order, category, and stock screens
- Responsive layout with Voltix branding

## Getting started

### Requirements

- Node.js (recommended: current LTS)
- npm

### Install and run

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal (usually `http://localhost:5173`).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |

## Project structure

```text
branding/       Voltix logo assets
public/         Static assets, favicon, and product images
src/
  pages/        Storefront, account, checkout, and admin pages
  App.jsx       Client-side routing and shared app state
  data.js       Sample products, categories, and order data
  shared.jsx    Shared layout and storefront components
  styles.css    Application styles
```

## Demo behavior

This project is a front-end prototype; it does not connect to a backend or persist real accounts, payments, orders, or inventory. Product and order information is sample data in `src/data.js`. Cart state is held in memory and resets when the app reloads; the wishlist is saved in browser local storage. Login, signup, checkout, and admin screens demonstrate UI flows only.

## Technology

- React 18
- Vite 5
- Lucide React
