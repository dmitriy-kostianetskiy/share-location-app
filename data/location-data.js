const dbUrl = 'https://get-location-216118.firebaseio.com/';
const locationsUrl = `${dbUrl}locations.json`;

export async function saveLocation(location, userName) {
  const response = await fetch(locationsUrl, { 
    method: 'POST',
    body: JSON.stringify({
      userName,
      location
    })
  });

  if (!response.ok) {
    throw response;
  }

  const { name } = await response.json();

  return {
    id: name,
    location,
    userName
  };
}

export async function getLocations() {
  const response = await fetch(locationsUrl);

  if (!response.ok) {
    throw response;
  }

  const locations = await response.json();

  return Object.keys(locations).map((key) => {
    return {
      ...locations[key],
      id: key
    };
  });
}
