FROM python:3
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
RUN python manage.py makemigrations
RUN python manage.py migrate