FROM python:3
ENV PYTHONUNBUFFERED 1

ARG DJANGO_SECRET_KEY
ENV DJANGO_SECRET_KEY $DJANGO_SECRET_KEY

RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/
EXPOSE 8000
RUN pip install -r requirements.txt
COPY . /backend/
RUN python manage.py makemigrations
RUN python manage.py migrate