/* spell-checker: disable */
const expect = require('chai').expect
const { random } = require('../lib')

describe('random module', () => {
  describe('#random()', () => {
    it('should get 8 random words', () => {
      const results = random(8, [])
      expect(results).to.exist
      expect(results.length).to.equal(8)
      results.forEach((w) => expect(w).to.exist)
    })

    it('should get random number of random words', () => {
      const results = random(-1, [])
      expect(results).to.exist
      expect(results.length).to.be.greaterThan(0)
      results.forEach((w) => expect(w).to.exist)
    })

    it('should get 10 random transitive verbs', () => {
      const results = random(10, ['pos', 'is', 'vtr.'])
      expect(results).to.exist
      expect(results.length).to.equal(10)
      results.forEach((w) => expect(w.data.PartOfSpeech).to.equal('vtr.'))
    })

    it('should return empty array when no words satify condition', () => {
      const results = random(20, ['word', 'ends', 'Q'])
      expect(results).to.exist
      expect(results.length).to.equal(0)
    })

    it('should return entire dictionary if the number is larger than number of words', () => {
      const results = random(dictionary.length + 100, [])
      expect(results).to.exist
      expect(results.length).to.equal(dictionary.length)
    })
  })
})
