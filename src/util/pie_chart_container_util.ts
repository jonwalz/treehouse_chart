const getLanguageData = (resp) => {
    return Object.entries(resp.points).reduce((acc, item, index) => {
        const [ language, points ] = item

        return points > 0 && language !== 'total'
            ? [
                  ...acc,
                  {
                      id: `${language}-${index}`,
                      label: `${language}`,
                      value: points,
                  },
              ]
            : acc
    }, [])
}

export { getLanguageData }
