const { hashHelper, getRandomElement } = require('./functions')

module.exports = class SecondaryHashTable {
    constructor(p, array) {
        this.nj = array.length
        this.p = p

        this.Sj = new Array(this.nj ** 2)
        this.aj = getRandomElement(this.p)
        this.bj = getRandomElement(this.p)
        array.forEach(value => this.hashJ(value))

        this.checkRehashing(array)
    }

    checkRehashing(array) {
        let attempts = 0
        while (this.rehash() && attempts < 20) {
            this.Sj = new Array(this.nj ** 2)
            this.aj = getRandomElement(this.p)
            this.bj = getRandomElement(this.p)
            array.forEach(value => this.hashJ(value))
            attempts++
        }
    }

    rehash() {
        let flag = false
        this.Sj.forEach(el => el.length > 1 && (flag = true))
        return flag
    }

    hashJ(value) {
        hashHelper(value, this.aj, this.bj, this.p, this.Sj)
    }
}
