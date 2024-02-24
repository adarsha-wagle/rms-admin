import * as Sentry from '@sentry/react';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ThemeProvider from 'src/theme';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './app';

Sentry.init({
  dsn: 'https://30f1c37933a26853615dc1f4c50ccecb@o4506801857232896.ingest.sentry.io/4506801926569984',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <Provider store={store}>
      <ThemeProvider>
        <Suspense>
          <App />
        </Suspense>
      </ThemeProvider>
    </Provider>
  </HelmetProvider>
);
