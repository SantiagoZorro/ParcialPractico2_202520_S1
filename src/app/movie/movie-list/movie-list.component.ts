import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../Movie';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  loading = false;
  error = '';

  constructor(private movieSrv: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.loading = true;
    this.error = '';
    this.movieSrv.getMovies().subscribe({
      next: (data) => { this.movies = data ?? []; this.loading = false; },
      error: () => { this.error = 'No se pudo cargar el listado.'; this.loading = false; }
    });
  }

  irADetalle(id: number): void {
    this.router.navigate(['/movies', id]);
  }
}
