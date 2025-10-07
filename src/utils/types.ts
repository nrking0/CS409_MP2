export type ArtApiResponse = {
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    next_url: string;
    prev_url: string;
  };
  data: Artwork[];
};

export type Artwork = {
  id: number;
  api_model: string;
  api_link: string;
  title: string;
  alt_titles: string[] | null;
  thumbnail: string | null;
  main_reference_number: string;
  date_start: number;
  date_end: number;
  date_display: string;
  artist_display: string;
  place_of_origin: string;
  description: string | null;
  short_description: string | null;
  dimensions: string;
  image_id: string | null;
  category_titles: string[] | null;
};