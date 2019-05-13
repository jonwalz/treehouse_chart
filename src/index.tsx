import * as React from 'react'
import { Suspense } from 'react'
import { render } from 'react-dom'
import { ClientContextProvider } from 'react-fetching-library'
import { Client } from './client/api'
import { ChartContainer } from './components/pie_chart_container'

import './styles.css'

fetch('https://teamtreehouse.com/jonathanwalz.json')
.then(res => res.json())
.then(data => console.log(data))

function App() {
    return (
        <ClientContextProvider client={Client}>
            <ChartContainer />
        </ClientContextProvider>
    )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
