const Helper = {

    removeDateDashes(date) {
        var noDashes = ""
        for (const character of date) {
            if (character !== "-") {
                noDashes += character
            }
        }
        return noDashes
    },
  
    process(str){
        var strInt = parseInt(str);
        console.log(strInt)
        console.log(Number.isInteger(strInt));
        return (strInt);
  
    },


    verifyInt(str) {

        if (str === undefined) {
            console.log('helper string undefined');
            return
        } else if (str === null) {
            console.log('helper string is null');
            return
        } else {
            console.log('helper, passes first tests ' + str);
            return this.process(str);
        }
    }
}

export default Helper