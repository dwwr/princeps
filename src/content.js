const PHRASE = 'to stay up to date with their page'
const NEARBY_ANCESTORS = 4
const SCAN_DELAY_MS = 100
const clickedWhileChecked = new WeakSet()

function uncheckFollowBoxes(root) {
  const inputs = root.querySelectorAll('input[type="checkbox"]')
  for (const input of inputs) {
    if (!isFollowCheckbox(input)) continue
    if (!input.checked) {
      clickedWhileChecked.delete(input)
      continue
    }
    if (clickedWhileChecked.has(input)) continue
    clickedWhileChecked.add(input)
    input.click()
  }
}

function isFollowCheckbox(input) {
  const ariaLabel = input.getAttribute('aria-label') || ''
  if (includesPhrase(ariaLabel)) return true
  const label = labelFor(input)
  if (label && includesPhrase(label.textContent || '')) return true
  return hasNearbyPhrase(input)
}

function includesPhrase(text) {
  return text.toLowerCase().includes(PHRASE)
}

function labelFor(input) {
  const doc = input.ownerDocument
  if (input.id) {
    const labels = doc.querySelectorAll('label[for]')
    for (const label of labels) {
      if (label.getAttribute('for') === input.id) return label
    }
  }
  return input.closest('label')
}

function hasNearbyPhrase(input) {
  let scope = input.parentElement
  for (let depth = 0; depth < NEARBY_ANCESTORS && scope; depth += 1) {
    const boxes = scope.querySelectorAll('input[type="checkbox"]')
    if (boxes.length === 1 && scopeHasPhraseText(scope)) return true
    scope = scope.parentElement
  }
  return false
}

function scopeHasPhraseText(scope) {
  const elements = [scope, ...scope.querySelectorAll('*')]
  return elements.some(element => includesPhrase(directText(element)))
}

function directText(element) {
  let text = ''
  for (const child of element.childNodes) {
    if (child.nodeType === 3) text += child.textContent
  }
  return text
}

function watch(doc) {
  const scan = () => uncheckFollowBoxes(doc)
  scan()
  let pending
  const view = doc.defaultView
  const observer = new view.MutationObserver(() => {
    view.clearTimeout(pending)
    pending = view.setTimeout(scan, SCAN_DELAY_MS)
  })
  observer.observe(doc.documentElement, {
    childList: true,
    subtree: true,
  })
}

const isExtensionPage =
  (typeof browser !== 'undefined' && browser.runtime?.id) ||
  (typeof chrome !== 'undefined' && chrome.runtime?.id)

if (isExtensionPage) watch(document)
