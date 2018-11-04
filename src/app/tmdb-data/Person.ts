export interface PersonQuery {
  language?: string; // default "en-US"
}

export interface PersonResponse {
  birthday?: string;
  known_for_department?: string;
  deathday?: string;
  id?: number;
  name?: string;
  also_known_as?: string[];
  gender?: number; // 0, 1, 2, default 0
  biography?: string;
  popularity?: number;
  place_of_birth?: string;
  profile_path?: string;
  adult?: boolean;
  imdb_id?: string;
  homepage?: string;
}

export interface PersonProfiles {
  aspect_ratio?: number;
  file_path?: string;
  height?: number;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface PersonImageResponse {
  id?: number;
  profiles?: PersonProfiles[];
}



export interface PersonCreditQuery {
  language?: string; // default "en-US"
}

export interface PersonCast {
  character?: string;
  credit_id?: string;
  release_date?: string;
  vote_count?: number;
  video?: boolean;
  adult?: boolean;
  vote_average?: number;
  title?: string;
  genre_ids?: number[];
  original_language?: string;
  original_title?: string;
  popularity?: number;
  id?: number;
  backdrop_path?: string;
  overview?: string;
  poster_path?: string;
}

export interface PersonCreditResponse {
  cast?: PersonCast[];
  id?: number;
}
