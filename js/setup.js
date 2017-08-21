'use strict';

var WIZARD_CONFIG = {
  names: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  lastnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  coatColors: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  eyesColors: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ],
  generateName: function () {
    return this.names[returnRandom(this.names.length)] + ' ' + this.lastnames[returnRandom(this.lastnames.length)];
  },
  generateEyesColor: function () {
    return this.eyesColors[returnRandom(this.eyesColors.length)];
  },
  generateCoatColor: function () {
    return this.coatColors[returnRandom(this.coatColors.length)];
  }
};
var userDialog = document.querySelector('.setup');

userDialog.classList.remove('hidden');
showWizards();

function showWizards() {
  var wizards = generateWizards();
  var fragment = document.createDocumentFragment();
  var similarListElement = userDialog.querySelector('.setup-similar-list');

  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
  userDialog.querySelector('.setup-similar').classList.remove('hidden');
}

function returnRandom(number) {
  return Math.floor(Math.random() * number);
}

function generateWizards() {
  var NUMBER_OF_WIZARDS = 4;
  var wizardsList = [];

  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    wizardsList.push({
      name: WIZARD_CONFIG.generateName(),
      coatColor: WIZARD_CONFIG.generateCoatColor(),
      eyesColor: WIZARD_CONFIG.generateEyesColor()
    });
  }
  return wizardsList;
}

function renderWizard(wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}


