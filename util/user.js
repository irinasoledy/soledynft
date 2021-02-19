const Items =  [
  {
    'uuid': '65a6eb21-67b5-45c3-9af7-faca2d9b60d4',
    'name': 'Dessie',
    'rol': 'Relatii Clienti',
    'func': 'CRManager',
    'email': 'Dessie7937@gmail.com',
    'username': 'Dessie79',
    'jobTitle': 'Web Developer',
    'phone': '1-360-812-9380 x511',
    'avatar': require('@/static/avatar/a2.jpg'),
    'start': '10:30',
    'end': '13:45',
    'address': {
      'street': '655 Archibald Groves',
      'suite': 'Apt. 818',
      'city': 'Carlosshire',
      'state': 'Arkansas',
      'country': 'Somalia',
      'zipcode': '10406',
      'geo': {
        'lat': '-44.6063',
        'lng': '-169.7706'
      }
    }
  },
  {
    'uuid': '28d9f265-74d7-4f85-83d4-6a21fca57dcf',
    'name': 'Jakayla',
    'jobTitle': 'Web Designer',
    'rol': 'Relatii Clienti',
    'func': 'CRManager',
    'email': 'Jakayla_Crooks867@yahoo.com',
    'username': 'Jakayla_Crooks86',
    'phone': '610.499.1240',
    'avatar': require('@/static/avatar/a3.jpg'),
    'start': '10:30',
    'end': '13:45',
    'address': {
      'street': '281 Tillman Forge',
      'suite': 'Apt. 381',
      'city': 'New Sandrinemouth',
      'state': 'North Dakota',
      'country': 'Reunion',
      'zipcode': '19540-8186',
      'geo': {
        'lat': '-12.3375',
        'lng': '-117.9067'
      }
    }
  },
  {
    'uuid': '14ddae1e-986d-42f4-8d17-46a02d469b2b',
    'name': 'Hobart',
    'jobTitle': 'Sales',
    'rol': 'Relatii Clienti',
    'func': 'CRManager',
    'email': 'Hobart_Mueller.Thiel@hotmail.com',
    'username': 'Hobart_Mueller',
    'phone': '1-590-385-3349',
    'avatar': require('@/static/avatar/a1.jpg'),
    'start': '10:30',
    'end': '13:45',
    'address': {
      'street': '706 Padberg Knoll',
      'suite': 'Suite 818',
      'city': 'Port Mablefurt',
      'state': 'Arkansas',
      'country': 'Netherlands Antilles',
      'zipcode': '89975-6584',
      'geo': {
        'lat': '-42.9187',
        'lng': '8.5866'
      }
    }
  },
  {
    'uuid': '6a03248b-1752-4332-a3a9-7108528cc9d3',
    'name': 'Celestine',
    'jobTitle': 'Marketing',
    'rol': 'Relatii Clienti',
    'func': 'CRManager',
    'email': 'Celestine.Casper59@hotmail.com',
    'username': 'Celestine.Casper',
    'phone': '1-830-046-3289',
    'avatar': require('@/static/avatar/a4.jpg'),
    'address': {
      'street': '9528 Schroeder Track',
      'suite': 'Apt. 443',
      'city': 'Godfreyburgh',
      'state': 'Montana',
      'country': 'Slovenia',
      'zipcode': '10220',
      'geo': {
        'lat': '36.8638',
        'lng': '20.0047'
      }
    }
  },

];

const getUserById = (uuid) => {
  return (uuid === undefined) ? Items[0] : Items.find(x => x.uuid === uuid);
};

const getUser = (limit) => {
  return (limit) ? Items.slice(0, limit) : Items;
};

export {
  Items,
  getUser,
  getUserById
};
