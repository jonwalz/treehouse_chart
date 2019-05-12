import * as React from 'react'

import { storiesOf } from '@storybook/react'
import { PieChart } from './pie_chart'

/*
    Stories are to demonstrate the capabilities of a component
    In this instance, we will need to supply data to the pie chart
*/

storiesOf(
    'PieChart',
    module,
).add('Demonstrate simple data passed to chart', (): JSX.Element => {
    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <PieChart
                data={[ { id: 'Test', value: 100, label: "Test", color: "hsl(256, 70%, 50%)" } ]}
            />
        </div>
    )
})
