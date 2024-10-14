from email.policy import default

from odoo import models, fields, api
from odoo.exceptions import UserError, ValidationError

from odoo.odoo.fields import Datetime


# noinspection PyTypeChecker
class PropertyHistory(models.Model):
    _name = "property.history"
    _description = "Property History"
    _inherit = ['mail.thread', 'mail.activity.mixin']

    user_id = fields.Many2one('res.users')
    property_id = fields.Many2one('property')
    date = fields.Datetime(default=fields.Datetime.now())
    old_state = fields.Char()
    new_state = fields.Char()