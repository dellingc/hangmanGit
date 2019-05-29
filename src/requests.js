const getPuzzle = async (wordCount) => {
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error('Unable to get puzzle')
    }
}

// const getPuzzleOld = (wordCount) => {
//     return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('Unable to fetch the puzzle')
//         }
//     }).then((data) => {
//         return data.puzzle
//     })
// }


const getCountry = async (countryCode) => {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    if (response.status === 200) {
        const data = await response.json()
        return data.find((country) => country.alpha2Code === countryCode)
    } else {
        throw new Error('Cannot get country code')
    }
}    
           
// const getCountryOld = (countryCode) => {
//     return fetch('https://restcountries.eu/rest/v2/all').then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('Unable to access country data')
//         }
//     }).then((data) => {
//         return data.find((country) => country.alpha2Code === countryCode)
//     })
// }

const getLocation = async () => {
    const response = await fetch('http://ipinfo.io/json?token=b663b4e9af89e8')
    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw new Error('Cannot get country name')
    }
}
// const getLocationOld = () => {
//     return fetch('http://ipinfo.io/json?token=b663b4e9af89e8').then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error('Unable to access location')
//         }
//     })
// }


const getCurrentCountry = async () => {
    const location = await getLocation()
    const country = await getCountry(location.country)
    return country
}

export { getPuzzle as default}