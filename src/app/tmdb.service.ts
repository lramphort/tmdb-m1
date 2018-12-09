import { Injectable } from '@angular/core';
import {MovieCreditsResponse, MovieGenre, MovieGenresResponse, MovieQuery, MovieResponse} from './tmdb-data/Movie';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {PersonCreditResponse, PersonImageResponse, PersonQuery, PersonResponse} from './tmdb-data/Person';
import {SearchMovieQuery, SearchMovieResponse} from './tmdb-data/searchMovie';
import {SearchPeopleQuery, SearchPeopleResponse} from './tmdb-data/SearchPeople';
import {TVQuery, TVResponse} from './tmdb-data/TV';
import {SearchTVQuery, SearchTVResponse} from './tmdb-data/SearchTV';

const tmdbApi = 'https://api.themoviedb.org/3';
type HTTP_METHOD = 'GET' | 'POST' | 'DELETE' | 'PUT';

function AlxToObjectString(data: Object): {[key: string]: string} {
  const res = {};
  for (const k in data) {
    const v = data[k];
    res[k] = typeof v === 'string' ? v : JSON.stringify(v);
  }
  return res;
}

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private api_key: string;

  public genres: MovieGenre[];

  private async get<T>(url: string, data: Object): Promise<HttpResponse<T>> {
    return this._http.get<T>( url, {
      observe: 'response',
      params: {...AlxToObjectString(data), api_key: this.api_key}
    }).toPromise();
  }

  constructor(private _http: HttpClient) { }

  init(key: string): this {
    this.api_key = key;
    return this;
  }

  // _______________________________________________________________________________________________________________________________________
  // Movies ________________________________________________________________________________________________________________________________
  // _______________________________________________________________________________________________________________________________________
  async getMovie(id: number, options?: MovieQuery): Promise<MovieResponse> {
    const url = `${tmdbApi}/movie/${id}`;
    const res = await this.get<MovieResponse>(url, options);
    return res.body;
  }
    // https://api.themoviedb.org/3/genre/movie/list?api_key=25ea93320b0ede2eb2ce7b2661886a0e&language=fr-FR

  async getLatestMovie(options?: MovieQuery): Promise<MovieResponse> {
    const url = `${tmdbApi}/movie/latest`;
    const res = await this.get<MovieResponse>(url, options);
    return res.body;
  }

  async searchMovie(query: SearchMovieQuery, category?: string): Promise<SearchMovieResponse> {
    console.log(query, "  --------     " + category)
    const url = `${tmdbApi}/search/movie`;
    const res = await this.get<SearchMovieResponse>(url, query);

    if (category) {
      const url2 = `${tmdbApi}/discover/movie`;
      const res2 = await this.get<SearchMovieResponse>(url2, "with_genres=" + category);

      console.log('RES 2', res2.body);
      return res2.body;
    }
    return res.body;
    //    return res.body.results.filter(res => res.genre_ids.);  
  }

  async getMovieCredit(id: number): Promise<MovieCreditsResponse> {
    const url = `${tmdbApi}/movie/${id}/credits`;
    const res = await this.get<MovieCreditsResponse>(url, null);
    return res.body;
  }

  async getMovieGenres(): Promise<MovieGenresResponse> {
    const url = `${tmdbApi}/genre/movie/list`;
    const res = await this.get<MovieGenresResponse>(url, {language: "fr-FR"});
    return res.body;
  }

  // _______________________________________________________________________________________________________________________________________
  // Person / People _______________________________________________________________________________________________________________________
  // _______________________________________________________________________________________________________________________________________
  async getPerson(id: number, options?: PersonQuery): Promise<PersonResponse> {
    const url = `${tmdbApi}/person/${id}`;
    const res = await this.get<PersonResponse>(url, options);
    return res.body;
  }

  async getPopularPersons(options?: PersonQuery): Promise<any> {
    const url = `${tmdbApi}/person/popular`;
    const res = await this.get<any>(url, options);
    return res.body;
  }

  async searchPerson(query: SearchPeopleQuery): Promise<SearchPeopleResponse> {
    const url = `${tmdbApi}/search/person`;
    const res = await this.get<SearchPeopleResponse>(url, query);
    return res.body;
  }

  async getPersonImages(id: number): Promise<PersonImageResponse> {
    const url = `${tmdbApi}/person/${id}/images`;
    const res = await this.get<PersonImageResponse>(url, null);
    return res.body;
  }

  async getPersonCredit(id: number, options?: PersonQuery): Promise<PersonCreditResponse> {
    const url = `${tmdbApi}/person/${id}/movie_credits`;
    const res = await this.get<PersonCreditResponse>(url, options);
    return res.body;
  }

  // _______________________________________________________________________________________________________________________________________
  // TV ____________________________________________________________________________________________________________________________________
  // _______________________________________________________________________________________________________________________________________
  async getTV(id: number, options?: TVQuery): Promise<TVResponse> {
    const url = `${tmdbApi}/tv/${id}`;
    const res = await this.get<TVResponse>(url, options);
    return res.body;
  }

  async searchTV(query: SearchTVQuery): Promise<SearchTVResponse> {
    const url = `${tmdbApi}/search/tv`;
    const res = await this.get<SearchTVResponse>(url, query);
    return res.body;
  }

}
