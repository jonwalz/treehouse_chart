import { getLanguageData } from "../util/pie_chart_container_util"
import { mockLanguageData, mockLanguageDataWithZero } from "./mockData"
describe("Confirm getLanguageData", () => {
    test("Should remove key of total from remote data", () => {
        const actual = getLanguageData(mockLanguageData)
        const expected = [{
            "id": "javascript-1",
            "label": "javascript",
            "value": 345,
        }]

        expect(actual).toEqual(expected)
    })

	test("Should remove objects with value of 0", () => {
        const actual = getLanguageData(mockLanguageDataWithZero)
        const expected = [{
            "id": "javascript-1",
            "label": "javascript",
            "value": 345,
        }]

        expect(actual).toEqual(expected)
    })
})