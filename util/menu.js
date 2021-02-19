const Menu = [
  {header: 'Apps'},
  {
    title: 'Control Panel',
    group: 'apps',
    icon: 'dashboard',
    name: 'Dashboard',
    href: '/dashboard'
  },
  {
    title: 'Product Categories',
    group: 'apps',
    icon: 'list',
    target: 'blank',
    name: 'Categories',
    href: '/categories'
  },
  {
    title: 'Google API',
    group: 'googleApi',
    name: 'Google API',
    target: 'blank',
    icon: 'multiline_chart',
    items: [
      {name: 'sheets', title: 'Google Sheets', href: '/google-api/sheets'},
      {name: 'content', title: 'API Content', badge: 'new', href: '/google-api/content'},
      {name: 'ads', title: 'Google Ads', href: '/google-api/ads'},
    ]
  },
  {
    title: 'VCRM',
    group: 'vcrm',
    name: 'VCRM',
    icon: 'supervised_user_circle',
    items: [
      {name: 'dashboard', title: 'Dashboard', href: '/vcrm/dashboard'},
      {name: 'cr-managers', title: 'CR Managers', href: '/vcrm/cr-managers'},
      {name: 'ads', title: 'Google Ads', href: '/google-api/ads'},
    ]
  },
  {
    title: 'Widgets',
    group: 'widgets',
    component: 'widgets',
    icon: 'widgets',
    items: [
      {name: 'social', title: 'Social', href: '/widgets/social'},
      {name: 'statistic', title: 'Statistic', badge: 'new', href: '/widgets/statistic'},
      {name: 'chart', title: 'Chart', href: '/widgets/chart'},
      {name: 'list', title: 'List', href: '/widgets/list'},
    ]
  },
  {header: 'UI Elements'},
  {
    title: 'General',
    group: 'components',
    component: 'components',
    icon: 'tune',
    items: [
      {name: 'alerts', title: 'Alerts', href: '/general/alerts'},
      {name: 'avatars', title: 'Avatars', href: '/general/avatars'},
      {name: 'badges', title: 'Badges', href: '/general/badges'},
      {name: 'buttons', title: 'Buttons', href: '/general/buttons'},
      {name: 'cards', title: 'Cards', href: '/general/cards'},
      {name: 'carousels', title: 'Carousels', href: '/general/carousels'},
      {name: 'chips', title: 'Chips', href: '/general/chips'},
      {name: 'dialogs', title: 'Dialogs', href: '/general/dialogs'},
      {name: 'icons', title: 'Icons', href: '/general/icons'},
      {name: 'tables', title: 'Data Tables', href: '/general/tables'},
      {name: 'parallax', title: 'Parallax  image', href: '/general/parallax'},
      {name: 'snackbar', title: 'Snackbar', href: '/general/snackbar'},
      {name: 'progress', title: 'Progress', href: '/general/progress'},
      {name: 'slider', title: 'Slider', href: '/general/sliders'},
      {name: 'tooltip', title: 'Tooltip', href: '/general/tooltips'},
      {name: 'pagination', title: 'Pagination', href: '/general/pagination'},
      {name: 'typography', title: 'Typography', href: '/general/typography'},
      {name: 'color', title: 'Color', href: '/general/colors'},

    ]
  },
  {
    title: 'Pickers',
    group: 'pickers',
    component: 'picker',
    icon: 'filter_vintage',
    items: [
      {name: 'timepicker', title: 'Timepicker', href: '/pickers/timepicker'},
      {name: 'datepicker', title: 'Datepicker', href: '/pickers/datepicker'},

    ]
  },
  {
    title: 'Layout',
    group: 'layout',
    component: 'layout',
    icon: 'view_compact',
    items: [
      {name: 'bottom-sheets', title: 'Bottom panels', component: 'components/bottom-sheets'},
      {name: 'expansion-panels', title: 'Expansion panels', component: 'components/expansion-panels'},
      {name: 'footer', title: 'Footer', component: 'components/footer'},
      {name: 'lists', title: 'Lists', component: 'components/lists'},
      {name: 'jumbotrons', title: 'Jumbotrons', badge: 'new', component: 'components/jumbotrons'},
      {name: 'menus', title: 'Menus', component: 'components/menus'},
      {name: 'tabs', title: 'Tabs', component: 'components/tabs'},
      {name: 'toolbar', title: 'Toolbars', component: 'components/toolbar'},
      {name: 'timeline', title: 'Timeline', component: 'components/timeline'},
    ]
  },
  {
    title: 'Forms & Controls',
    group: 'forms',
    component: 'forms',
    icon: 'edit',
    items: [
      {name: 'basic', title: 'General', href: '/forms/basic-forms'},
      {name: 'selects', title: 'Selects', badge: 'new', href: '/forms/selects'},
      {name: 'selection-controls', title: 'Selection Controls', href: '/forms/selection-controls'},
      {name: 'text-fields', title: 'Text Fields', href: '/forms/text-fields'},
      {name: 'steppers', title: 'Steppers', href: '/forms/steppers'},
      {name: 'editors', title: 'Editors', href: '/forms/editors'},
    ]
  },
  {divider: true},
  {header: 'Extras'},
  {
    title: 'Login',
    group: 'extra',
    icon: 'list',
    href: '/login'
  },
  {
    title: 'Empty',
    group: 'extra',
    icon: 'insert_drive_file',
    href: '/empty'
  },
];

const NewMenu = [
      {name: 'dashboard', title: 'Dashboard', href: '/back/dashboard'},
      {name: 'manager-one', title: 'Employees', href: '/back/employees'},
      {name: 'cr-managers', title: 'My area', href: '/back/my-area'},
      // {name: 'stats', title: 'Stats and Reports', href: '/stats'},
]
// reorder menu
Menu.forEach((item) => {
  if (item.items) {
    item.items.sort((x, y) => {
      let textA = x.title.toUpperCase();
      let textB = y.title.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
  }
});

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
