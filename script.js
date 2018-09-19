const version = 'v.2.0'
populateProviders = () => {
    function DeleteProvider(event, tbl, tr) {
        tbl.removeChild(tr)
    }
}

/*
    Pre-load table fr
 */
let isEven = true
preload = (dataset) => {
    datatset.sort((x, y) => x.last_name.toLowerCase() <= y.last_name.toLowerCase() ? -1 : 1)
        .forEach(async function (n, i) {
            let clone = document.importNode(tmp.content, true)
            let tr = clone.querySelector('.tr-provider')
            let btn = clone.querySelector('.del-button')
            btn.addEventListener('click', (event) => {
                DeleteProvider.bind(btn, event, tbl, tr).call(event, tbl, tbl.querySelector('#id'))
            })
            await mapElement(clone, '.lastname', n['last_name'])
            await mapElement(clone, '.firstname', n['first_name'])
            await mapElement(clone, '.specialty', n['specialty'])
            await mapElement(clone, '.email', n['email_address'])
            await mapElement(clone, '.practice', n['practice_name'])
            clone.querySelectorAll('.tr-provider')
                .forEach(function (row) {
                    row.setAttribute('id', String(i))
                    row.setAttribute('data-search-keys', `${n['last_name']} ${n['first_name']} ${n['specialty']} ${n['email_address']} ${n['practice_name']}`.toLowerCase())
                    row.setAttribute('data-sort-last_name', `${n['last_name']}`)
                    row.setAttribute('data-sort-first_name', `${n['first_name']}`)
                    row.setAttribute('data-sort-email_address', `${n['email_address']}`)
                    row.setAttribute('data-sort-specialty', `${n['specialty']}`)
                    row.setAttribute('data-sort-practice_name', `${n['practice_name']}`)
                    row.setAttribute('class', isEven ? `tr-provider even-row` : `tr-provider odd-row`)
                })
            tbl.appendChild(clone)
            isEven = !isEven
        })
}

const sortByLastName = (x, y) => {
    return x.last_name.toUpperCase() < y.last_name.toUpperCase() ? -1 : 1
}

const mapElement = async (node, selector, value) => {
    const elem = node.querySelector(selector)
    elem.innerHTML = value ? value : ''
    elem.class = `${elem.class} ${selector} data-value`
    const keyword = selector.substring(1)
}

/*
 * Row-sort comparator
*/
compareRows = (row1, row2, sortKey, asc) => {
    return asc ? row1.getAttribute(sortKey).toLowerCase() <= row2.getAttribute(sortKey).toLowerCase() ? -1 : 1
    : row1.getAttribute(sortKey).toLowerCase() > row2.getAttribute(sortKey).toLowerCase() ? -1 : 1
}

sortByEventHandler = (event) => {
    console.log(event)
    const sortKey = Array.from(document.querySelector('#sort-by'))
        .filter((opt) => opt.selected === true)[0]
        .getAttribute('data-sort-key')
    const sortOrderIsAsc = Array.from(document.querySelector('#sort-order'))
        .filter((opt) => opt.selected === true)[0]
        .getAttribute('data-sort-asc') === "true"
    const array = Array.from(tbl.querySelectorAll('.tr-provider'))
        .sort((x, y) => compareRows(x, y, `data-sort-${sortKey}`, sortOrderIsAsc) )
    let isEven = true
    array.forEach((n) => {
        n.setAttribute('class', isEven ? 'tr-provider even-row' : 'tr-provider odd-row')
        isEven = !isEven
        tbl.appendChild(n)
    })
}
const saveEventHandler = async (event) => {
    const clone = document.importNode(tmp.content, true)
    const form = document.querySelector('#form-provider')
    const tr = clone.querySelector('.tr-provider')
    const lname = form.querySelector('#last_name').value
    const fname = form.querySelector('#first_name').value
    const specialty = form.querySelector('#specialty').value
    const email = form.querySelector('#email_address').value
    const practice = form.querySelector('#practice_name').value
    await mapElement(clone, '.lastname', lname)
    await mapElement(clone, '.firstname', fname)
    await mapElement(clone, '.specialty', specialty)
    await mapElement(clone, '.email', email)
    await mapElement(clone, '.practice', practice)
    tr.setAttribute('data-search-keys', `${lname} ${fname} ${specialty} ${email} ${practice}`.toLowerCase())
    tr.setAttribute(`data-sort-last_name`, lname)
    tr.setAttribute(`data-sort-first_name`, fname)
    tr.setAttribute(`data-sort-email_address`, email)
    tr.setAttribute(`data-sort-specialty`, specialty)
    tr.setAttribute(`data-sort-practice_name`, practice)
    tbl.appendChild(clone)
    let isEven = true
    let nTbl = document.createElement('table')
    await tbl.querySelectorAll('.tr-provider')
        .forEach((n) => {
            n.setAttribute('class', isEven ? 'tr-provider even-row' : 'tr-provider odd-row')
            isEven = !isEven
        })
    tbl.appendChild(nTbl)
    form.reset()
}

const searchEventListener = async (event) => {
    tbl.querySelectorAll('.tr-provider')
        .forEach((r) => {
            if (!(r.getAttribute('data-search-keys').match(`.*${event.currentTarget.value}.*`))) {
                r.hidden = true
            } else if ((r.getAttribute('data-search-keys').match(`.*${event.currentTarget.value}.*`))) {
                r.hidden = false
            }
        })
}

