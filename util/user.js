const Items =  [];

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
