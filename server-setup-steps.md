
## Create a group
sudo groupadd --system ironman-webapp

## Create a User and add it to group
sudo useradd --system --gid ironman-webapp --shell /bin/bash --home /webapps/ironman_common jarvis

## Create a directory
sudo mkdir -p /webapps/ironman_common/

## Provide access
sudo chown jarvis /webapps/ironman_common/

## Switch to the directory with user created
sudo su - jarvis
cd /webapps/ironman_common

## Pull the code  
git remote add origin https://Shoaib9942@bitbucket.org/teamnutrabay/ironman_common.git
git init
git remote add origin https://Shoaib9942@bitbucket.org/teamnutrabay/ironman_common.git
git pull origin master

## Switch back to root and create a password for your user
sudo su
sudo passwd jarvis
Super@Jarvis0648

## Install remaining dependencies
sudo su - jarvis
pip3 install wheel
pip3 install uwsgi
uwsgi-2.0.19.1  (version of uwsgi we used)
uwsgi --http :8000 --home /webapps/ironman_common/env --chdir /webapps/ironman_common -w ironman_common.config.wsgi

## setup uswgi configuration
mkdir conf
cd conf
nano uwsgi.ini
copy the content from https://www.freecodecamp.org/news/django-uwsgi-nginx-postgresql-setup-on-aws-ec2-ubuntu16-04-with-python-3-6-6c58698ae9d3/
pwd -> /conf, user -> jarvis
cd ..
pwd -> /    , user -> jarvis
mkdir log
mkdir run
touch log/uwsgi.log
sudo chmod 777 /webapps/ironman_common/run  
sudo chmod 777 /webapps/ironman_common/log  
uwsgi --ini /webapps/ironman_common/conf/uwsgi.ini


## Run uswgi as a deamon
sudo nano /etc/systemd/system/uwsgi.service
copy the content from https://www.freecodecamp.org/news/django-uwsgi-nginx-postgresql-setup-on-aws-ec2-ubuntu16-04-with-python-3-6-6c58698ae9d3/
sudo systemctl daemon-reload
sudo systemctl enable uwsgi
sudo service uwsgi start
sudo service uwsgi restart
sudo service uwsgi status


## Setup nginx
sudo apt-get install nginx
sudo nano /etc/nginx/sites-available/nginx-uwsgi.conf
Copy the content from https://www.freecodecamp.org/news/django-uwsgi-nginx-postgresql-setup-on-aws-ec2-ubuntu16-04-with-python-3-6-6c58698ae9d3/
sudo ln -s /etc/nginx/sites-available/nginx-uwsgi.conf /etc/nginx/sites-enabled/nginx-uwsgi.conf
sudo systemctl daemon-reload
sudo systemctl enable nginx
sudo service nginx start
sudo nginx -t
sudo service nginx restart
sudo service nginx status


## setup airflow (in local)
pip install apache-airflow
airflow db init
airflow users create --role Admin --username shoaib --email ms.shoaib@nutrabay.com --firstname mohammed --lastname shoaib --password Super@Jarvis0648
airflow users create --role Admin --username rishabh --email rishabh.shoaib@nutrabay.com --firstname a --lastname rishabh --password Super@Jarvis0648
airflow webserver
airflow scheduler



## setup airflow (on ec2 server)
sudo su - jarvis
pip3 install apache-airflow
mkdir /tmp/airflow-daemon
cd /tmp/airflow-daemon
wget https://raw.githubusercontent.com/apache/airflow/master/scripts/systemd/airflow
wget https://raw.githubusercontent.com/apache/airflow/master/scripts/systemd/airflow-scheduler.service
wget https://raw.githubusercontent.com/apache/airflow/master/scripts/systemd/airflow-webserver.service
wget https://raw.githubusercontent.com/apache/airflow/master/scripts/systemd/airflow.conf
exit (Switch back to ubuntu)
cd /usr/lib/systemd/
sudo mkdir system
cd /etc
sudo mkdir sysconfig
sudo cp *.service /usr/lib/systemd/system/
sudo cp airflow.conf /usr/lib/tmpfiles.d/
sudo cp airflow /etc/sysconfig/
sudo mkdir /run/airflow
pwd -> /run/airflow, user -> ubuntu
cd ..
pwd -> /run, user -> ubuntu
sudo chmod 777 airflow
sudo mkdir /opt/airflow
pwd -> /opt/airflow, user -> ubuntu
cd ..
pwd -> /opt, user -> ubuntu
sudo chmod 777 airflow
sudo su - jarvis
export AIRFLOW_HOME=/opt/airflow
exit (Switch back to ubuntu)
which airflow (/webapps/ironman_common/airflow-env/bin/)
sudo nano /usr/lib/systemd/system/airflow-scheduler.service
sudo nano /usr/lib/systemd/system/airflow-webserver.service
sudo nano /etc/sysconfig/airflow
sudo systemctl daemon-reload
sudo systemctl enable airflow-scheduler
sudo systemctl enable airflow-webserver
sudo systemctl start airflow-scheduler
sudo systemctl start airflow-webserver
sudo systemctl restart airflow-scheduler
sudo systemctl restart airflow-webserver


# change the configuration file (/etc/sysconfig/airflow)
dags path and database path

# To see the logs
journalctl -u airflow-scheduler -n 50
journalctl -u airflow-webserver -n 50


# configuration paths
EnvironmentFile=/etc/sysconfig/airflow
Environment=VIRTUAL_ENV=/webapps/ironman_common/airflow-env
Environment="PATH=/webapps/ironman_common/airflow-env/bin/:/webapps/ironman_common/airflow-env/bin/python3:$PATH"
Environment=PATH=/webapps/ironman_common/airflow-env/bin:$PATH:/usr/local/bin:/bin:/usr/bin:/usr/local/sbin:/usr/sbin
PATH="/webapps/ironman_common/airflow-env/bin/:$PATH"
PYTHONPATH="/webapps/ironman_common/airflow-env/bin/python3:$PYTHONPATH"
/webapps/ironman_common/airflow-env/bin/python3


# Create a user
airflow users create \
    --email ms.shoaib@nutrabay.com --firstname shoaib \
    --lastname shoaib --password Super@Jarvis0648 \
    --role Admin -username shoaib123
