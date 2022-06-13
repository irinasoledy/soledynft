const NewMenu = [
    {name: 'dashboard', title: 'Dashboard', href: '/crm/dashboard'},
    {name: 'manager-one', title: 'Employees', href: '/crm/employees'},
    {name: 'clients', title: 'Clients', href: '/crm/clients'},
    {name: 'notifications', title: 'Notifications', href: '/crm/notifications'},
    {name: 'cr-managers', title: 'My area', href: '/crm/my-area'},
]

NewMenu.forEach((item) => {
    if (item.items) {
        item.items.sort((x, y) => {
            let textA = x.title.toUpperCase();
            let textB = y.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    }
});

export default NewMenu;
