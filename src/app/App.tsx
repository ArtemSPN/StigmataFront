import { useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/router'
import { classNames } from '@/shared/lib/classNames/classNames';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense } from 'react'

function App() {
    const { theme,  } = useTheme();


    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback={""}>
                <div className="content-page">
                    <AppRouter />
                </div>
                <Sidebar />
            </Suspense>
        </div>
    )
}

export default App
