import { Action } from "react-fetching-library";

export const fetchPoints: Action = {
    method: 'GET',
    endpoint: 'http://localhost:8080/points',
}
