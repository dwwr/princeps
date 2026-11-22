import assert from 'node:assert/strict'
import { test } from 'node:test'
import { parseHTML } from 'linkedom'
import { uncheckFollowBoxes } from '../src/content.js'

const pasted = `
<div class="cfsa2a cfsfyi cfsgh6 cfskdg"><div class="cfsh94 cfsgh6 cfsf1u cfsjdx cfsjdo cfskdg"><input id="_r_275_" class="cfskgx cfskej cfskei cfsjgf cfsjhb cfsjh7 cfsji3 cfsh9o cfsjrd cfsfxa cfsgdm" tabindex="0" aria-label="Follow FutureTech Recruitment to stay up to date with their page" type="checkbox" checked=""><label class="cfskg1 cfskg0 cfsayi cfsh94 cfskdg" for="_r_275_"></label></div></div><div class="cfskdm cfsg3i cfsjj1 cfsjki cfsjk2 cfsayy cfsg2e cfsh9i cfsh8z cfsh9a cfsg42 cfsf9m cfskdg"><p class="cfsjq5 cfsjwr cfsjqj cfseq8 cfsjq3 cfsjzq">Follow FutureTech Recruitment to stay up to date with their page</p></div>
`

function page(body) {
  const document = parseHTML(
    `<!doctype html><html><body>${body}</body></html>`
  ).document
  for (const input of document.querySelectorAll('input[type="checkbox"]')) {
    let checked = input.hasAttribute('checked')
    Object.defineProperty(input, 'checked', {
      configurable: true,
      get: () => checked,
      set: value => {
        checked = Boolean(value)
      },
    })
    input.click = () => {
      checked = !checked
    }
  }
  return document
}

test('unchecks the aria-label follow box and leaves other boxes checked', () => {
  const document = page(`
    ${pasted}
    <input id="terms" type="checkbox" checked>
    <label for="terms">I agree to the terms</label>
  `)
  const follow = document.getElementById('_r_275_')
  const terms = document.getElementById('terms')
  assert.equal(follow.checked, true)
  assert.equal(terms.checked, true)
  uncheckFollowBoxes(document)
  assert.equal(follow.checked, false)
  assert.equal(terms.checked, true)
})

test('unchecks a follow box whose label contains the phrase', () => {
  const document = page(`
    <label for="follow-old">Follow Acme to stay up to date with their page</label>
    <input id="follow-old" type="checkbox" checked>
    <input id="other" type="checkbox" checked>
    <label for="other">Email me jobs</label>
  `)
  uncheckFollowBoxes(document)
  assert.equal(document.getElementById('follow-old').checked, false)
  assert.equal(document.getElementById('other').checked, true)
})

test('unchecks from nearby text when aria-label is missing and the label is empty', () => {
  const document = page(
    pasted.replace(
      ' aria-label="Follow FutureTech Recruitment to stay up to date with their page"',
      ''
    )
  )
  const follow = document.querySelector('input[type="checkbox"]')
  assert.equal(follow.getAttribute('aria-label'), null)
  assert.equal(follow.checked, true)
  uncheckFollowBoxes(document)
  assert.equal(follow.checked, false)
})

test('clicks a follow box once until it clears, then again if it is rechecked', () => {
  const document = page(`
    <input id="follow" type="checkbox" checked aria-label="Follow Acme to stay up to date with their page">
  `)
  const input = document.getElementById('follow')
  let clicks = 0
  input.click = () => {
    clicks += 1
  }
  uncheckFollowBoxes(document)
  uncheckFollowBoxes(document)
  assert.equal(clicks, 1)
  input.checked = false
  uncheckFollowBoxes(document)
  input.checked = true
  uncheckFollowBoxes(document)
  assert.equal(clicks, 2)
})

test('leaves an unchecked follow box unchecked', () => {
  const document = page(`
    <input id="follow" type="checkbox" aria-label="Follow Acme to stay up to date with their page">
  `)
  uncheckFollowBoxes(document)
  assert.equal(document.getElementById('follow').checked, false)
})
