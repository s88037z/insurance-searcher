## Policy Searcher Feature:

### Description

- Implement policyholder search.

### Installation:

```
git clone https://github.com/s88037z/insurance-searcher
cd insurance-searcher
cp .env.example .env
pnpm install
pnpm dev
```

### Showcase:
- Policyholder Search:

https://github.com/user-attachments/assets/9707a500-b8f7-4adb-bed0-4be0efbc4981

- Policyholder Navigation:

https://github.com/user-attachments/assets/15202b2c-ced2-4c30-87d5-5c72a2126613




### Tech choices:

- `Tailwind(CSS)`:
  - I'm more familiar with **CSS-in-JS**, but utility CSS **has its benefits** in quickly reusing styles and systematizing many properties.
- `React-query(Data-fetching)`:
  - A great tool for handling API requests. **Conceptually, it acts as `server-side data management`**, with excellent caching and refetch mechanisms, reducing much of the complexity in client-side state management.
- `Msw(Mocking-Api)`:
  - It can simulate real backend response scenarios very effectively.
- `Vitest+testing library(Testing)`:
  - **We should write tests in a way that reflects how users actually interact with the app as much as possible.** Testing Library helps simulate user interactions in test cases.
- Most of these tools are new to me, but I believe they are among the best solutions for the current situation and modern apps.

### Project structure

- Although **the requirement only calls for one feature** (policyholder search), I structured the project **as if** it were a larger app, allowing for new features to be added later.

```sh
├── public
│   ├── mockServiceWorker.js
│   └── vite.svg
├── src
│   ├── app                      # application layer:
│   │   ├── AppProvider.tsx      # global provider
│   │   ├── AppRouter.tsx        # main router
│   │   ├── index.tsx
│   │   └── routes               # application routes
│   │       ├── ErrorPage.tsx
│   │       └── Policyholder
│   │           ├── __tests__
│   │           │   └── Policyholder.test.tsx
│   │           └── index.tsx
│   ├── assets
│   │   └── react.svg
│   ├── components               # reusable components across app
│   │   ├── MainError.tsx
│   │   ├── layout
│   │   │   └── MainLayout.tsx
│   │   └── ui
│   │       └── Link.tsx
│   ├── config
│   │   └── env.ts
│   ├── features                # feature based modules, has it's own api,component,...etc
│   │   └── policyholder
│   │       ├── api
│   │       │   └── getPolicyholder.tsx
│   │       ├── components
│   │       │   ├── PolicyholderBlock.tsx
│   │       │   ├── PolicyholderLayout.tsx
│   │       │   ├── PolicyholderPreview.tsx
│   │       │   ├── PolicyholderRoot.tsx
│   │       │   └── PolicyholderSearcher.tsx
│   │       ├── types.ts
│   │       └── utils.ts
│   ├── index.css
│   ├── lib                    # pre-config for the third-party libs
│   │   ├── apiClient.ts
│   │   └── reactQuery.ts
│   ├── main.tsx
│   ├── mocks                  # handling mocking api and fake db
│   │   ├── browser.ts
│   │   ├── db.ts
│   │   ├── handlers.ts
│   │   ├── index.ts
│   │   ├── mockData.json
│   │   └── utiles.ts
│   ├── testing               # pre-config for testing setup
│   │   ├── setupTests.ts
│   │   └── utils.ts
│   ├── utils
│   │   └── format.ts
│   └── vite-env.d.ts
```
