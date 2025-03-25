export interface Ad {
  id: number;
  title: string;
  pictureUrl: string;
  price: number;
  link: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}
