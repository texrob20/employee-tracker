const express = require('express');
const inquirer = require('inquirer');

inquirer.prompt ([{
  type: 'list',
  message: "Please select which you would like to do.",
  choices: ['', ''],
  name: 'choice'
}])
.then((answers) => {

})
.catch((error) => {
    
})