const getLanguageData = (resp: any) => {
    return Object.entries(resp).reduce((acc: any, item: any, index: number) => {
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
