const fs = require('fs')
const { getPrime, hashHelper, getRandomElement } = require('./functions')
const SecondaryHashTable = require('./SecondaryHashTable.js')

class HashTable {
    constructor(values) {
        this.hashes = new Array(values.length) //m
        this.p = getPrime(this.hashes.length ** 2)
        this.a = getRandomElement(this.p)
        this.b = getRandomElement(this.p)

        //Remove duplicates
        Array.from(new Set(values)).forEach(value => this.hash(value))

        //Create secondHashTable for all collisions
        this.hashes = this.hashes.map(hashedArray => {
            if (hashedArray === undefined) return null
            return hashedArray.length > 1
                ? new SecondaryHashTable(this.p, hashedArray)
                : hashedArray
        }
        )
    }

    hash(value) {
        hashHelper(value, this.a, this.b, this.p, this.hashes)
    }

    showTable() {
        this.hashes.forEach(hash => {
            if (hash instanceof SecondaryHashTable) {
                console.log(hash.Sj.filter(arrEl => arrEl));
            } else if (hash) {
                console.log(hash[0]);
            }
        })
    }
}

const main = () => {
    try {
        const data = fs.readFileSync(__dirname + '\\text.txt', 'utf8')
        const hashTable = new HashTable(data.split('\r\n').map(val => +val))
        hashTable.showTable()
    } catch (err) {
        console.error(err)
    }
}

main()


