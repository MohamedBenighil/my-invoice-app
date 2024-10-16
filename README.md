## Getting Started

```bash
# run the development server:
npm run dev
# or
pnpm dev


# clean code
npm run lint

# install shadcn : google > shadcn > Docs > Installation > Next.js
npx shadcn@latest init # (Which style would you like to use ? NewYork > Which color would you like to use as the base color?  Slate > Would you like to use CSS variables for theming? yes )

# app/page.tsx : add button : google > shadcn > Docs > Installation > Butoon > Installation
npx shadcn@latest add button # see app/componenets/ui & app/lib

#00:04:20 - Creating a Dashboard with Tailwind and shadcn/ui
# app/dashboard/page.tsx :
    # Add Table, Badge, button
        # shadcn  > table, Badge and button(add invoice)
    # Add icon (+) to button
        # https://lucide.dev/icons/?focus

#00:25:00 - Adding a new Create Invoice Form
# app/invoice/new/page.tsx
    # create a from with shadcn input, label and textaerea



#===============================================================
# 00:34:15 - Installing & Configuring Xata & Drizzle ORM
# Xata (https://xata.io/) : where you create a potgres db.
    # Save "PostgreSQL endpoint" in env.local in root as env var. Select "TypeScript with Drizzle ORM". Install "dependencies and types"
    # create db/index.ts
        # use pool (see doc) instead of client (default) to connect to db

# drizzle orm : desing a db and query. It is native to js (new way to interact with db)


```
