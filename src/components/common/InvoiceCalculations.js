import React from 'react'

export const CalculateTotal = (props) => {
    let total = 0
    let discount_total = 0
    let tax_total = 0
    let sub_total = 0
    let lexieTotal = 0
    const { invoice } = props

    console.log('invoice', invoice)

    invoice.data.map((product) => {
        const quantity = product.quantity === 0 ? 1 : product.quantity

        const line_total = product.unit_price * quantity
        total += line_total
        sub_total += line_total
        lexieTotal += line_total

        if (product.unit_discount > 0 && invoice.discount === 0) {
            const n = parseFloat(total)
            const percentage = n * product.unit_discount / 100
            discount_total += percentage
            lexieTotal -= discount_total
        }

        if (product.unit_tax > 0 && invoice.tax === 0) {
            const tax_percentage = lexieTotal * product.unit_tax / 100
            tax_total += tax_percentage
        }
    })

    if (invoice.tax > 0) {
        const a_total = invoice.total_custom_values > 0 ? parseFloat(invoice.total_custom_values) + parseFloat(invoice.total) : parseFloat(invoice.total)
        const tax_percentage = parseFloat(a_total) * parseFloat(invoice.tax) / 100
        tax_total += tax_percentage
    }

    if (invoice.discount > 0) {
        const discount_percentage = parseFloat(invoice.total) * parseFloat(invoice.discount) / 100
        total -= discount_percentage
    }

    return {
        total: total,
        discount_total: discount_total,
        tax_total: tax_total,
        sub_total: sub_total
    }
}

export const CalculateSurcharges = (props) => {
    let total = 0
    let tax_total = 0
    const { surcharges } = props
    const tax = parseFloat(surcharges.tax)

    if (surcharges.custom_surcharge1 && surcharges.custom_surcharge1 > 0) {
        total += surcharges.custom_surcharge1
    }

    if (surcharges.custom_surcharge1 && surcharges.custom_surcharge1 > 0 && surcharges.custom_surcharge_tax1 === true && tax > 0) {
        tax_total += surcharges.custom_surcharge1 * (tax / 100)
    }

    if (surcharges.custom_surcharge2 && surcharges.custom_surcharge2 > 0) {
        total += surcharges.custom_surcharge2
    }

    if (surcharges.custom_surcharge2 && surcharges.custom_surcharge2 > 0 && surcharges.custom_surcharge_tax2 === true && tax > 0) {
        tax_total += surcharges.custom_surcharge2 * (tax / 100)
    }

    if (surcharges.custom_surcharge3 && surcharges.custom_surcharge3 > 0) {
        total += surcharges.custom_surcharge3
    }

    if (surcharges.custom_surcharge3 && surcharges.custom_surcharge3 > 0 && surcharges.custom_surcharge_tax3 === true && tax > 0) {
        tax_total += surcharges.custom_surcharge3 * (tax / 100)
    }

    if (surcharges.custom_surcharge4 && surcharges.custom_surcharge4 > 0) {
        total += surcharges.custom_surcharge4
    }

    if (surcharges.custom_surcharge4 && surcharges.custom_surcharge4 > 0 && surcharges.custom_surcharge_tax4 === true && tax > 0) {
        tax_total += surcharges.custom_surcharge4 * (tax / 100)
    }

    return { total_custom_values: total, total_custom_tax: tax_total }
}

export const CalculateLineTotals = (props) => {
    const { currentRow, settings, invoice } = props

    const price = currentRow.unit_price
    let lexieTotal = 0

    if (price < 0) {
        return false
    }

    let total = price
    const unit_discount = currentRow.unit_discount
    const unit_tax = currentRow.unit_tax
    const uses_inclusive_taxes = settings.inclusive_taxes

    const quantity = currentRow.quantity

    if (quantity > 0) {
        total = price * quantity
        lexieTotal += price * quantity
    }

    if (unit_discount > 0 && invoice.discount === 0) {
        const n = parseFloat(total)
        //
        const percentage = n * unit_discount / 100
        lexieTotal -= percentage
    }

    if (unit_tax > 0 && invoice.tax === 0) {
        const tax_percentage = lexieTotal * unit_tax / 100
        currentRow.tax_total = tax_percentage

        if (uses_inclusive_taxes === false) {
            total += tax_percentage
        }
    }

    currentRow.sub_total = total

    return currentRow
}
