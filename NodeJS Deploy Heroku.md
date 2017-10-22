#1 
heroku login

#2
node -v
npm -v
git --version

#3
heroku create

#4 rename 
heroku apps:rename <newname>

#5
git push heroku master

#6
heroku ps:scale web=1

#7
heroku open
