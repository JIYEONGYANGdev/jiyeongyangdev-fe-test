export const parseQueryString = (search: string): Record<string, string> =>
  (search || '')
    .replace(/^\?/g, '')
    .split('&')
    .reduce((acc, query) => {
      const [key, value] = query.split('=')

      if (key) {
        acc[key] = decodeURIComponent(value)
      }

      return acc
    }, {} as Record<string, string>)

const commaSplit = /(?=(?:\d{3})+(?:\.|$))/g
export const convertedPriceString = (number = 0) => {
  return `${number.toString().split(commaSplit).join(',')}`
}
