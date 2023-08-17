#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = __importDefault(require("figlet"));
const inquirer_1 = __importDefault(require("inquirer"));
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const items_1 = require("./items");
(0, figlet_1.default)('Nilget', function (err, data) {
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
            choices: (0, items_1.getItemsList)(),
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
                const exist = (0, fs_1.existsSync)(val);
                if (exist) {
                    return `Project ${val} already exists. Please enter a new name.`;
                }
                return true;
            },
        },
    ];
    inquirer_1.default.prompt(questions).then((answers) => {
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
    const cmd = items_1.Items[target](project_name);
    (0, child_process_1.execSync)(cmd, { stdio: 'inherit' });
}
