# Finance Dashboard UI

A visually stunning and interactive finance dashboard built for tracking and understanding financial activity.

## Features Completed
- **Dashboard Overview**: Financial Summary Cards, Date-Based Balance Area Chart, Categorical Spending Pie Chart.
- **Transactions Management**: Complete DataGrid mapping out all transactions, with interactive simple filtering by Category and Type, coupled with sorting algorithms for Data grids natively in React.
- **Role-Based UX**: Seamlessly toggle between `VIEWER` (read-only) and `ADMIN` (Add/Edit privileges available across the transactions datagrid via a contextual modal).
- **Data Insights**: Reactive calculations that process the dataset to output readable conclusions like Deficit Alerts and Top Spending Categories.
- **Dark Mode**: Configured CSS-variable themed toggle leveraging Context and Tailwind CSS perfectly, storing preferences natively in `localStorage`.
- **State Management**: Zero dependancy Context API with localized Storage `localStorage` ensuring Data persistence upon reload. We utilize an abstraction wrapper bridging pure `React.useState` and raw LocalStorage fetching hooks allowing seamless interactions.
- **Aesthetics & UI**: Premium UI utilizing shadcn/ui aesthetic principles with sleek micro-interactions (`animate-in` classes, fluid CSS transitions, interactive hover shadows, and semantic variable system).

## Setup Instructions
1. Navigate into project directory: `cd finance-dashboard`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## Tech Stack
- Frontend Framework: Node + React (Vite / TypeScript)
- UI/Styling System: Tailwind CSS Custom tokens. Utilities `tailwind-merge` & `clsx`.
- Visualizations: Recharts
- Iconography: Lucide-react

> Note: All data simulated for frontend presentation. 
