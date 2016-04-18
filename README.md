# tasks

I created the Single Page App using node, gulp, SaSS, angularJS and PHP/MySql.  

Tasks startup instructions:

Put tasks folder in the web directory of your apache/PhP Myadmin server 
I used MAMP and put the directory in the MAPM->htdocs folder.


The MAMP api server address is :  http://localhost:8888/tasks/api/  and the front-end is accessed by : http://localhost:8888/tasks/web/


setting up the DB:
1. Make sure your apache server and mysql are running 
2. Create a db named "task_manager" in PhpMyadmin.
3. Run the .sql script located in the root folder of tasks on the db
4. Access the web app in your favorite browser. 

The database config file located in api/config contain these variables if you need to change them for your local machine:

	private $host = "localhost"; 
	private $db_name = "task_manager"; 
	private $username = "root"; 
	private $password = "root"; 


the Api URL const used by the angular front end is located in the web/src/app/common/settings/app-settings.constant.js :

	"API_PATH": "http://localhost:8888/tasks/api/"


## Sass ##

 The main CSS sheets are bootstrap.css (used from a cdn) and starter.scss  which is located in the web/src/scss directory.  When any changes are made to this scss file gulp will auto compile the sass sheets and templates to the dist folder. 

## gulp  ##

You can also run the web side in its own gulp server if you want to make edits to the code and have gulp watch for changes and compile the templates/put them in the dist folder of the web directory, which gulp uses when running server.

The gulpp URL is:
http://localhost:8000/

You can still pull from the api which will still be running on the main apache server which should still be running. 

Gulp instructions:
1. You must have node npm installed on your machine
2. Install gulp in the local folder using npm >>  npm install -gulp
3. Type 'gulp' in command line and gulp default sequences will run. 
4. Access the web app at http://localhost:8000/

please note if you make changes to the layout templates or code on the web side you will not see the changes on the browser if you are not running gulp server to 'watch' for changes.

