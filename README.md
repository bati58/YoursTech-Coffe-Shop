# Customizable Coffee Shop

A premium specialty-coffee storefront built with React 19, Vite, Tailwind CSS, React Router and the Context API.

## Run
```bash
npm install
npm run dev      # development
npm run build    # production build
npm run lint
```

## Structure
```
src/
  config/site.js     business details (contact, hours, socials, tax/service fee) — empty values are hidden
  data/              products (with categories) and testimonials
  context/           Cart (persisted), Auth, Orders, Toast
  components/        ui/ (Field, Logo, QuantitySelector…), layouts/, home/, ProductCard, ProtectedRoute
  pages/             Home, Menu, ProductDetails, Cart, Checkout, OrderSuccess, Orders,
                     SignIn, SignUp, Profile, About, Contact, NotFound
```

## Design system
Colors and fonts are Tailwind tokens in `tailwind.config.js`
(cream `#F6F0E7`, sand `#EFE5D8`, ink `#382318`, muted `#766557`, accent `#A66A3F`, accent-light `#C99B70`,
line `#E5D9CA`, success `#397653`, danger `#B54747`; `accent-deep #8F5830` is a darker shade used for buttons/small text
to meet contrast requirements). Headings: Playfair Display; body: Inter.

## Things to fill in
Open `src/config/site.js` to change `brandName`, set the `currency`, and customize the displayed business name, then add your real
address, phone, email, opening hours and social links. The logo, page copy, metadata and order references use this
configuration automatically.
Set `charges.taxRate` / `charges.serviceFee` to show those lines at checkout.

## Important notes
- Checkout is a **simulated local order flow** — no payment is taken. Orders, accounts and the cart live in browser localStorage.
- Authentication is demo-only (passwords are hashed with SHA-256 client-side). A real deployment needs a backend.
- Testimonials are the original sample comments and are labelled as unverified.
