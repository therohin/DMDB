using DMDB.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DMDB.Controllers
{
    public class ActorController : ApiController
    {

        MoviesEntities _db = new MoviesEntities(); 
        // GET api/<controller>
        public IEnumerable<Actor> Get()
        {
            return _db.Actors.AsEnumerable();
        }

        // GET api/<controller>/5
        public Actor Get(int actorId)
        {
            Actor actor = _db.Actors.Find(actorId);
            if (actor == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
            return actor;
        }

        // POST api/<controller>
        public HttpResponseMessage Post(Actor actor)
        {
            if (ModelState.IsValid)
            {
                _db.Actors.Add(actor);
                _db.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, actor);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = actor.ActorId }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // PUT api/<controller>/5
        public HttpResponseMessage Put(int actorId, Actor actor)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            if (actorId != actor.ActorId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            _db.Entry(actor).State = EntityState.Modified;
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
        public HttpResponseMessage Delete(int actorId)
        {
            Actor actor = _db.Actors.Find(actorId);
            if (actor == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            _db.Actors.Remove(actor);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            return Request.CreateResponse(HttpStatusCode.OK,actor);
        }
        protected override void Dispose(bool disposing)
        {
            _db.Dispose();
            base.Dispose(disposing);
        }
    }
}