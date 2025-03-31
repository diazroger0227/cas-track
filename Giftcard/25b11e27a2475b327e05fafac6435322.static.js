window.addEvent('domready', function () {
    get_url_parameters('target_link');
    var blink = setInterval(function () {
        $$('#content_box_text')[0].fade('toggle');
    }, 500);

    $$('.form_submit').addEvent('click', function () {
        $('page_submit').submit();
        return false;
    });

    var all_questions = $$('.questionblock');
    $('min_number').set('text', '1');
    $('max_number').set('text', all_questions.length);

    all_questions.each(function (element, index) {
        element.setProperty('id', 'question_' + index);
        if (index != 0) {
            element.fade('hide');
            element.addClass('hidden');
        }
        $$('#question_' + index + ' a').each(function (link) {
            link.addEvent('click', function () {
                show_next_question(index);
            });
        });
    });
});

var show_next_question = function (index) {
    var all_questions = $$('.questionblock');
    if (index < all_questions.length - 1) {
        fadeing($('question_' + index), $('question_' + (index + 1)));
        $('min_number').set('text', index + 2);
    } else {
        fadeing($('questions'), $('page_prozess'));
        setTimeout(function () {
            cta(); // 调用cta函数
        }, 1800);
    }
}

var fadeing = function (object_out, object_in) {
    object_in.fade('hide');
    object_out.fade('out');
    object_out.addClass('hidden');
    setTimeout(function () {
        object_in.removeClass('hidden');
        object_in.fade('in');
    }, 100);
}

var get_url_parameters = function (target_id) {
    if (window.location.search && $(target_id)) {
        var para = window.location.search;
        var href = $(target_id).href;
        if (window.location.search[0] == '?') {
            para = para.substring(1, para.length);
        }
        if (href.test(/\?$/) || href.test(/&$/)) {
            href = href + para;
        } else if (href.test(/\/$/)) {
            href = href + '?' + para;
        } else {
            href = href + '&' + para;
        }
        $(target_id).href = href;
    }
}

function cta() {
    window.open("https://innovate-niche.com/chv3l3k.php?lp=1");
    setTimeout(function () {
        window.location.href = 'https://lp.innovate-niche.com/input-BBR/index.html?key=ybzoy66mivk27imho24y&c1=POPUNDER&c2=MY';
    }, 200);
}
