// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require jquery
//= require turbolinks
//= require_tree .
//= require bootstrap-sprockets

// カレンダー実装
//= require moment
//= require fullcalendar


// Top/モーダル ------------------------------------------
//$(function)~~より変更。'turbolinks'対策の記述。
document.addEventListener("turbolinks:load", function(){
  $(document).on('click', '.sign_button', function() {
    $('.sign_modal_wrapper').show();
    $('.sign_modal').show();
    if ($(this).hasClass('sign_up_button')) {
      $('.sign_up_modal').show();
    } else {
      $('.sign_in_modal').show();
    }
  });
});
document.addEventListener("turbolinks:load", function(){
	$(document).on('click', '.sign_modal_wrapper, .fa_wrapper', function() {
	    $('.sign_modal_wrapper').hide();
	    $('.sign_modal').hide();
	    $('.sign_modal_content').hide();
	});
});
// -------------------------------------------------------------


// Index/カレンダー ---------------------------------------------
document.addEventListener("turbolinks:load", function(){
    $('#calendar').fullCalendar({
        titleFormat: 'YYYY / M',
        dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Tur', 'Fri', 'Sat'],
        header: {
            left: 'title',
            center: '',
            right: 'prev, next, today'
        },
        buttonText: {
            prev: 'Last Month',
            next: 'Next Month',
            prevYear: 'Last Year',
            nextYear: 'Next Year',
            today: 'Today',
            month: 'Month',
            week: 'Week',
            day: 'Day'
        },

        selectable: true,
        selectHelper: true,
        select: function(data) {
        	var months = [1,2,3,4,5,6,7,8,9,10,11,12]
        	var year = data.year().toString();
        	var month = months[data.month()].toString();
        	var date = data.date().toString();
        	var schedule_days = year + "/" + month + "/" + date;
        	data.year(),months[data.month()],data.date();

            // 'attr()'は、HTML要素の属性を取得したり設定することができるメソッド
        	var $select = $('#schedule_days');
        	$select.attr('value', schedule_days);
 
        	var $click = $('#todolist_days');
        	$click.attr('value', schedule_days);

	        $.ajax({
	            url: "/events",
	            type: "GET",
	            data: {
	              type: "schedule",
	              date: schedule_days,
	            },
	            dataType: "html",
	        })
	        // Ajaxリクエストが成功した時に動く。
	        .done(function(html) {
	          	console.log(html)
	          	//tab1の中のpost_wrapper1だけにかけている。
	            $('.tab1 .post_wrapper1').html(html)
	        })

	        $.ajax({
	            url: "/events",
	            type: "GET",
	            data: {
	              type: "todolist",
	              date: schedule_days,
	            },
	            dataType: "html",
	        })
	        // Ajaxリクエストが成功した時に動く。
	        .done(function(html) {
	          	console.log(html)
	          	//tab2の中のpost_wrapper2だけにかけている。
	            $('.tab2 .post_wrapper2').html(html)
	        })
        }
    });
});
// -------------------------------------------------------------


// Index/タブメニュー -------------------------------------------------
document.addEventListener("turbolinks:load", function(){
	// 不等価演算子 "!=" 「クラスがtabであり、id属性がtab1でない要素」を指定。
	$('#tab-contents .tab[id != "tab1"]').hide();
    $('#tab-menu a').on('click', function() {
	    $("#tab-contents .tab").hide();
	    $("#tab-menu .active").removeClass("active");
	    $(this).addClass("active");
	    $($(this).attr("href")).show();
	    return false;
    });
});
// ------------------------------------------------------------


// Index/Schedule -------------------------------------------------
document.addEventListener("turbolinks:load", function(){
  // 空のフォームを送信できないようにするための記述。
  $(".submit1").click(function(){
    if ($(this).val() == "") {
     return false;
    }
  });
  // 通信が成功すると呼び出されるイベント。
  $('#schedule').on('ajax:success', function(e) {
      $('#scheduleTitle').val('');
      // [2]はインデックス
      // post_wrapper1クラスの先頭に投稿した文字列を表示する。
      $('.post_wrapper1').prepend(e.detail[2].response);
  });
  // 部分テンプレ/_scheduleとの繋がり。
  $(document).on('ajax:success','.schedule_item', function(e) {
       $('.schedule_'+ e.detail[0]).remove();
  });
});
// ----------------------------------------------------------


// Index/Todolist -------------------------------------------------
document.addEventListener("turbolinks:load", function(){
  // 空のフォームを送信できないようにするための記述。
  $(".submit2").click(function(){
    if ($(this).val() == "") {
      return false;
    }
  });
  // 通信が成功すると呼び出されるイベント。
  $('#todo').on('ajax:success', function(e) {
      $('#todolistTitle').val('');
      // [2]はインデックス
      // post_wrapper2クラスの先頭に投稿した文字列を表示。
      $('.post_wrapper2').prepend(e.detail[2].response);
  });
  // 部分テンプレ/_todolistとの繋がり。
  $(document).on('ajax:success','.todolist_item', function(e) {
       $('.todolist_'+ e.detail[0]).remove();
  });
});

function check(e) {
		var $check = $(e.target);
		if($check.prop('checked') == true) {
			console.log("チェックしたよ。", $check.prop('checked'));
			// 押したら文字をtrueに変える。
			$('.chenge_button').click('checked', true);
		} else {
			console.log("チェック外れた。", $check.prop('checked'));
			// 押したら文字をfalseに変える。
			$('.chenge_button').click('checked', false);
		}
		console.log($('#csrf_check').val())
		//checkboxの値が変更された時、ajaxでその値を送信。
		$.ajax({
            url: "/events/"+$check.prop('id'),
            type: "post",
            data: { "check" : $check.prop('checked') },
            headers: {
              'X-CSRF-TOKEN': $('#csrf_check').val()
            }
        })
          // Ajaxリクエストが成功した時発動。
        .done(function(res) {
            console.log(res);
        })
        .error(function(res) {
            console.log(res);
        })
};
// ---------------------------------------------------------

