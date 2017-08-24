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
  fireballColors: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ],
  generateName: function () {
    return this.names[returnRandom(this.names.length)] + ' ' + this.lastnames[returnRandom(this.lastnames.length)];
  },
  generateEyesColor: function () {
    return this.eyesColors[returnRandom(this.eyesColors.length)];
  },
  generateCoatColor: function () {
    return this.coatColors[returnRandom(this.coatColors.length)];
  },
  generateFireballColor: function () {
    return this.fireballColors[returnRandom(this.fireballColors.length)];
  }
};

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userDialogSetupName = userDialog.querySelector('.setup-user-name');
var userDialogSubmit = userDialog.querySelector('.setup-submit');
var wizardSetup = userDialog.querySelector('.setup-wizard');
var wizardCoat = wizardSetup.querySelector('.wizard-coat');
var wizardEyes = wizardSetup.querySelector('.wizard-eyes');
var fireball = userDialog.querySelector('.setup-fireball-wrap');
var openPopup = function () {
  userDialog.classList.remove('hidden');
};
var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
var onPopupEscPress = function (event) {
  if (event.keyCode === 27 && event.target !== userDialogSetupName) {
    closePopup();
  }
};
var onPopupEnterPress = function (event) {
  if (event.keyCode === 13) {
    closePopup();
  }
};

wizardCoat.addEventListener('click', function (event) {
  changeWizardColors(event.target, WIZARD_CONFIG.generateCoatColor());
});
wizardEyes.addEventListener('click', function (event) {
  changeWizardColors(event.target, WIZARD_CONFIG.generateEyesColor());
});
fireball.addEventListener('click', function (event) {
  changeWizardColors(event.currentTarget, WIZARD_CONFIG.generateFireballColor(), 'background');
});

userDialogOpen.addEventListener('click', function () {
  openPopup();
  document.addEventListener('keydown', onPopupEscPress);
});
userDialogClose.addEventListener('click', function () {
  closePopup();
});
userDialogOpen.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    openPopup();
  }
});
userDialogClose.addEventListener('keydown', onPopupEnterPress);
userDialogSubmit.addEventListener('click', closePopup());
userDialogSubmit.addEventListener('keydown', onPopupEnterPress);
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

function changeWizardColors(elem, color, option) {
  if (option === 'background') {
    elem.style.background = color;
  } else {
    elem.style.fill = color;
  }
}


