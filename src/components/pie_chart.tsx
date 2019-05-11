import * as React from 'react'
import { ResponsivePie } from '@nivo/pie'

interface PieChartProps {
    readonly data: any
}

export const PieChart = ({ data }: PieChartProps) => (
    <div style={{ width: "100%", height: "100vh"}}>
        <ResponsivePie data={data} />
    </div>
)
