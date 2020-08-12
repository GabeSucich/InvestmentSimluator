
class Calendar {
    constructor(history) {
        this.history = history
        this.timeline = this.createCalendar()
    }

    // The * represents a generator function. This kind of function produces a sequence of values that can be iterated over only once in order.
    // This specific function creates an iterable of the dates which are contained in the stock history being examined
    * createCalendar() {
        for (const key of Object.keys(this.history)) {
            yield key
        }
    }

    // This function allows us to get the next date in the iterable. 'this.timeline' is an iterator produced by the generatory function above. Calling 
    // "this.timeline.next()" gives the next value in the iterator. (The next date)
    getNextDate() {
        var nextDate = this.timeline.next()
        if (nextDate.done) {
            return null
        }
        else {
            return nextDate.value
        }
    }
}

module.exports = Calendar