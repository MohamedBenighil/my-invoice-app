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

#===============================================================
#00:42:28 - Creating Table Schemas for Invoice Data
# create the table app/db/schema.ts
# pass the table in app/db/index.ts

#===============================================================
#00:49:07 - Generating & Running Migrations with Drizzle Kit
# create app/db/drizzle.config.ts (see https://orm.drizzle.team/docs/get-started/postgresql-new#step-5---setup-drizzle-config-file)
# npm install dotenv : to tell where env var are located (if diffirent than defaul .env e.g: env.local)
# npm run generate
# npm run migrate
# verify the migration on xata

#===============================================================
#00:55:26 - Adding new Invoices with Server Actions


#===============================================================
#01:05:07 - Progressively Enhanced Forms in React 19 & Next.js 15
# create a client feature : prevent the user to click submit button multiple times, and showing load icon
    # create onSubmit with state ("reday" or "pending" )
    # prevent action to execute UNTIL the button is clicked (call the action inside onSubmit) because we are at client side
        # prevent default behavor
        # call createAction manually

# what if js is desabled ? it still works
```
