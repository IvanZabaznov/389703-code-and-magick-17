'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');
var setupSimilarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomData = function (arr) {
  return arr[Math.round(Math.random() * (arr.length - 1))];
};

var getNamePlayer = function (firstNames, lastNames) {
  return getRandomData(firstNames) + ' ' + getRandomData(lastNames);
};

var createPlayers = function (number) {
  var arrPlayers = [];

  for (var i = 0; i < number; i++) {
    arrPlayers.push(
        {
          name: getNamePlayer(FIRST_NAMES, LAST_NAMES),
          coatColor: getRandomData(COAT_COLORS),
          eyesColor: getRandomData(EYES_COLORS)
        }
    );
  }

  return arrPlayers;
};

var players = createPlayers(4);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < players.length; i++) {
  fragment.appendChild(renderWizard(players[i]));
}

setupSimilarList.appendChild(fragment);
setup.querySelector('.setup-similar').classList.remove('hidden');
