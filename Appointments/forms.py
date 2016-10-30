from django import forms
from models import users

class RegestrationForm (forms.form):
    username = forms.RegexField(r'^\w+$', widget=forms.TextInput(attrs=dict(required=True, max_length=30)), label=)