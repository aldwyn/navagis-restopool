export class Restaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  url: string;
  rating: number;
  thumbnailUrl: string;
  longitude: number;
  latitude: number;
  reviewsCount: number;
  knownFor: string;
  creator: string;
  cuisines: string[];
  menuUrls: string[];
  type: string;

  static parseList(obj: any) : Restaurant[] {
    return obj.map((item) => {
      return {
        id: parseInt(item.id),
        name: item.name,
        description: item.description,
        address: item.address,
        url: item.url,
        rating: (item.rating.trim() != '-') ? parseFloat(item.rating) : null,
        thumbnailUrl: item.thumbnail,
        longitude: parseFloat(item.longitude),
        latitude: parseFloat(item.latitude),
        reviewsCount: parseInt(item.reviews_count),
        knownFor: item.known_for,
        creator: item.creator,
        cuisines: item.cuisines,
        menuUrls: item.menu_urls,
        type: item.type,
      }
    });
  }
}
