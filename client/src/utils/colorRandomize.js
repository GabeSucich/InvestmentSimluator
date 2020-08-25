import colors from "./Colors.json"

export default function randomColors() {

    const randomColorsArr = []

    while (colors.length > 0) {
        let randomIndex = Math.floor(colors.length*Math.random())
        randomColorsArr.push(colors[randomIndex])
        colors.splice(randomIndex, 1)
    }

    return randomColorsArr

}