const arr = ['08:00', '13:00'];

arr.forEach((item) => {
  const [hour, minute] = item.split(':');
  return { hour, minute };
});

const getMinHour = (arr) => {
  const [hour, minute] = arr.split(':');
  return { hour, minute };
};

getMinHour(arr[0]);
