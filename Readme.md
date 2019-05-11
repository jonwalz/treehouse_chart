---

# Overview

The purpose of this tech design is to outline a small project to display a pie chart of my Tree House points. A secondary purpose to this project is to get familiar with Storybook and evaluate it's usefulness. Also using this as an opportunity to practice writing a technical design.

# High Level Design

---

### Chosen Technologies

- [React](https://reactjs.org)
- [Typescript](https://www.typescriptlang.org/)
- [React-fetching-library](https://github.com/testing-library/react-testing-library) - newer fetch client for react
- [Jest](https://jestjs.io/)
- [Nivo](https://nivo.rocks) (Charting library)
- [Storybook](https://storybook.js.org/)

### To do:

- Bootstrap development cycle by creating a storybook version of components needed in this project.
- Create UI layer with React
- Define tests, components, client, and data transformation
- Create client for fetching needed data
- Create data transformation layer for consumption of the UI
- Create state management layer using React Context (State management library not needed for such a simple use case)

# Low Level Design

---

### Setup

1. Use create-react-app with typescript to get up and running
2. Start a git repo because duh
3. Deploy on codesandbox to show the world

### Storybook

1. Create a `.storybook` directory and add `config.js` file
2. Create storybook script in your build system
    1. In our case, this is npm. 
        - In `package.json` write script `"storybook": "start-storybook -p 6006 -c .storybook`
3. Configure the storybook config file with the following script:

        import { configure } from "@storybook/react"
        
        // This will iterate through src 
        // looking for any extension that matches stories.ts
        
        const req = require.context("../src", true, /stories.ts$/);
        
        function loadStories() {
          req.keys().forEach(file => req(file));
        }
        
        configure(loadStories, module);

### PieChart Component

1. Create a chart component under `src/components` named `PieChart.ts`

        import * as React from "react"
        
        const PieChart = () => {
        	return ...
        }

2. Import the pie chart component from `@nive/pie`

        import { ResponsivePie } from '@nivo/pie'

3. Use the component within the PieChart component we created
4. Create a chart component under `src/components` named `PieChart.ts`

        import * as React from "react"
        import { ResponsivePie } from '@nivo/pie'
        
        const PieChart = () => {
        	return (
        		<ResponsivePie 
        			...
        		/>
        	)
        }

5. Define data to be used in pie chart

        import * as React from "react"
        import { ResponsivePie } from '@nivo/pie'
        
        /* 
        	Required props are: { data } 
        
        	Parent element is required to have width and height
        	when using responsive chart components
        
        	data type is Array<{
            id:    string | number,
            value: number
        	}>
        */
        
        const PieChart = (data) => {
        	return (
        		<ResponsivePie 
        			...
        			data={data}
        		/>
        	)
        }

### Storybook Component Setup

1. Create an `pie_chars.stories.ts` file next to the `PieChart.ts` component file

        import * as React from "react"
        
        import { storiesOf } from "@storybook/react"
        import { PieChart } from "./PieChart"
        
        /* 
        	Stories are to demonstrate the capabilities of a component
        	In this instance, we will need to supply data to the pie chart
        */
        
        storiesOf('PieChart', module)
        	.add("Demonstrate simple data passed to chart", () => {
        		<PieChart data={{ /* define simple example data here */ }} />
        })

### Client

1. Create the directory `src/client`
2. Create the file `client.ts`

    and setup to use library:

        import { createClient } from 'react-fetching-library';
        
        import { requestHostInterceptor } from './requestInterceptors/requestHostInterceptor';
        
        // Often the host endpoint would be hidden in evironment variables
        const HOST = 'ENDPOINT HERE';
        
        export const Client = createClient({
          requestInterceptors: [requestHostInterceptor(HOST)],
        });

3. Create the query action in `src/client/actions/fetchData.ts`

        export const fetchData = {
          method: 'GET',
          endpoint: '/',
        };

4. Create the client provider component and suspense wrapper

        ...
        import { ClientContextProvider } from 'react-fetching-library';
        import { Client } from './api/Client';
        
        const App = () => {
          return (
            <ClientContextProvider client={Client}>
        			<Suspense fallback={<ProgressSpinner />}>
        				{// Whatever children need the client>
        			</Suspense>
            </ClientContextProvider>
          );
        };
        ...

5. Create container component for chart component to handle the query for data

        ...
        import { useQuery } from 'react-fetching-library';
        import { fetchData } from '../client/actions'
        
        export const ChartContainer = () => {
        	const { loading, payload, error, query } = useQuery(fetchData)
        
        	if (error) return <ErrorButton onClick={query}/>
        	// Will add some data tranformation step here
        
        	return <PieChart data={transformedData} />
        }

### Data Tranformation Utility

- The data incoming from Treehouse is not the correct shape and we need to tranform it into a usable shape for the UI

1. Create the directory `src/util`
2. Inside that directory, create the file `fetchData_util.ts`
3. Create a function in the file that takes json data of this shape:

        {
        	"name": "Beavis"
        	"points": {
        		"total": 12345,
        		"javascript": 2345,
        		"ruby": 0,
        		...
        	}
        }

    and produces data of this shape:

        [
          {
            "id": "javascript",
            "label": "javascript",
            "value": 2345,
          },
        	...
        ]

    Removing the "total" and any data with the value of 0

4. Use this utility function withing the component that fetches the data

        ...
        import { useQuery } from 'react-fetching-library';
        import { fetchData } from '../client/actions'
        
        export const ChartContainer = () => {
        	const { loading, payload, error, query } = useQuery(fetchData)
        
        	if (error) return <ErrorButton onClick={query}/>
        
        	const transformedData = transformData(payload)
        
        	return <PieChart data={transformedData} />
        }

5. Create the directory `tests`
6. Create the file `tests/fetchData_test.js`
7. Write some tests considering all possibilities for the utility function

        describe("Confirm transformData", () => {
        	test("Should remove key of total from remote data")
        	test("Should remove objects with value of 0")
        })

### Spinner

1. Create the spinner component under the `components` directory
2. Should be a simple emogi animated to spin with css animations
3. Use as the suspense fallback

---