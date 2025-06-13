import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import IndexPage from './pages/IndexPage.tsx'
import { Provider } from "./components/ui/provider"
import { Provider as ReduxProvider } from 'react-redux'
import store from './store/store.ts'

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage/>,
  },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ReduxProvider store={store}>
        <Provider>
          <RouterProvider router={router} />
        </Provider>
      </ReduxProvider>
    </StrictMode>,
);
