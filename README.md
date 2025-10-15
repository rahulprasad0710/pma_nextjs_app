app/
├── layout.tsx // Root (server) layout: <html>, <body>
├── page.tsx // Home page (server component, SEO friendly)
│
├── (main)/ // Group routes that should use Header + Footer
│ ├── layout.tsx // Client layout: Header + Footer
│ ├── page.tsx // Home page served here
│ └── rooms/
│ └── [id]/
│ └── page.tsx // /rooms/:id
│
├── auth/
│ ├── layout.tsx // Layout without Header/Footer
│ └── signup/
│ └── page.tsx // /auth/signup
│
components/
├── Header.tsx
├── Footer.tsx
└── ...
