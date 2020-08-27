import colors from "./Colors.json"

export default function randomColors() {

    var colorCopy = colors.slice()

    const randomColorsArr = []

    while (colorCopy.length > 0) {
        
        let randomIndex = Math.floor(colorCopy.length*Math.random())
        randomColorsArr.push(colorCopy[randomIndex])
        colorCopy.splice(randomIndex, 1)
    }

    return randomColorsArr

}