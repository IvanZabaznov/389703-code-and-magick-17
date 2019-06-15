'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 110;
var CLOUD_Y = 10;
var GAP = 10;
var LINE_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_INTERVAL = 50;
var BAR_HEIGHT_MAX = 150;
var COLOR_BLACK = 'rgba(0, 0, 0, 1)';
var COLOR_RED = 'rgba(255, 0, 0, 1)';

var getRandomValue = function(min, max, step) {
  var res = (Math.floor(Math.random() * (max - min + step) / step)) * step + min;

  return Number(res.toFixed(10));
}

var getRandomSaturationHSL = function(hue, lightness) {
  return 'hsl(' + hue + ',' + getRandomValue(0, 100, 1) + '%,' + lightness  + '%)';
};

var getBarX = function(iteration) {
  return CLOUD_X + BAR_INTERVAL + (BAR_INTERVAL + BAR_WIDTH) * iteration;
};

var getBarHeight = function(arr, maxTime, iteration) {
  return Math.round((arr[iteration] / maxTime * BAR_HEIGHT_MAX));
};

var getBarY = function(arr, maxTime, iteration) {
  return CLOUD_Y + GAP * 9 + BAR_HEIGHT_MAX - getBarHeight(arr, maxTime, iteration);
};

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) maxElement = arr[i];
  }

  return maxElement;
};

var getColor = function(arr, iteration) {
  var color = getRandomSaturationHSL(240, 50);

  if (arr[iteration] === 'Вы') {
    color = COLOR_RED;
  }

  return color;
};

window.renderStatistics = function(ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1)');

  ctx.fillStyle = COLOR_BLACK;

  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3 + LINE_HEIGHT);


  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(Math.round(times[i]), getBarX(i), getBarY(times, maxTime, i) - GAP);
    ctx.fillStyle = getColor(names, i);
    ctx.fillRect(getBarX(i), getBarY(times, maxTime, i), BAR_WIDTH, getBarHeight(times, maxTime, i));
    ctx.fillStyle = COLOR_BLACK;
    ctx.fillText(names[i], getBarX(i), getBarY(times, maxTime, i) + getBarHeight(times, maxTime, i) + LINE_HEIGHT);
  }
};
