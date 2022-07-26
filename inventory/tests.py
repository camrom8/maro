from django.conf import settings

from inventory.register import Register
from django.test import RequestFactory, TestCase
from faker import Faker
# from django.test import Client
# def test_register(mocker):
#     with self.settings(MULTUS_EMAIL=multus_email):
#         mocker.patch('RequestFactory.session', return_value={})
#         request = RequestFactory()
#         register = Register(request)
#         assert register.products_ids == []

class TestRegister(TestCase):

    def SetUp(self):
        self.req = RequestFactory().request()
        self.faker = Faker()

    def test_create_register(self):
        with self.settings(REGISTER_SESSION_ID = 'register'):
            self.req = RequestFactory().request()
            self.req.session = {}
            register = Register(self.req)
            assert register.products_ids == []
            assert register.register == register.session.get(settings.REGISTER_SESSION_ID)

    def test_adding_to_register(self):
        pass


