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
    public class ProducerController : ApiController
    {

        MoviesEntities _db = new MoviesEntities(); 
        // GET api/<controller>
        public IEnumerable<Producer> Get()
        {
            return _db.Producers.AsEnumerable();
        }

        // GET api/<controller>/5
        public Producer Get(int producerId)
        {
            Producer producer = _db.Producers.Find(producerId);
            if (producer == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
            return producer;
        }

        // POST api/<controller>
        public HttpResponseMessage Post(Producer producer)
        {
            if (ModelState.IsValid)
            {
                _db.Producers.Add(producer);
                _db.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, producer);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = producer.ProducerId }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // PUT api/<controller>/5
        public HttpResponseMessage Put(int producerId, Producer producer)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            if (producerId != producer.ProducerId)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            _db.Entry(producer).State = EntityState.Modified;
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
        public HttpResponseMessage Delete(int producerId)
        {
            Producer producer = _db.Producers.Find(producerId);
            if (producer == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            _db.Producers.Remove(producer);
            try
            {
                _db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            return Request.CreateResponse(HttpStatusCode.OK,producer);
        }
        protected override void Dispose(bool disposing)
        {
            _db.Dispose();
            base.Dispose(disposing);
        }
    }
}