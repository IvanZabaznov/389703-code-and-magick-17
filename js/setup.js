'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');

var setupSimilarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var fireball = setup.querySelector('.setup-fireball-wrap');

var coatColor = setup.querySelector('[name="coat-color"]');
var eyesColor = setup.querySelector('[name="eyes-color"]');
var fireballColor = setup.querySelector('[name="fireball-color"]');


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

var onWizardCoatClick = function () {
  coatColor.value = getRandomData(COAT_COLORS);
  wizardCoat.style.fill = coatColor.value;
};

var onWizardEyesClick = function () {
  eyesColor.value = getRandomData(EYES_COLORS)
  wizardEyes.style.fill = eyesColor.value;
};

var onFireballClick = function () {
  fireballColor.value = getRandomData(FIREBALL_COLORS);
  fireball.style.backgroundColor = fireballColor.value;
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);

  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  fireball.addEventListener('click', onFireballClick);
};

var closePopup = function () {
  setup.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);

  wizardCoat.removeEventListener('click', onWizardCoatClick);
  wizardEyes.removeEventListener('click', onWizardEyesClick);
  fireball.removeEventListener('click', onFireballClick);
};


setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupUserName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

setupUserName.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

