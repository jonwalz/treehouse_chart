import * as React from 'react'
import { PieChart } from "./pie_chart"
import { useQuery } from 'react-fetching-library'
import { fetchData } from '../client/actions'
import { getLanguageData } from "../util/pie_chart_container_util"

export const ChartContainer = (): JSX.Element => {
    const { loading, payload, error, query } = useQuery(fetchData)

    if (error) return <button onClick={query}>Refresh</button>

    const transformedData = getLanguageData(payload)
    return <PieChart data={transformedData} />
}
