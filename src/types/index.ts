export interface User {
  gender: string;
  email: string;
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
  location: {
    city: string;
    country: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
  };
}
