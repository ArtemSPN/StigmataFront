import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@/app/styles/index.scss';
import './shared/config/i18n/i18n';
import App from './app/App'
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import ErrorBoundary from '@/app/providers/ErrorBoundary/ui/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StoreProvider>
        <BrowserRouter>
            <ErrorBoundary>
                <ThemeProvider>
                    <App />
                </ThemeProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </StoreProvider>,
)
