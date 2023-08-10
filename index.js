#!/usr/bin/env node

// @ts-check
import figlet from 'figlet';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
import { existsSync, fstatSync } from 'fs';

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
      choices: ['ts-example'],
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

  const repoUrl = 'https://github.com/nilswg/nilget.git';

  if (!target || !project_name) {
    console.error('Something went wrong...');
    process.exit(1);
  }

  execSync(`git clone ${repoUrl} -b ${target} ${project_name}`, {
    stdio: 'inherit',
  });
}
