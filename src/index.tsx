import * as React from "react";
import { Suspense } from "react";
import { render } from "react-dom";
import { ClientContextProvider } from 'react-fetching-library';
import { Client } from './client/api';

import "./styles.css";

function App() {
  return (
    <ClientContextProvider client={Client}>
        <Suspense fallback={<div />}>
            <div className="children">Test</div>
        </Suspense>
    </ClientContextProvider>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
