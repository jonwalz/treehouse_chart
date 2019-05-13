import * as React from 'react'
import { Suspense } from 'react'
import { render } from 'react-dom'
import { ClientContextProvider } from 'react-fetching-library'
import { Client } from './client/api'
import { ChartContainer } from './components/pie_chart_container'
import Spinner from "./components/spinner"
import './styles.css'

function App() {
    return (
        <ClientContextProvider client={Client}>
            <Suspense fallback={<Spinner />}>
                <ChartContainer />
            </Suspense>
        </ClientContextProvider>
    )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
