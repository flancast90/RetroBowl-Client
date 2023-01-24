// ==UserScript==
// @name         Retro Bowl Cracker
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Cracked client for retro bowl credits, salary cap, 1st draft picks, and more!
// @author       flancast90
// @match        https://game316009.konggames.com/gamez/0031/6009/live/index.html
// @icon         https://www.google.com/s2/favicons?sz=64&domain=retrobowl.app
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.saveData = localStorage.getItem('RetroBowl.0.savedata.ini');
    const addCredits = (count) => {
        const newSave = window.saveData.replace(/coach_credit="[0-9]+"/g, `coach_credit="${count}"`);
        localStorage.setItem('RetroBowl.0.savedata.ini', newSave);
    }

    const changeSalaryCap = (salary) => {
        const newSave = window.saveData.replace(/salary_cap="[0-9]+"/, `salary_cap="${salary}"`);
        localStorage.setItem('RetroBowl.0.savedata.ini', newSave);
    }

    const changeDraft = (picks) => {
        const newSave = window.saveData.replace(/draft_picks_0="[0-9]+"/, `draft_picks_0="${picks}"`);
        localStorage.setItem('RetroBowl.0.savedata.ini', newSave);
    }

    const changeStadiumLvl = (lvl) => {
        let newSave = window.saveData.replace(/facility_upgraded_stadium="[0-9]+"/, `facility_upgraded_stadium="${lvl}"`);
        newSave = window.saveData.replace(/facility_stadium="[0-9]+"/, `facility_stadium="${lvl}"`);
        localStorage.setItem('RetroBowl.0.savedata.ini', newSave);
    }

    const changeTrainingLvl = (lvl) => {
        let newSave = window.saveData.replace(/facility_upgraded_training="[0-9]+"/, `facility_upgraded_training="${lvl}"`);
        newSave = window.saveData.replace(/facility_training="[0-9]+"/, `facility_training="${lvl}"`);
        localStorage.setItem('RetroBowl.0.savedata.ini', newSave);
    }

    const changeRehabLvl = (lvl) => {
        let newSave = window.saveData.replace(/facility_upgraded_rehab="[0-9]+"/, `facility_upgraded_rehab="${lvl}"`);
        newSave = window.saveData.replace(/facility_rehab="[0-9]+"/, `facility_rehab="${lvl}"`);
        localStorage.setItem('RetroBowl.0.savedata.ini', newSave);
    }

    const injectCtrlBar = () => {
        const body = document.querySelector("body");
        let div = document.createElement("div");
        div.id = "ctrlBar";
        div.style = "background:blue;position:fixed;z-index:1000;top:10px;padding:10px;border-radius:10px;left:50%;transform:translateX(-50%);"
        body.appendChild(div);
    }

    const injectCreditsBtn = () => {
        const ctrlBar = document.querySelector("#ctrlBar");
        let btn = document.createElement("button");
        btn.id = "creditsBtn";
        btn.innerText = "Give Me Credits!";
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            const newCreditCount = window.prompt("How many credits would you like?");
            if (!isNaN(newCreditCount)) {
                addCredits(newCreditCount);
                window.location.reload();
            }
        });
    }

    const injectSalaryBtn = () => {
        const ctrlBar = document.querySelector("#ctrlBar");
        let btn = document.createElement("button");
        btn.id = "salaryBtn";
        btn.innerText = "Change Salary Cap!";
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            const newSalary = window.prompt("What would you like your new salary cap to be?");
            if (!isNaN(newSalary)) {
                changeSalaryCap(newSalary);
                window.location.reload();
            }
        });
    }

    const injectDraftBtn = () => {
        const ctrlBar = document.querySelector("#ctrlBar");
        let btn = document.createElement("button");
        btn.id = "draftBtn";
        btn.innerText = "Change Draft Picks";
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            const newDraft = window.prompt("How many 1st round draft picks would you like?");
            if (!isNaN(newDraft)) {
                changeDraft(newDraft);
                window.location.reload();
            }
        });
    }

    const injectStadiumBtn = () => {
        const ctrlBar = document.querySelector("#ctrlBar");
        let btn = document.createElement("button");
        btn.id = "salaryBtn";
        btn.innerText = "Change Stadium Level";
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            const newLvl = window.prompt("What level stadium do you want (0-10)?");
            if (!isNaN(newLvl)) {
                changeStadiumLvl(newLvl);
                window.location.reload();
            }
        });
    }

    const injectTrainingBtn = () => {
        const ctrlBar = document.querySelector("#ctrlBar");
        let btn = document.createElement("button");
        btn.id = "trainingBtn";
        btn.innerText = "Change Training Facility Level";
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            const newLvl = window.prompt("What level training facilities do you want (0-10)?");
            if (!isNaN(newLvl)) {
                changeTrainingLvl(newLvl);
                window.location.reload();
            }
        });
    }

    const injectRehabBtn = () => {
        const ctrlBar = document.querySelector("#ctrlBar");
        let btn = document.createElement("button");
        btn.id = "rehabBtn";
        btn.innerText = "Change Rehab Facility Level";
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
            const newLvl = window.prompt("What level rehab facilities do you want (0-10)?");
            if (!isNaN(newLvl)) {
                changeRehabLvl(newLvl);
                window.location.reload();
            }
        });
    }

    const injectInfoBtn = () => {
        const ctrlBar = document.querySelector("#ctrlBar");
        let btn = document.createElement("button");
        btn.id = "info";
        btn.innerText = "Client info";
        ctrlBar.appendChild(btn);

        btn.addEventListener("click", () => {
           alert(`
           Using RB_Cracker v0.1\n
           By Finn Lancaster (flancast90)\n
           https://github.com/flancast90 (Star it!)\n
           Problems? Contact flancast90@gmail.com
           `);
        });
    };

    const methods = {
        ctrlBar: injectCtrlBar(),
        credits: injectCreditsBtn(),
        salary: injectSalaryBtn(),
        draft: injectDraftBtn(),
        stadium: injectStadiumBtn(),
        training: injectTrainingBtn(),
        rehab: injectRehabBtn(),
        info: injectInfoBtn(),
        addAll: function() {
            for (let method of Object.keys(this).filter(m => m !== "addAll")) method;
        }
    }
    methods.addAll();
})();
