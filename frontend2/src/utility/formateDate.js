
// Takes in date with format 2022-06-23T19:56:02.326Z
export const dateFormatter = (date) => {
    const year = date.slice(0, 4)
    let month = date.slice(5, 7)
    const day = date.slice(8, 10)

    switch(month) {
        case '01' :
            month = 'Jan' 
            break
        case '02' :
            month = 'Feb' 
            break
        case '03' :
            month = 'Mar' 
            break
        case '04' :
            month = 'Apr' 
            break
        case '05' :
            month = 'May' 
            break
        case '06' :
            month = 'Jun' 
            break
        case '07' :
            month = 'Jul' 
            break
        case '08' :
            month = 'Aug' 
            break
        case '09' :
            month = 'Sept' 
            break
        case '10' :
            month = 'Oct' 
            break
        case '11' :
            month = 'Nov' 
            break
        case '12' :
            month = 'Dec' 
            break
    }

    return `${month} ${day}, ${year}`
}