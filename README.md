## Teste Frontend

🚀 **First, run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


To run test E2E in terminal:

npm run cypress:run:e2e
# or
yarn cypress:run:e2e
# or
pnpm cypress:run:e2e
# or
bun cypress:run:e2e


To run test UNIT in terminal:

npm run cypress:run:unit
# or
yarn cypress:run:unit
# or
pnpm cypress:run:unit
# or
bun cypress:run:unit


To run test in browser:

npm run cypress:open
# or
yarn cypress:open
# or
pnpm cypress:open
# or
bun cypress:open
```

Open http://localhost:3000 with your browser to see the result.

🚀 **Stacks:**

Next.js
Chakra UI
React.js
Sass (Module)
Cypress (Testing component and testing E2E)

🚀 Architecture:

🏛 The architecture is modular, considering that this project will be expanded and new modules with Artist or Theme will need to be created.

The App folder contains the page routes and layouts.
The Shared folder contains components, styles, and resources shared throughout the project.
The Modules folder is where project modules are created, allowing you to easily copy the folder and use it in other projects.
The Cypress in outside src, where is the test E2E.

🚀 **Live:**
https://piores-filmes-frontend.vercel.app/

OBS:
File .env is found in Github, but not recommend. But to test this application local is more easy that it.