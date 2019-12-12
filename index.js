const fs = require('fs');
const inquirer = require('inquirer');
const axios = require('axios');

inquirer.prompt([
    {
        type: 'input',
        name: 'color',
        message: 'What is your favorite color?'
    },
    {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?'
    }
])
    .then(function ({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;
        axios.get(queryUrl).then(function (results) {
            fs.writeFile("index.html",
                `<!DOCTYPE html>
                <html lang="en">
                
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                    <link rel='stylesheet' href='style.css'>
                    <title>Profile Generator</title>
                </head>
                
                <body>
                    <div class='container'>
                        <div class='top-row'>
                            <div class='col-12'>
                                <div class='main-box'>
                                    <div class='picture'>
                                        <img class='pic' src='${results.data.avatar_url}'
                                            alt='GitHub profile picture'>
                                    </div>
                                    <h2 class='name'>My username is ${results.data.login}</h2>
                                    <a class='location' href=''>${results.data.location}</a>
                                    <a class='GitHub' href='${results.data.html_url}'>GitHub</a>
                                    <a class='Blog' href='${results.data.blog}'>Blog</a>
                                </div>
                            </div>
                        </div>
                
                        <div class='row mid-row'>
                            <div>
                                <p class='bio'>${results.data.bio}</p>
                            </div>
                            <div class='col-6 first-col'>
                                <div class='rep-num'>
                                    <h4>Public Repositories</h4>
                                    <p class='repos'>${results.data.public_repos}</p>
                                </div>
                                <div class='github-stars'>
                                    <h4>GitHub Stars</h4>
                                    <p class='stars'>${results.data.public_gists}</p>
                                </div>
                
                            </div>
                            <div class='col-6 second-col'>
                                <div class='followers'>
                                    <h4>Followers</h4>
                                    <p class='followers-num'>${results.data.followers}</p>
                                </div>
                                <div class='follow'>
                                    <h4>Following</h4>
                                    <p class='following'>${results.data.following}</p>
                                </div>
                            </div>
                        </div>
                
                        <div class='bottom-row'>
                            <div class='footer'></div>
                        </div>
                    </div>
                </body>
                
                </html>`,
                function (err) {
                    if (err) {
                        throw err;
                    }
                    console.log('Success!')
                })


        })
    });