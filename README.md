# The International FemHack II 

## ABOUT OUR CODE (AND US)
Hi! we are Deimantė Stankūnaitė, Nur Ahissami and Sofía Gracia. We worked very hard in this code, hope you enjoy it!
### the choices we make, the path we walk:
We decided to use React, as 2 of us already know it, typescript, in order to have a most strong code, and Sass, to help us nesting the styles.
In the visual aspects, our colour palette is mostly blue and purple, with a light theme, we think is a good combination to present data but keep the visual style a bit funny. We chose "Dosis" as font, because is quite clear and readable.
As composition, we think that keep the animated chart in the most important position, is the best option. Because is the most impressive and global data, and makes the web more dynamic.
To create the charts we use Rechart library for React, we find that simple to use and very intuitive.


## HOW TO RUN BACKEND AND FRONTEND

### Setup backend

The **Backend** can be setup in two different ways.
For both methods the following commands must be run on the commandline

```bash
# First, clone the repository
# It can also be directly downloaded from the GitHub website.
git clone https://github.com/nuwe-reports/femhack-II-frontend

# Then, change directory into the cloned repository
cd femhack-II-frontend/
```

##### Method 1: Docker

This method builds and runs a **Docker** container exposing the backend server on port `8080`.

**Prerequisites**
- `docker` installed. To install docker follow the [guide](https://docs.docker.com/engine/install/) for your Operating System.
> *Tip*: To make sure you have docker installed run `sudo docker run hello-world`. If it shows a *Hello from Docker!* message it has been installed correctly.


**Setup**

To setup the development environment with docker follow the next commands:
```bash
# MUST BE inside the femhack-II-frontend/ repository!!!
# Building the container
docker build . -t fh-backend

# Running the container detached
docker run -p8080:8080 -d fh-backend 
```

##### Method 2: Python3

This methods uses `Python3` directly to run the backend server application.

**Prerequisites**
- `python3` installed.
- `pip` installed.

It is **recommended** to install everything in a python virtual environment. For that, install `virtualenv`

**Setup**

To setup the development environment with python3 follow the next commands:
```bash
# MUST BE inside the femhack-II-frontend/
# Enter the `backend/` directory
cd backend/

# [OPTIONAL] Use a virtualenv
mkdir backend_env/ # Create directory
virtualenv backend_env/ # Set directory as virtual environment
source backend_env/bin/activate # Activate virtual environment
# --------------

# 1. Install the python packages
pip install -r requirements.txt

# 2. Run the server
uvicorn main:app --port 8080 --reload # On port 8080!
```

##### Is it working?
To check if the backend server is up and running go your web browser (Chrome, Firefox, etc) and go to 
`http://localhost:8080/docs` if you see an endpoint documentation you are good to go! :tada:


### Endpoints Guide

There are 5 endpoints available plus the documentation endpoint:

| Method | URL | Description |
| ----- | --------| ------ |
| `GET` | `/docs` | Swagger documentation. Here you can find ALL the endpoints documentation and test it.|
| `GET` | `/countries` | Returns a list with all the countries |
| `GET` | `/country/{country_name}` | Returns data from the **country_name** passed divided by year. |
| `GET` | `/country/{country_name}/year/{year}` | Returns data from the **country_name** of the specificied **year**. |
| `GET` | `/year/{year}` | Returns data from all countries in the specificed **year**. |
| `GET` | `/internet-users/{year}` | Returns total amount of Internet Users in the world in the specified **year**. |

### Setup frontend
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
