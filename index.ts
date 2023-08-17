#!/usr/bin/env node

import figlet from 'figlet';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { getItemsList, Items } from './items';

figlet('Nilget', function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);
  askQuestions();
});

function askQuestions() {
  const questions = [
    {
      type: 'list',
      name: 'target',
      message: 'What do you want, and I will get for you ?',
      choices: getItemsList(),
      filter(val) {
        return val.toLowerCase();
      },
    },
    {
      type: 'input',
      name: 'project_name',
      message: 'This is your project name ?',
      default(answer) {
        return answer.target;
      },
      validate(val) {
        // 檢查當前檔案是否已經存在
        const exist = existsSync(val);
        if (exist) {
          return `Project ${val} already exists. Please enter a new name.`;
        }
        return true;
      },
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    console.log('\nOK, you choose :');
    console.log(JSON.stringify(answers, null, '  '));
    gitCloneTemplate(answers.target, answers.project_name);
  });
}

function gitCloneTemplate(target, project_name) {
  console.log('git clone template...');

  if (!target || !project_name) {
    console.error('Something went wrong...');
    process.exit(1);
  }

  const cmd = Items[target](project_name);
  execSync(cmd, { stdio: 'inherit' });
}
