var lastSpin = false;
var spinning = false;

var state = "closed";
var select = true;

$(document).ready(function () {
  $('.popup__button').on('click', function (e) {
    var parent = $(e.target).closest('.popup');
    $(parent).removeClass('active');
    select = true;
  });

  $('.chests__content li').on("click", function (e) {
    if ($(e.target).hasClass('item') && select) {
      select = false;
      document.getElementById("chest-open").play();

      function popup(className, fanfare) {
        $('.popup').removeClass('active');
        $(className).addClass('active');
        document.getElementById(fanfare).play();
      }

      switch (state) {
        case "closed":
          stateSwitch($(e.target), "empty");
          setTimeout(popup, 1000, ".empty-popup", "fanfare0");
          state = "empty";
          break;
        case "empty":
          stateSwitch($(e.target), "bonus");
          setTimeout(popup, 1000, ".bonus-popup", "fanfare1");
          state = "bonus";
          break;
        case "bonus":
          stateSwitch($(e.target), "superbonus");
          setTimeout(popup, 1000, ".superbonus-popup", "fanfare2");
          state = "superbonus";
          break;
        case "superbonus":
          break;
        default:
          break;
      }

      function stateSwitch(target, newState) {
        target.removeAttr("class");
        target.addClass(newState);
      }
    }
  });
});


function openoffer(){
  window.open('https://your-offer-page-url.com', '_blank')
}