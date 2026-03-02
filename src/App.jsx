import './App.css'
import { Suspense } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { PAGE_SLUGS } from '@/utils';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const fallback = (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-[var(--bright-grey)] border-t-[var(--ink)] rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <Suspense fallback={fallback}>
            <Routes>
              <Route path="/" element={
                <LayoutWrapper currentPageName={mainPageKey}>
                  <MainPage />
                </LayoutWrapper>
              } />
              {Object.entries(Pages).map(([name, Page]) => {
                const slug = PAGE_SLUGS[name];
                if (slug === "/") return null;
                return (
                  <Route
                    key={name}
                    path={slug || `/${name}`}
                    element={
                      <LayoutWrapper currentPageName={name}>
                        <Page />
                      </LayoutWrapper>
                    }
                  />
                );
              })}
              <Route path="*" element={
                <LayoutWrapper currentPageName="NotFound">
                  <PageNotFound />
                </LayoutWrapper>
              } />
            </Routes>
          </Suspense>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
