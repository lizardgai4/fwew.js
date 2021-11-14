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
      const target = 'tsayfnesänumvi'
      const p = prefix(w, target, w.data.Navi)
      expect(p).to.equal(target)
      expect(w.data.Affixes.Prefix.length).to.equal(2)
      expect(w.data.Affixes.Prefix[0]).to.equal('tsay')
      expect(w.data.Affixes.Prefix[1]).to.equal('fne')
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
      const target = 'tìnusume'
      const p = prefix(w, target, 'nusume')
      expect(p).to.equal(target)
      expect(w.data.Affixes.Prefix.length).to.equal(1)
      expect(w.data.Affixes.Prefix[0]).to.equal('tì')
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
      const target = 'ahawnawnu'
      const p = prefix(w, target, 'hawnawnu')
      expect(p).to.equal(target)
      expect(w.data.Affixes.Prefix.length).to.equal(1)
      expect(w.data.Affixes.Prefix[0]).to.equal('a')
    })

    it('should handle tsuk-verb', () => {
      // fwew tsukstawm
      const wordData = { Navi: 'stawm', PartOfSpeech: 'vtr.', Affixes: { Prefix: [], Infix: [], Lenition: [] } }
      const w = new Word(wordData)
      const target = 'tsukstawm'
      const p = prefix(w, target, w.data.Navi)
      expect(p).to.equal(target)
      expect(w.data.Affixes.Prefix.length).to.equal(1)
      expect(w.data.Affixes.Prefix[0]).to.equal('tsuk')
    })

    it('should handle ketsuk-verb', () => {
      // fwew ketsukkanom
      const wordData = { Navi: 'kanom', PartOfSpeech: 'vtr.', Affixes: { Prefix: [], Infix: [], Lenition: [] } }
      const w = new Word(wordData)
      const target = 'ketsukkanom'
      const p = prefix(w, target, w.data.Navi)
      expect(p).to.equal(target)
      expect(w.data.Affixes.Prefix.length).to.equal(1)
      expect(w.data.Affixes.Prefix[0]).to.equal('ketsuk')
    })

    it('should handle -siyu', () => {
      // fwew fnepamrelsiyu
      const wordData = { Navi: 'pamrel si', PartOfSpeech: 'vin.', Affixes: { Prefix: [], Infix: [], Lenition: [] } }
      const w = new Word(wordData)
      const target = 'fnepamrelsiyu'
      const p = prefix(w, target, 'pamrelsiyu')
      expect(p).to.equal(target)
      expect(w.data.Affixes.Prefix.length).to.equal(1)
      expect(w.data.Affixes.Prefix[0]).to.equal('fne')
    })

    it("should handle me with 'e", () => {
      // fwew men
      const wordData = { Navi: "'en", PartOfSpeech: 'n.', Affixes: { Prefix: [], Lenition: [] } }
      const w = new Word(wordData)
      const target = "men"
      const p = prefix(w, target, w.data.Navi)
      expect(p).to.equal(target)
      expect(w.data.Affixes.Prefix.length).to.equal(1)
      expect(w.data.Affixes.Prefix[0]).to.equal('me')
    })

    it("should handle pxe with 'e", () => {
      // fwew pxen
      const wordData = { Navi: "'en", PartOfSpeech: 'n.', Affixes: { Prefix: [], Lenition: [] } }
      const w = new Word(wordData)
      const target = 'pxen'
      const p = prefix(w, target, w.data.Navi)
      expect(p).to.equal(target)
      expect(w.data.Affixes.Prefix.length).to.equal(1)
      expect(w.data.Affixes.Prefix[0]).to.equal('pxe')
    })

    it("should handle pe with 'e", () => {
      // fwew pen
      const wordData = { Navi: "'en", PartOfSpeech: 'n.', Affixes: { Prefix: [], Infix: [], Lenition: [] } }
      const w = new Word(wordData)
      const target = 'pen'
      const p = prefix(w, target, w.data.Navi)
      expect(p).to.equal(target)
      expect(w.data.Affixes.Prefix.length).to.equal(1)
      expect(w.data.Affixes.Prefix[0]).to.equal('pe')
    })

    it("should handle pe with e", () => {
      // fwew pekxan
      const wordData = { Navi: "ekxan", PartOfSpeech: 'n.', Affixes: { Prefix: [], Infix: [], Lenition: [] } }
      const w = new Word(wordData)
      const target = 'pekxan'
      const p = prefix(w, target, w.data.Navi)
      expect(p).to.equal(target)
      expect(w.data.Affixes.Prefix.length).to.equal(1)
      expect(w.data.Affixes.Prefix[0]).to.equal('pe')
    })

    it('should handle soaiä', () => {
      // fwew aysoaiä
      const wordData = { Navi: "soaia", PartOfSpeech: 'n.', Affixes: { Prefix: [], Suffix: ['ä'], Lenition: [] } }
      const w = new Word(wordData)
      const target = 'aysoaiä'
      const p = prefix(w, target, 'soaiä')
      expect(p).to.equal(target)
      expect(w.data.Affixes.Prefix.length).to.equal(1)
      expect(w.data.Affixes.Prefix[0]).to.equal('ay')
    })

    it('should reject non-lenition-causing fne prefix with lenition', () => {
      // fwew fnetele
      const wordData = { Navi: "txele", PartOfSpeech: 'n.', Affixes: { Prefix: [], Suffix: [], Lenition: ['tx→t'] } }
      const w = new Word(wordData)
      const target = 'fnetele'
      const p = prefix(w, target, 'tele')
      expect(p).to.equal('tele')
      expect(w.data.Affixes.Prefix.length).to.equal(0)
    })

    it('should reject non-lenition-causing tsa prefix with lenition', () => {
      // fwew tsatele
      const wordData = { Navi: "txele", PartOfSpeech: 'n.', Affixes: { Prefix: [], Suffix: [], Lenition: ['tx→t'] } }
      const w = new Word(wordData)
      const target = 'tsatele'
      const p = prefix(w, target, 'tele')
      expect(p).to.equal('tele')
      expect(w.data.Affixes.Prefix.length).to.equal(0)
    })
  })

  describe('#suffix()', () => {
    it('should handle suffixes', () => {
      const wordData = { Navi: "'awkx", PartOfSpeech: 'n.', Affixes: { Suffix: [] } }
      const w = new Word(wordData)
      const target = "'awkxit"
      const s = suffix(w, target, w.data.Navi)
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(1)
      expect(w.data.Affixes.Suffix[0]).to.equal('it')
    })

    it('should handle tseyä', () => {
      const wordData = { Navi: "tsaw", Affixes: { Suffix: [] } }
      const w = new Word(wordData)
      const target = "tseyä"
      const s = suffix(w, target, w.data.Navi)
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(1)
      expect(w.data.Affixes.Suffix[0]).to.equal('yä')
    })

    it('should handle oey', () => {
      const wordData = { Navi: "oe", Affixes: { Suffix: [] } }
      const w = new Word(wordData)
      const target = "oey"
      const s = suffix(w, target, w.data.Navi)
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(1)
      expect(w.data.Affixes.Suffix[0]).to.equal('y')
    })

    it('should handle ngey', () => {
      const wordData = { Navi: "nga", Affixes: { Suffix: [] } }
      const w = new Word(wordData)
      const target = "ngey"
      const s = suffix(w, target, w.data.Navi)
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(1)
      expect(w.data.Affixes.Suffix[0]).to.equal('y')
    })

    it('should handle gerund', () => {
      const wordData = { Navi: "kar", PartOfSpeech: 'vtr.', Affixes: { Prefix: ['tì'], Infix: ['us'], Suffix: [] } }
      const w = new Word(wordData)
      const target = "tìkusarti"
      const s = suffix(w, target, 'tìkusar')
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(1)
      expect(w.data.Affixes.Suffix[0]).to.equal('ti')
    })

    it('should handle participle', () => {
      const wordData = { Navi: "kame", PartOfSpeech: 'vtr.', Affixes: { Prefix: [], Infix: ['awn'], Suffix: [] } }
      const w = new Word(wordData)
      const target = "kawnamea"
      const s = suffix(w, target, 'kawname')
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(1)
      expect(w.data.Affixes.Suffix[0]).to.equal('a')
    })

    it('should handle ketsuk-', () => {
      const wordData = { Navi: "tslam", PartOfSpeech: 'vtr.', Affixes: { Prefix: ['ketsuk'], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = "ketsuktslama"
      const s = suffix(w, target, 'ketsuktslam')
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(1)
      expect(w.data.Affixes.Suffix[0]).to.equal('a')
    })

    it('should handle tsuk-', () => {
      const wordData = { Navi: "tslam", PartOfSpeech: 'vtr.', Affixes: { Prefix: ['tsuk'], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = "tsuktslama"
      const s = suffix(w, target, 'tsuktslam')
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(1)
      expect(w.data.Affixes.Suffix[0]).to.equal('a')
    })

    it('should handle suffixing after -tswo on verbs', () => {
      const wordData = { Navi: "tse'a", PartOfSpeech: 'vtr.', Affixes: { Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = "tse'atswot"
      const s = suffix(w, target, w.data.Navi)
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(2)
      expect(w.data.Affixes.Suffix[0]).to.equal('tswo')
      expect(w.data.Affixes.Suffix[1]).to.equal('t')
    })

    it('should handle soaiä', () => {
      const wordData = { Navi: "soaia", PartOfSpeech: 'n.', Affixes: { Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = "soaiä"
      const s = suffix(w, target, w.data.Navi)
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(1)
      expect(w.data.Affixes.Suffix[0]).to.equal('ä')
    })

    it('should handle w dropping on tsaw when suffixed', () => {
      const wordData = { Navi: "tsaw", PartOfSpeech: 'pn.', Affixes: { Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = "tsamì"
      const s = suffix(w, target, w.data.Navi)
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(1)
      expect(w.data.Affixes.Suffix[0]).to.equal('mì')
    })

    it('should handle -siyu', () => {
      const wordData = { Navi: "uvan si", PartOfSpeech: 'vin.', Affixes: { Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = "uvansiyu"
      const s = suffix(w, target, w.data.Navi)
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(1)
      expect(w.data.Affixes.Suffix[0]).to.equal('yu')
    })

    it('should handle ngeyä', () => {
      const wordData = { Navi: 'nga', PartOfSpeech: 'pn.', Affixes: { Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = 'ngeyä'
      const s = suffix(w, target, w.data.Navi)
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(1)
      expect(w.data.Affixes.Suffix[0]).to.equal('yä')
    })

    it('should handle peyä', () => {
      const wordData = { Navi: 'po', PartOfSpeech: 'pn.', Affixes: { Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = 'peyä'
      const s = suffix(w, target, w.data.Navi)
      expect(s).to.equal(target)
      expect(w.data.Affixes.Suffix.length).to.equal(1)
      expect(w.data.Affixes.Suffix[0]).to.equal('yä')
    })
  })

  describe('#infix()', () => {
    it('should handle infixes', () => {
      const wordData = { Navi: "'ampi", PartOfSpeech: 'vtr.', InfixLocations: "'<0><1>amp<2>i", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      const target = "'äpeykiyevampatsi"
      const i = infix(w, target)
      const { Affixes: { Infix } } = w.data
      expect(i).to.equal(target)
      expect(Infix.length).to.equal(4)
      expect(Infix[0]).to.equal('äp')
      expect(Infix[1]).to.equal('eyk')
      expect(Infix[2]).to.equal('iyev')
      expect(Infix[3]).to.equal('ats')
    })

    it('should not try to infix twice', () => {
      const wordData = { Affixes: { Infix: ['iv'] } }
      const w = new Word(wordData)
      const target = 'target'
      const i = infix(w, target)
      expect(i).to.equal('')
    })

    it('should not try to operate on non-verbs', () => {
      const wordData = { InfixLocations: "NULL", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      const target = 'target'
      const i = infix(w, target)
      expect(i).to.equal('')
    })

    it('should handle zenke with ats', () => {
      const wordData = { Navi: 'zenke', InfixLocations: "z<0><1>en<2>ke", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      const target = 'zenatseke'
      const i = infix(w, target)
      expect(i).to.equal(target)
    })

    it('should handle zenke with uy', () => {
      const wordData = { Navi: 'zenke', InfixLocations: "z<0><1>en<2>ke", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      const target = 'zenuyeke'
      const i = infix(w, target)
      expect(i).to.equal(target)
    })

    it('should handle seiyi', () => {
      const wordData = { Navi: 'irayo si', InfixLocations: "irayo s<0><1><2>i", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      const target = 'irayo seiyi'
      const i = infix(w, target)
      expect(i).to.equal(target)
    })

    it('should handle poltxe', () => {
      const wordData = { Navi: 'plltxe', InfixLocations: "p<0><1>lltx<2>e", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      const target = 'poltxe'
      const i = infix(w, target)
      expect(i).to.equal(target)
    })

    it('should handle frrfen', () => {
      const wordData = { Navi: 'frrfen', InfixLocations: "f<0><1>rrf<2>en", Affixes: { Infix: [] } }
      const w = new Word(wordData)
      const target = 'frrfeien'
      const i = infix(w, target)
      expect(i).to.equal(target)
    })
  })

  describe('#lenite()', () => {
    it('should handle lenition', () => {
      const wordData = { Navi: 'teylu', PartOfSpeech: 'n.', Affixes: { Lenition: [] } }
      const w = new Word(wordData)
      const target = 'seylu'
      const l = lenite(w, w.data.Navi)
      expect(l).to.equal(target)
      expect(w.data.Affixes.Lenition.length).to.equal(1)
      expect(w.data.Affixes.Lenition[0]).to.equal('t→s')
    })
  })

  describe('#reconstruct()', () => {
    it('should handle infix for verb', () => {
      const wordData = { Navi: 'kä', PartOfSpeech: 'vin.', InfixLocations: 'k<0><1><2>ä', Affixes: { Infix: [] } }
      const w = new Word(wordData)
      const target = 'kivä'
      const success = reconstruct(w, target)
      expect(success).to.be.true
    })

    it('should handle prefix', () => {
      const wordData = { Navi: 'utral', PartOfSpeech: 'n.', Affixes: { Lenition: [], Prefix: [] } }
      const w = new Word(wordData)
      const target = 'ayutral'
      const success = reconstruct(w, target)
      expect(success).to.be.true
    })

    it('should handle suffix', () => {
      const wordData = { Navi: 'ikran', PartOfSpeech: 'n.', Affixes: { Lenition: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = 'ikranit'
      const success = reconstruct(w, target)
      expect(success).to.be.true
    })

    it('should handle lenition', () => {
      const wordData = { Navi: 'teylu', PartOfSpeech: 'n.', Affixes: { Lenition: [] } }
      const w = new Word(wordData)
      const target = 'seylu'
      const success = reconstruct(w, target)
      expect(success).to.be.true
    })

    it('should handle prefix suffix lenite', () => {
      const wordData = { Navi: "payoang", PartOfSpeech: 'n.', Affixes: { Lenition: [], Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = "fayfayoang"
      const success = reconstruct(w, target)
      expect(success).to.be.true
    })

    it('should handle prefix suffix', () => {
      const wordData = { Navi: "'u", PartOfSpeech: 'n.', Affixes: { Lenition: [], Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = "tsayuti"
      const success = reconstruct(w, target)
      expect(success).to.be.true
    })

    it('should handle lenition prefix', () => {
      const wordData = { Navi: "kelku", PartOfSpeech: 'n.', Affixes: { Lenition: [], Prefix: [], Infix: [], Suffix: [] } }
      const w = new Word(wordData)
      const target = "pepefnekelkut"
      const success = reconstruct(w, target)
      expect(success).to.be.true
    })
  })
})
