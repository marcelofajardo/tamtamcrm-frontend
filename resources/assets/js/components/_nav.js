const modules = JSON.parse(localStorage.getItem('modules'))
const account_id = JSON.parse(localStorage.getItem('appState')).user.account_id
const user_account = JSON.parse(localStorage.getItem('appState')).accounts.filter(account => account.account_id === parseInt(account_id))
const is_admin = user_account && user_account.length && (parseInt(user_account[0].is_owner) === 1 || parseInt(user_account[0].is_admin) === 1)

const items = [
    {
        name: 'Dashboard',
        url: '/dashboard',
        icon: 'fa fa-dashboard'
    },

    {
        icon: 'fa fa-cog',
        name: 'Settings',
        children: [
            {
                name: 'Company Details',
                url: '/accounts',
                icon: 'fa fa-building'
            },
            {
                name: 'Templates and Reminders',
                url: '/template-settings',
                icon: 'fa fa-exclamation-triangle'
            },
            {
                name: 'Email Settings',
                url: '/email-settings',
                icon: 'fa fa-envelope'
            },
            {
                name: 'Online Payments',
                url: '/gateway-settings',
                icon: 'fa fa-credit-card-alt'
            },
            {
                name: 'Invoice and Quotes',
                url: '/invoice-settings',
                icon: 'fa fa-user'
            },
            {
                name: 'Products',
                url: '/product-settings',
                icon: 'fa fa-barcode'
            },
            {
                name: 'Generated Numbers',
                url: '/number-settings',
                icon: 'fa fa-list'
            },
            {
                name: 'Groups',
                url: '/group-settings',
                icon: 'fa fa-group'
            },
            {
                name: 'Tax Rates',
                url: '/tax-rates',
                icon: 'fa fa-dashboard'
            },
            {
                name: 'Field Settings',
                url: '/field-settings',
                icon: 'fa fa-dashboard'
            },
            {
                name: 'Designs',
                url: '/designs',
                icon: 'fa fa-dashboard'
            },
            {
                name: 'Integrations',
                url: '/integrations',
                icon: 'fa fa-dashboard'
            },
            {
                name: 'Modules',
                url: '/modules',
                icon: 'fa fa-dashboard'
            },
            {
                name: 'Localisation',
                url: '/localisation',
                icon: 'fa fa-dashboard'
            }
        ]
    }
]

const financial = {
    name: 'Financial',
    icon: 'fa fa-bar-chart',
    children: [
        {
            name: 'Orders',
            url: '/orders',
            icon: 'fa fa-shopping-basket'
        }
    ]
}

if (modules.invoices) {
    financial.children.push(
        {
            name: 'Invoices',
            url: '/invoice',
            icon: 'fa fa-area-chart'
        }
    )
}

if (modules.quotes) {
    financial.children.push(
        {
            name: 'Quotes',
            url: '/quotes',
            icon: 'fa fa-handshake-o'
        }
    )
}

if (modules.recurringInvoices) {
    financial.children.push(
        {
            name: 'Recurring Invoices',
            url: '/recurring-invoices',
            icon: 'fa fa-handshake-o'
        }
    )
}

if (modules.recurringQuotes) {
    financial.children.push(
        {
            name: 'Recurring Quotes',
            url: '/recurring-quotes',
            icon: 'fa fa-handshake-o'
        }
    )
}

if (modules.payments) {
    financial.children.push(
        {
            name: 'Payments',
            url: '/payments',
            icon: 'fa fa-credit-card-alt'
        }
    )
}

if (modules.expenses) {
    financial.children.push(
        {
            name: 'Expenses',
            url: '/expenses',
            icon: 'fa fa-bar-chart-o'
        }
    )
}

items.push(financial)

const tasks = {
    name: 'Tasks',
    icon: 'fa fa-chain-broken',
    children: [
    ]
}

if (modules.leads) {
    tasks.children.push({
        name: 'Leads',
        url: '/leads',
        icon: 'fa fa-chain-broken'
    })
}

if (modules.projects) {
    tasks.children.push({
        name: 'Projects',
        url: 'projects',
        icon: 'fa fa-suitcase'
    })
}

if (modules.tasks) {
    tasks.children.push({
        name: 'Tasks',
        url: 'tasks',
        icon: 'fa fa-clock-o'
    })

    tasks.children.push(
        {
            name: 'Task Statuses',
            url: '/statuses',
            icon: 'fa fa-building'
        }
    )
}

if (modules.deals) {
    tasks.children.push(
        {
            name: 'Deals',
            url: '/kanban/deals',
            icon: 'fa fa-chain-broken'
        }
    )
}

items.push(tasks)

const users = {
    name: 'User Management',
    icon: 'fa fa-dashboard',
    children: [
        {
            name: 'Employees',
            url: '/users',
            icon: 'fa fa-user'
        },

        {
            name: 'Departments',
            url: '/departments',
            icon: 'fa fa-sitemap'
        },

        {
            name: 'Roles',
            url: '/roles',
            icon: 'fa fa-chain-broken'
        },

        {
            name: 'Permissions',
            url: '/permissions',
            icon: 'fa fa-list-alt'
        }
    ]
}

if (is_admin) {
    items.push(users)
}

if (modules.companies) {
    items.push(
        {
            name: 'Companies',
            url: '/companies',
            icon: 'fa fa-building'
        }
    )
}

const products = {
    name: 'Products',
    icon: 'fa fa-barcode',
    children: [
        {
            name: 'Products',
            url: '/products',
            icon: 'fa fa-barcode'
        },

        {
            name: 'Categories',
            url: '/categories',
            icon: 'fa fa-building'
        }
    ]
}

if (modules.products) {
    items.push(products)
}

if (modules.events) {
    items.push({
        name: 'Calendar',
        url: '/calendar',
        icon: 'fa fa-chain-broken'
    })
}

items.push({
    name: 'Customers',
    url: '/customers',
    icon: 'fa fa-address-book-o'
})

items.push(
    {
        name: 'Chat',
        url: '/chat',
        icon: 'fa fa-chain-broken'
    }
)

export default {
    items: items
}
