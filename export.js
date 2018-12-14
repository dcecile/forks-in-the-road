function clip(text) {
  const pre = document.createElement('pre')
  document.body.appendChild(pre)
  const node = document.createTextNode(text)
  pre.appendChild(node)
  const range = document.createRange()
  range.selectNode(pre)
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
  document.execCommand('copy')
  selection.removeAllRanges()
  document.body.removeChild(pre)
  console.log('Copied to clipboard')
}

function clipRows(rows) {
  const text = rows
    .map(row => row.join('\t'))
    .join('\n')
  clip(text)
}

var data = undefined;

async function getData() {
  const url = location.pathname.replace(/^\/app\/comparison\//, '/comparisons/')
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user'))['jwt']}`
    }
  })
  data = await response.json()
  console.log('Done')
}

function run() {
  const criteria = data.criteria

  const rows = data.alternatives.map(alternative => {
    const estimates = new Map(alternative.estimates.map(estimate =>
      [estimate.criterion_id, estimate.estimate]))
    return [
      alternative.name,
      alternative.url,
      criteria.length - estimates.size,
      criteria.map(criterion => {
        if (estimates.has(criterion.id)) {
          return estimates.get(criterion.id) * criterion.full_value
        } else {
          return criterion.default_estimate * criterion.full_value
        }
      }).reduce((a, b) => a + b, 0)
    ]
  })

  clipRows(rows)
}

// Start
getData()

// Wait for "Done", then format and copy
run()

// Paste as plain text (for Google Sheets)
