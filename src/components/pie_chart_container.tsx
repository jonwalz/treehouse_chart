import * as React from 'react'
import { PieChart } from './pie_chart'
import { useSuspenseQuery } from 'react-fetching-library'
import { fetchPoints } from '../client/actions'
import { getLanguageData } from '../util/pie_chart_container_util'

export const ChartContainer = (): JSX.Element => {
    const { payload, error } = useSuspenseQuery(fetchPoints)
    if (error) return <div>Error</div>
    const transformedData = getLanguageData(payload)

    return (
        <div style={{ width: '100%', height: '50vh' }}>
            <h3 style={{textAlign: "center"}}>Treehouse Points</h3>
            <PieChart data={transformedData} error={error} />
        </div>
    )
}
