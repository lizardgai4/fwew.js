//  This file is part of fwew.js.
//  fwew.js is free software: you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//  fwew.js is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with fwew.js.  If not, see http://gnu.org/licenses/
/* spell-checker: disable */
const expect = require('chai').expect;
const { getLenitionTable, prefix, suffix, infix, lenite, reconstruct, Word } = require('../lib')

describe('affixes module', () => {
  describe('#getLenitionTable()', () => {
    it('should return the lenition table', () => {
      const lenitionTable = getLenitionTable()
      expect(lenitionTable).to.exist
      expect(JSON.stringify(lenitionTable)).to.equal(`{"kx":"k","px":"p","tx":"t","k":"h","p":"f","ts":"s","t":"s","'":""}`)
    })
  })

  describe('#prefix()', () => {
    it('should handle prefixes', () => {
      // fwew tsayfnesänumvi
      const wordData = { Navi: 'sänumvi', PartOfSpeech: 'n.', Affixes: { Prefix: [], Lenition: [] } }
      const w = new Word(wordData)
      w.target = 'tsayfnesänumvi'
      w.attempt = w.data.Navi
      const p = prefix(w)
      expect(p.attempt).to.equal(w.target)
      expect(p.data.Affixes.Prefix.length).to.equal(2)
      expect(p.data.Affixes.Prefix[0]).to.equal('tsay')
      expect(p.data.Affixes.Prefix[1]).to.equal('fne')
    })

    it('should handle gerund', () => {
      // fwew tìnusume
      const wordData = { 
        Navi: 'nume',
        PartOfSpeech: 'vin.',
        InfixLocations: 'n<0><1>um<2>e', 
        Affixes: { Prefix: [], Infix: ['us'], Lenition: [] }
      }
      const w = new Word(wordData)
      w.target = 'tìnusume'
      w.attempt = 'nusume'
      const p = prefix(w)
      expect(p.attempt).to.equal(p.target)
      expect(p.data.Affixes.Prefix.length).to.equal(1)
      expect(p.data.Affixes.Prefix[0]).to.equal('tì')
    })

    it('should handle passive participle', () => {
      // fwew ahawnawnu
      const wordData = { 
        Navi: 'hawnu',
        PartOfSpeech: 'vtr.',
        InfixLocations: 'h<0><1>awn<2>u', 
        Affixes: { Prefix: [], Infix: ['awn'], Lenition: [] }
      }
      const w = new Word(wordData)
      w.target = 'ahawnawnu'
      w.attempt = 'hawnawnu'
      const p = prefix(w)
      expect(p.attempt).to.equal(p.target)
      expect(p.data.Affixes.Prefix.length).to.equal(1)
      expect(p.data.Affixes.Prefix[0]).to.equal('a')
    })

    it('should handle tsuk-verb', () => {
      // fwew tsukstawm
      const wordData = { Navi: 'stawm', PartOfSpeech: 'vtr.', Affixes: { Prefix: [], Infix: [], Lenition: [] } }
      const w = new Word(wordData)
      w.target = 'tsukstawm'
      w.attempt = w.data.Navi
      const p = prefix(w)
      expect(p.attempt).to.equal(p.target)
      expect(p.data.Affixes.Prefix.length).to.equal(1)
      expect(p.data.Affixes.Prefix[0]).to.equal('tsuk')
    })

    it('should handle ketsuk-verb', () => {
      // fwew ketsukkanom
      const wordData = { Navi: 'kanom', PartOfSpeech: 'vtr.', Affixes: { Prefix: [], Infix: [], Lenition: [] } }
      const w = new Word(wordData)
      w.target = 'ketsukkanom'
      w.attempt = w.data.Navi
      const p = prefix(w)
      expect(p.attempt).to.equal(p.target)
      expect(p.data.Affixes.Prefix.length).to.equal(1)
      expect(p.data.Affixes.Prefix[0]).to.equal('ketsuk')
    })

    it('should handle -siyu', () => {
      // fwew fnepamrelsiyu
      const wordData = { Navi: 'pamrelsiyu', PartOfSpeech: 'vin.', Affixes: { Prefix: [], Infix: [], Lenition: [] } }
      const w = new Word(wordData)
      w.target = 'fnepamrelsiyu'
      w.attempt = w.data.Navi
      const p = prefix(w)
      expect(p.attempt).to.equal(p.target)
      expect(p.data.Affixes.Prefix.length).to.equal(1)
      expect(p.data.Affixes.Prefix[0]).to.equal('fne')
    })

    it("should handle me with 'e", () => {
      // fwew men
      const wordData = { Navi: "'en", PartOfSpeech: 'n.', Affixes: { Prefix: [], Lenition: [] } }
      const w = new Word(wordData)
      w.target = "men"
      w.attempt = w.data.Navi
      const p = prefix(w)
      expect(p.attempt).to.equal(p.target)
      expect(p.data.Affixes.Prefix.length).to.equal(1)
      expect(p.data.Affixes.Prefix[0]).to.equal('me')
    })

    it("should handle pxe with 'e", () => {
      // fwew pxen
      const wordData = { Navi: "'en", PartOfSpeech: 'n.', Affixes: { Prefix: [], Lenition: [] } }
      const w = new Word(wordData)
      w.target = 'pxen'
      w.attempt = w.data.Navi
      const p = prefix(w)
      expect(p.attempt).to.equal(p.target)
      expect(p.data.Affixes.Prefix.length).to.equal(1)
      expect(p.data.Affixes.Prefix[0]).to.equal('pxe')
    })

    it("should handle pe with 'e", () => {
      // fwew pen
      const wordData = { Navi: "'en", PartOfSpeech: 'n.', Affixes: { Prefix: [], Infix: [], Lenition: [] } }
      const w = new Word(wordData)
      w.target = 'pen'
      w.attempt = w.data.Navi
      const p = prefix(w)
      expect(p.attempt).to.equal(p.target)
      expect(p.data.Affixes.Prefix.length).to.equal(1)
      expect(p.data.Affixes.Prefix[0]).to.equal('pe')
    })

    it("should handle pe with e", () => {
      // fwew pekxan
      const wordData = { Navi: "ekxan", PartOfSpeech: 'n.', Affixes: { Prefix: [], Infix: [], Lenition: [] } }
      const w = new Word(wordData)
      w.target = 'pekxan'
      w.attempt = w.data.Navi
      const p = prefix(w)
      expect(p.attempt).to.equal(p.target)
      expect(p.data.Affixes.Prefix.length).to.equal(1)
      expect(p.data.Affixes.Prefix[0]).to.equal('pe')
    })

    it('should handle soaiä', () => {
      // fwew aysoaiä
      const wordData = { Navi: "soaia", PartOfSpeech: 'n.', Affixes: { Prefix: [], Suffix: ['ä'], Lenition: [] } }
      const w = new Word(wordData)
      w.target = 'aysoaiä'
      w.attempt = 'soaiä'
      const p = prefix(w)
      expect(p.attempt).to.equal(p.target)
      expect(p.data.Affixes.Prefix.length).to.equal(1)
      expect(p.data.Affixes.Prefix[0]).to.equal('ay')
    })

    it('should reject non-lenition-causing fne prefix with lenition', () => {
      // fwew fnetele
      const wordData = { Navi: "txele", PartOfSpeech: 'n.', Affixes: { Prefix: [], Suffix: [], Lenition: ['tx→t'] } }
      const w = new Word(wordData)
      w.target = 'fnetele'
      w.attempt = 'tele'
      const p = prefix(w)
      expect(p.attempt).to.equal('tele')
      expect(p.data.Affixes.Prefix.length).to.equal(0)
    })

    it('should reject non-lenition-causing tsa prefix with lenition', () => {
      // fwew tsatele
      const wordData = { Navi: "txele", PartOfSpeech: 'n.', Affixes: { Prefix: [], Suffix: [], Lenition: ['tx→t'] } }
      const w = new Word(wordData)
      w.target = 'tsatele'
      w.attempt = 'tele'
      const p = prefix(w)
      expect(p.attempt).to.equal('tele')
      expect(p.data.Affixes.Prefix.length).to.equal(0)
    })
  })

  describe('#suffix()', () => {
    it('should handle suffixes', () => {
      const wordData = { Navi: "'awkx", PartOfSpeech: 'n.', Affixes: { Suffix: [] } }
      const w = new Word(wordData)
      w.target = "'awkxit"
      w.attempt = w.data.Navi
      const s = suffix(w)
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(1)
      expect(s.data.Affixes.Suffix[0]).to.equal('it')
    })

    it('should handle tseyä', () => {
      const wordData = { Navi: "tsaw", Affixes: { Suffix: [] } }
      const w = new Word(wordData)
      w.target = "tseyä"
      w.attempt = w.data.Navi
      const s = suffix(w)
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(1)
      expect(s.data.Affixes.Suffix[0]).to.equal('yä')
    })

    it('should handle oey', () => {
      const wordData = { Navi: "oe", Affixes: { Suffix: [] } }
      const w = new Word(wordData)
      w.target = "oey"
      w.attempt = w.data.Navi
      const s = suffix(w)
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(1)
      expect(s.data.Affixes.Suffix[0]).to.equal('y')
    })

    it('should handle ngey', () => {
      const wordData = { Navi: "nga", Affixes: { Suffix: [] } }
      const w = new Word(wordData)
      w.target = "ngey"
      w.attempt = w.data.Navi
      const s = suffix(w)
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(1)
      expect(s.data.Affixes.Suffix[0]).to.equal('y')
    })

    it('should handle gerund', () => {
      const wordData = { Navi: "kar", PartOfSpeech: 'vtr.', Affixes: { Prefix: ['tì'], Infix: ['us'], Suffix: [] } }
      const w = new Word(wordData)
      w.target = "tìkusarti"
      w.attempt = "tìkusar"
      const s = suffix(w)
      
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(1)
      expect(s.data.Affixes.Suffix[0]).to.equal('ti')
    })

    it('should handle participle', () => {
      const wordData = { Navi: "kame", PartOfSpeech: 'vtr.', Affixes: { Prefix: [], Infix: ['awn'], Suffix: [] } }
      const w = new Word(wordData)
      w.target = "kawnamea"
      w.attempt = "kawname"
      const s = suffix(w)
      
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(1)
      expect(s.data.Affixes.Suffix[0]).to.equal('a')
    })

    it('should handle ketsuk-', () => {
      const wordData = { Navi: "tslam", PartOfSpeech: 'vtr.', Affixes: { Prefix: ['ketsuk'], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      w.target = "ketsuktslama"
      w.attempt = "ketsuktslam"
      const s = suffix(w)
      
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(1)
      expect(s.data.Affixes.Suffix[0]).to.equal('a')
    })

    it('should handle tsuk-', () => {
      const wordData = { Navi: "tslam", PartOfSpeech: 'vtr.', Affixes: { Prefix: ['tsuk'], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      w.target = "tsuktslama"
      w.attempt = "tsuktslam"
      const s = suffix(w)
      
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(1)
      expect(s.data.Affixes.Suffix[0]).to.equal('a')
    })

    it('should handle suffixing after -tswo on verbs', () => {
      const wordData = { Navi: "tse'a", PartOfSpeech: 'vtr.', Affixes: { Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      w.target = "tse'atswot"
      w.attempt = w.data.Navi
      const s = suffix(w)
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(2)
      expect(s.data.Affixes.Suffix[0]).to.equal('tswo')
      expect(s.data.Affixes.Suffix[1]).to.equal('t')
    })

    it('should handle soaiä', () => {
      const wordData = { Navi: "soaia", PartOfSpeech: 'n.', Affixes: { Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      w.target = "soaiä"
      w.attempt = w.data.Navi
      const s = suffix(w)
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(1)
      expect(s.data.Affixes.Suffix[0]).to.equal('ä')
    })

    it('should handle w dropping on tsaw when suffixed', () => {
      const wordData = { Navi: "tsaw", PartOfSpeech: 'pn.', Affixes: { Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      w.target = "tsamì"
      w.attempt = w.data.Navi
      const s = suffix(w)
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(1)
      expect(s.data.Affixes.Suffix[0]).to.equal('mì')
    })

    it('should handle -siyu', () => {
      const wordData = { Navi: "uvan si", PartOfSpeech: 'vin.', Affixes: { Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      w.target = "uvansiyu"
      w.attempt = w.data.Navi
      const s = suffix(w)
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(1)
      expect(s.data.Affixes.Suffix[0]).to.equal('yu')
    })

    it('should handle ngeyä', () => {
      const wordData = { Navi: 'nga', PartOfSpeech: 'pn.', Affixes: { Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      w.target = 'ngeyä'
      w.attempt = w.data.Navi
      const s = suffix(w)
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(1)
      expect(s.data.Affixes.Suffix[0]).to.equal('yä')
    })

    it('should handle peyä', () => {
      const wordData = { Navi: 'po', PartOfSpeech: 'pn.', Affixes: { Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      w.target = 'peyä'
      w.attempt = w.data.Navi
      const s = suffix(w)
      expect(s.attempt).to.equal(s.target)
      expect(s.data.Affixes.Suffix.length).to.equal(1)
      expect(s.data.Affixes.Suffix[0]).to.equal('yä')
    })
  })

  describe('#infix()', () => {
    it('should handle infixes', () => {
      const wordData = { Navi: "'ampi", PartOfSpeech: 'vtr.', InfixLocations: "'<0><1>amp<2>i", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      w.target = "'äpeykiyevampatsi"
      w.mpt = w.data.Navi
      w.attempt = w.data.Navi
      const i = infix(w)
      const { Affixes: { Infix } } = i.data
      expect(i.attempt).to.equal(i.target)
      expect(Infix.length).to.equal(4)
      expect(Infix[0]).to.equal('äp')
      expect(Infix[1]).to.equal('eyk')
      expect(Infix[2]).to.equal('iyev')
      expect(Infix[3]).to.equal('ats')
    })

    it('should not try to infix twice', () => {
      const wordData = { Affixes: { Infix: ['iv'] } }
      const w = new Word(wordData)
      w.target = 'target'
      w.attempt = w.data.Navi
      const i = infix(w)
      expect(i.attempt).to.equal(w.attempt)
    })

    it('should not try to operate on non-verbs', () => {
      const wordData = { InfixLocations: "NULL", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      w.target = 'target'
      w.attempt = w.data.Navi
      const i = infix(w)
      expect(i.attempt).to.equal(w.attempt)
    })

    it('should handle zenke with ats', () => {
      const wordData = { Navi: 'zenke', InfixLocations: "z<0><1>en<2>ke", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      w.target = 'zenatseke'
      w.attempt = w.data.Navi
      const i = infix(w)
      expect(i.attempt).to.equal(i.target)
    })

    it('should handle zenke with uy', () => {
      const wordData = { Navi: 'zenke', InfixLocations: "z<0><1>en<2>ke", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      w.target = 'zenuyeke'
      w.attempt = w.data.Navi
      const i = infix(w)
      expect(i.attempt).to.equal(i.target)
    })

    it('should handle seiyi', () => {
      const wordData = { Navi: 'irayo si', InfixLocations: "irayo s<0><1><2>i", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      w.target = 'irayo seiyi'
      w.attempt = w.data.Navi
      const i = infix(w)
      expect(i.attempt).to.equal(i.target)
    })

    it('should handle poltxe', () => {
      const wordData = { Navi: 'plltxe', InfixLocations: "p<0><1>lltx<2>e", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      w.target = 'poltxe'
      w.attempt = w.data.Navi
      const i = infix(w)
      expect(i.attempt).to.equal(i.target)
    })

    it('should handle frrfen', () => {
      const wordData = { Navi: 'frrfen', InfixLocations: "f<0><1>rrf<2>en", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      w.target = 'frrfeien'
      w.attempt = w.data.Navi
      const i = infix(w)
      expect(i.attempt).to.equal(i.target)
    })
  })

  describe('#lenite()', () => {
    it('should handle lenition', () => {
      const wordData = { Navi: 'teylu', PartOfSpeech: 'n.', Affixes: { Lenition: [] } }
      const w = new Word(wordData)
      w.target = 'seylu'
      w.attempt = w.data.Navi
      const l = lenite(w)
      expect(l.attempt).to.equal(l.target)
      expect(l.data.Affixes.Lenition.length).to.equal(1)
      expect(l.data.Affixes.Lenition[0]).to.equal('t→s')
    })
  })

  describe('#reconstruct()', () => {
    it('should handle infix for verb', () => {
      const wordData = { Navi: 'kä', PartOfSpeech: 'vin.', InfixLocations: 'k<0><1><2>ä', Affixes: { Infix: [] } }
      const w = new Word(wordData)
      const target = 'kivä'
      const result = reconstruct(w, target)
      expect(result).not.to.be.undefined
    })

    it('should handle prefix', () => {
      const wordData = { Navi: 'utral', PartOfSpeech: 'n.', Affixes: { Lenition: [], Prefix: [] } }
      const w = new Word(wordData)
      const target = 'ayutral'
      const result = reconstruct(w, target)
      expect(result).not.to.be.undefined
    })

    it('should handle suffix', () => {
      const wordData = { Navi: 'ikran', PartOfSpeech: 'n.', Affixes: { Lenition: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = 'ikranit'
      const result = reconstruct(w, target)
      expect(result).not.to.be.undefined
    })

    it('should handle lenition', () => {
      const wordData = { Navi: 'teylu', PartOfSpeech: 'n.', Affixes: { Lenition: [] } }
      const w = new Word(wordData)
      const target = 'seylu'
      const result = reconstruct(w, target)
      expect(result).not.to.be.undefined
    })

    it('should handle prefix suffix lenite', () => {
      const wordData = { Navi: "payoang", PartOfSpeech: 'n.', Affixes: { Lenition: [], Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = "fayfayoang"
      const result = reconstruct(w, target)
      expect(result).not.to.be.undefined
    })

    it('should handle prefix suffix', () => {
      const wordData = { Navi: "'u", PartOfSpeech: 'n.', Affixes: { Lenition: [], Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = "tsayuti"
      const result = reconstruct(w, target)
      expect(result).not.to.be.undefined
    })

    it('should handle lenition prefix', () => {
      const wordData = { Navi: "kelku", PartOfSpeech: 'n.', Affixes: { Lenition: [], Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = "pepefnekelkut"
      const result = reconstruct(w, target)
      expect(result).not.to.be.true
    })
  })
})
