using DMDB.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DMDB.Controllers
{
    public class MovieController : ApiController
    {

        MoviesEntities _db = new MoviesEntities(); 
        // GET api/<controller>
        public IEnumerable<Movie> Get()
        {
            return _db.Movies.AsEnumerable();
        }

        // GET api/<controller>/5
        public Movie Get(int movieId)
        {
            Movie movie = _db.Movies.Find(movieId);
            if (movie == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
            return movie;
        }

        // POST api/<controller>
        public HttpResponseMessage Post(Movie movie)
        {
            if (ModelState.IsValid)
            {
                _db.Movies.Add(movie);
                _db.Entry(movie.Producer).State = EntityState.Unchanged;
                foreach (var actor in movie.Actors)
                {
                        _db.Entry(actor).State = EntityState.Unchanged;
                }
                _db.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, movie);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { movieId = movie.MovieId }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // PUT api/<controller>/5
        public HttpResponseMessage Put(int movieId, Movie movie)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            if (movieId != movie.MovieId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            _db.Entry(movie).State = EntityState.Modified;
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
            
        }

        // DELETE api/<controller>/5
        public HttpResponseMessage Delete(int movieId)
        {
            Movie movie = _db.Movies.Find(movieId);
            if (movie == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            _db.Movies.Remove(movie);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            return Request.CreateResponse(HttpStatusCode.OK,movie);
        }
        protected override void Dispose(bool disposing)
        {
            _db.Dispose();
            base.Dispose(disposing);
        }
    }
}