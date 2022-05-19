# 2FA
 2FA - Sistemas Distribuídos - Professor Pedro Rosa - 2021/2022 - Universidade Europeia/IADE

Scenario : Use Ubuntu Virtual Machines to Load-balance NodeJS Apps

We used 3 Ubuntu(20.04 LTS) Virtual Machines in Azure, 18.04 LTS is fine to.

1. Create a VM with logical name : vm-nginx(for example), which will be hosting NGINX Web Server with static public IP.
1. Create Two more VMs with logical name : vm-nodejs1, vm-nodejs2 which will host the NodeJS App. These 2 VMs will only have a private IP, NO PUBLIC IPs.
1. All 3 VMs are in Azure within a Private VNet.
1. All 3 VMs in Azure are accessible via SSH port no : 22.

**Configuring & Installing Nginx**

Create a Virtual Machine in any Cloud (we have used Microsoft Azure).

Allow SSH Access to the VM(vm-nginx) in the cloud. We used Password based authentication to access the VM.

SSH into the VM(vm-nginx) using the applied password while creating the VM using SSH Command.

Once SSH is setup you can open the VM. We used a bastion to connect the VM there is other options, you choose.

Install Latest Version of NGINX on the VM(vm-nginx) as shown below and run below commands in the VM(vm-nginx):


1. RUN Command : sudo apt update
2. RUN Command : sudo apt install nginx
3. RUN Command : sudo systemctl status nginx
4. sudo systemctl restart nginx
5. RUN Command : nginx -v

**Install NodeJS in other 2 VMs(vm-nodejs1, vm-nodejs2).**

**SSH in the other 2 VMs (vm-nodejs1, vm-nodejs2) and run below commands in the command line.**

1. RUN Command : curl -sL https://deb.nodesource.com/setup\_12.x -o nodesource\_setup.sh.
1. RUN Command : sudo bash nodesource\_setup.sh
1. RUN Command : sudo apt install nodejs
1. RUN Command : node -v
1. RUN Command : npm -v

1.Push your Code in a Github repo.
2. Clone the nodejs sample code in both the VMs(vm-nodejs1, vm-nodejs2).
3. Run the App in the VMs (vm-nodejs1, vm-nodejs2) with command: npm start.

If some error appear while node installation, probably there is some package left to install, just run the command suggested.

Until now we have completed the setup for both nginx & nodejs.

**How to configure the nginx VM(vm-nginx) to route the request and load balance the requests among multiple VMs(vm-nodejs1, vm-nodejs2).**

It is a 3 Step process as described below.

Step 1. **Create a Node App Configuration File in NGINX**

1. Login via SSH or authentication in NGINX VM (vm-nginx).
2. Create a **nodejsapp.conf** under **/etc/nginx/conf.d** directory
3. Add the below contents in the **nodejsapp.conf file.**

*server {*

*listen 80;
server\_name **Public IP of vm-nginx**; #For example: server\_name 52.197.168.198*

***location / {**
*proxy\_http\_version 1.1;*
*proxy\_set\_header Upgrade $http\_upgrade;*
*proxy\_set\_header Connection ‘upgrade’;*
*proxy\_set\_header Host $host;*
*root /usr/share/nginx/html;*
*index index.html index.htm;*
*try\_files $uri $uri/ /index.html =404;*
}*

***location /api {**
*proxy\_http\_version 1.1;
*proxy\_set\_header Upgrade $http\_upgrade;
*proxy\_set\_header Connection ‘upgrade’;
*proxy\_set\_header X-Forwarded-For $remote\_addr;
*proxy\_set\_header Host $http\_host;
**proxy\_pass*** http://nodeservers***;**
}
}*

location / it’s the default configuration for the web page of nginx, if there is a problem in showing your web app in browser just delete it.

**Explanation of above NGINX code block**

1. All Apps will be having 1 server block which starts with : ***server { }***
2. Each server block will listen to a port no : **listen 80**
3. Each server block can have 1 or multiple ***location*** blocks which starts with : **location <route> { }**
4. In our case we have 2 location routes.
5. Root Location : ‘location /’ — If a user hits this route in the browser it will show the default nginx home page as shown below.
6. location /api : This location routes any api request to nodejs proxy server. In our case these 2 proxy servers are (vm-nodejs1, vm-nodejs2). It is defined by this line : **proxy\_pass** http://nodeservers** 

Step 2 : **Modify the existing nginx.conf file** **in nginx**

1. Once NGINX is installed, it will have a default **nginx.conf** file
2. You are already inside nginx VM (vm-nginx).
3. Edit the existing nginx.conf -> **sudo vi /etc/nginx/nginx.conf** file
4. Add the following lines in **nginx.conf** file & save it.

*upstream nodeservers {*

*server 10.0.0.5:3000; #Replace 10.0.0.5 with the private ip of vm-nodejs1 and your port(you can find it in bin/www)*

*server 10.0.0.6:3000; # Replace 10.0.0.6 with the private ip of vm-nodejs2 and your port(you can find it in bin/www)
}*

Step 3:

1. Restart NGINX Service in NGINX VM (vm-nginx) using below command
2. systemctl restart nginx
3. NGINX should restart successfully.

Note : If there is any error in 2 files(**nodejsapp.conf & nginx.conf**) as described in step 1 & step2, NGINX service in the VM will not start. RUN this command : systemctl status nginx to check the error, if any.

Now its time to run!

1. Get the Public IP of NGINX VM (vm-nginx)
2. Hit the url **http://<PUBLIC-IP>/api**. For example: **52.161.176.198/api**
3. As shown below the request is served by one of the VM.
4. Note : Both the NodeJS Application VMs are not exposed to public.
5. Bring one of the NodeJS VMs down or stop the node app, the request will be routed to the available VM.

**Https configuration**

In the VM(vm-nginx) run the follow commands:
1. cd /etc/nginx/conf.d
2. sudo cp nodejsapp.conf nodejsapp.conf.bak
3. sudo mkdir /etc/nginx/ssl
4. sudo chmod 700 /etc/nginx/ssl
5. sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/example.key -out /etc/nginx/ssl/example.crt
6. sudo nano nodejsapp.conf

Inside server add: return 301 https//:$server\_name$request\_uri;

Create another server to accept 443 traffic and add the following lines:

1. listen 443 ssl;
2. server\_name nodejsapp.conf;
3. ssl\_certificate /etc/nginx/ssl/example.crt;
4. ssl\_certificate_key /etc/nginx/ssl/example.key;
5. save $ exit
6. sudo nginx -t to check if there is any compiling error;
7. sudo nginx -s reload



