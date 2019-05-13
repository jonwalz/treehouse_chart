import * as React from 'react'
import { PieChart } from './pie_chart'
import { useQuery } from 'react-fetching-library'
import { fetchPoints } from '../client/actions'
import { getLanguageData } from '../util/pie_chart_container_util'

export const ChartContainer = (): JSX.Element => {
    const { loading, payload, error } = useQuery(fetchPoints)
    if (loading || !payload) return <div>Loading...</div>
    if (error) return <div>Error</div>
    const transformedData = getLanguageData(payload)

    return (
        <div style={{ width: '100%', height: '50vh' }}>
            <h3>Treehouse Points</h3>
            <PieChart data={transformedData} error={error} />
        </div>
    )
}
