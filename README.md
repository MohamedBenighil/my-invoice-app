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

#01.10.30 what if use react 19 feature such useFormStatus hook ? the way we are using does not activate useFormStatus hook
    # after making chnages, test it : devtools > network > 3G

#01.17.45 nextjs comes with Form component that does the work (just before) for us


# 01:20:11 - List Invoices in a DataTable
    # to make a table row clickable, do not use Link over the <Tablerow>, but over the <span>


#01:28:19 - Dynamic Page Routes for Invoices
    # add cn() to dynamic render css + use capitalize

#01:38:24 - Catching & Handling Errors
    # try to set invoiceId to a number which does not exists ? you get an error ==> fix : use notFound()
    # try to set invoiceId NaN ? you get an error ==> fix : throw Error, then create error.tsx in root
    # display a nice page error : use  NextError (NextError is name provided by me ) component from next/error

# 01:43:11 - Adding Social Login with Clerk
    # create account : https://clerk.com/
        # create app, select: email + goolle, install dependenies + copy env vars, add middleware
        # add <ClerkProvider> in src loyout
        # add the rest of clerk componenet to root page.tsx

#01:47:18 - Protecting Routes with Clerk Middleware
    # middleware: gives the ability to run code BEFORE the request is completed
    # Now you can not access the routes (ex: click login) WITHOUT Sign in

#01:52:04 - Creating a Page Layout with Site Header & Footer
    # instead of going to / for singing/signout, we need a header
        # add header
        # add footer
    # add <Container> to form (app/invoices/new/page.jsx)
    # add <Container> to  (app/invoices/[invoiceId]/page.jsx)

    # use css grid to ensure footer is stack on buttom: root layout.

#02:03:46 - Building Login & Signup Pages
    # google : custom sign up : add the pages then verify they work : visit /sign-up & /sign-in
    # when you click sign in button it does'nt work ! add env vars (from the doc always )



#02:07:46 - Custom Login Page with Clerk Elements
    # google : clerk elements (to really customize the UI) > see examples
    # replace :
        # title
        # icon : google > lucide > search "brief" > copy svg > google: svgtojsx.com > paste the code chaznging the className
        # change the "sign in" button
        # change google login button + ajust the spaces

# 02:13:51 - Configuring MFA (Multi-Factor Authentication)
    # clerk account > my invoice app > configure > multi factor > X Authenticator application
    # localohst:3000 > avatar > manage account > security > Two-step verification > scan qr code with authenticator ap, then ente 6 digits
        # now next time you login, it uses mfa (PS. desbale env variable for clerck)


    # =========
    # enable mfa USING env var of clerck
        # go to sign-in/page.tsx > add "totp" strtegy
             # see https://clerk.com/docs/customization/elements/reference/sign-in#strategy
        # replace <Clerk.Input with https://clerk.com/docs/customization/elements/examples/primitives
            # PS : you have 2 unkown componenets: "AnimatePresence" and "motion" ==> npm i framer-motion
        # ajust the icon, title, button and href

        # once we log in we should go to dashborad. use : NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL


# 02:21:07 - Setting Up Passwordless Auth with Passkeys
    # clerk account > my invoice app > configure > Authentication strategies > X Passkeys
    # add passkey option to sign-in page : https://clerk.com/docs/customization/elements/reference/sign-in#passkey


# 02:24:33 - Securing Server Actions with Clerk
     # auth object https://clerk.com/docs/references/nextjs/auth-object

# 02:27:44 - Add New User ID Column to Invoices TODO
    # add userId field to Invoices table schema
    # Delete all data on Invoices table
    # generate and migrate
    # update insert query on action: add userId
```
