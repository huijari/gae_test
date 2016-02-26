# coding: utf-8
"""Provides implementation of Position model"""

from google.appengine.ext import ndb
import model

class Position(model.Base):
    id = ndb.StringProperty(default='')
    created_at = ndb.StringProperty(default='')
    title = ndb.StringProperty(default='')
    location = ndb.StringProperty(default='')
    type = ndb.StringProperty(default='')
    description = ndb.TextProperty(default='')
    how_to_apply = ndb.TextProperty(default='')
    company = ndb.StringProperty(default='')
    company_url = ndb.StringProperty(default='')
    company_logo = ndb.StringProperty(default='')
    url = ndb.StringProperty(default='')
    
    PUBLIC_PROPERTIES = [
        "id",
        "created_at",
        "title",
        "location",
        "type",
        "description",
        "how_to_apply",
        "company",
        "company_url",
        "company_logo",
        "url"
    ]
    
    def to_json(self):
        return self.to_dict(include=Position.get_public_properties())