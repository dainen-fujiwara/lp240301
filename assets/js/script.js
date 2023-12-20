$(function() {

  $('.l-animation__skip').on('click', function(){
		showMain();
	});

	//DATEコンテンツ
  $('.l-date .paging .left').on('click', function(){
		pageMove('date', -1);
	});
  $('.l-date .paging .right').on('click', function(){
		pageMove('date', 1);
	});
	$('.l-date .l-date__list li').on('click', function(){
		var set_num = $('.l-date .l-date__list li').index(this) + 1;
		pageMove('date', 0, set_num);
	});

	/** スワイプイベント */
	$(".l-date .l-date__body").on("touchstart", function(event){
		start_check(event);
	});
	$(".l-date .l-date__body").on("touchmove", function(event){
		move_check(event);
	});
	$(".l-date .l-date__body").on("touchend", function(){
		var move = end_check();
		if ( move == "left" ) {
			pageMove('date', 1);
		} else if ( move == "right" ) {
			pageMove('date', -1);
		}
	});

	//SCHEDULEコンテンツ
	$('.l-schedule .paging .left').on('click', function(){
		pageMove('schedule', -1);
	});
	$('.l-schedule .paging .right').on('click', function(){
		pageMove('schedule', 1);
	});
	/** スワイプイベント */
	$(".l-schedule .l-scheulde__body").on("touchstart", function(event){
		start_check(event);
	});
	$(".l-schedule .l-scheulde__body").on("touchmove", function(event){
		move_check(event);
	});
	$(".l-schedule .l-scheulde__body").on("touchend", function(){
		var move = end_check();
		if ( move == "left" ) {
			pageMove('schedule', 1);
		} else if ( move == "right" ) {
			pageMove('schedule', -1);
		}
	});

	//SEMINARコンテンツ
	$('.l-seminar .paging .left').on('click', function(){
		pageMove('seminar', -1);
	});
	$('.l-seminar .paging .right').on('click', function(){
		pageMove('seminar', 1);
	});
	/** スワイプイベント */
	$(".l-seminar .l-seminar__body").on("touchstart", function(event){
		start_check(event);
	});
	$(".l-seminar .l-seminar__body").on("touchmove", function(event){
		move_check(event);
	});
	$(".l-seminar .l-seminar__body").on("touchend", function(){
		var move = end_check();
		if ( move == "left" ) {
			pageMove('seminar', 1);
		} else if ( move == "right" ) {
			pageMove('seminar', -1);
		}
	});

	//予約フォーム
	$(".btn_primary").modaal({
		overlay_close:true,		//モーダル背景クリック時に閉じるか
		fullscreen:false,			//フルスクリーンモードにするか
		before_open:function(){
			$('html').css('overflow-y','hidden');
		},
		after_close:function(){
			$('html').css('overflow-y','scroll');

      $('#reserve_area .form').each(function(i, e){
        $(e).hide();
      });
      $('#form-01').show();
		}
	});
	$(".btn_primary").on('click', function(){
		var event_id = $(this).attr('event-id');
    $('#EventID').val(event_id);

		var title = "";
		if ( event_id == "18" ) {
			title = "2月29日（木）午前の部";
		} else if ( event_id == "19" ) {
			title = "2月29日（木）午後の部";
		} else if ( event_id == "20" ) {
			title = "3月1日（金）午前の部";
		} else if ( event_id == "21" ) {
			title = "3月1日（金）午後の部";
		} else if ( event_id == "22" ) {
			title = "3月2日（土）午前の部";
		} else if ( event_id == "23" ) {
			title = "3月2日（土）午後の部";
		}

		$('#form-01 h3').text(title);
		$('#form-02 h3').text(title);

    $('#reseve_btn').hide();
    $('#cancel_btn').hide();

    //予約状態のチェック
    checkEvent();

	});

  //予約する
	$('#reseve_btn').on('click', function(){
    reserveEvent();
	});
  //キャンセルする
	$('#cancel_btn').on('click', function(){
    cancelEvent();
	});
  //閉じる
	$('#close_btn').on('click', function(){
		$('.btn_primary').modaal('close');
	});

	//参加企業一覧
	$(".btn_list").modaal({
		fullscreen: true, //フルスクリーンモードにするか
		before_open:function(){
			$('html').css('overflow-y','hidden');
		},
		after_close:function(){
			$('html').css('overflow-y','scroll');
		}
	});

	$(".btn_list").on('click', function(){
		$('.l-modal__company').each(function(i, e){
			$(e).hide();
		});
		var date_id = $(this).attr('date-id');
		var show_name = ".l-modal__company.date" + date_id;
		$(show_name).show();
	});

	//ボタン
	$('#login_btn').on('click', function(){
		location.href= root_path + '/member/login/';
	});
	$('#register_btn').on('click', function(){
		location.href= root_path + '/member/register/';
	});

});

//ページ移動
function pageMove(page_name, move_num = 0, set_num = 0) {

	var contents_name = "";
	if ( page_name == "date" ) {
		contents_name = ".l-date .l-date__contents";
	} else if ( page_name == "schedule" ) {
		contents_name = ".l-schedule .l-schedule__contents";
	} else if ( page_name == "seminar" ) {
		contents_name = ".l-seminar .l-seminar__contents";
	}

	var now = 0;
	var max = 0;
	$(contents_name).each(function(i, e){
		max++;
		if ( $(e).hasClass('active') ) {
			now = i + 1;
		}
	});

	var set = now + move_num;
	if ( set == 0 ) {
		set = max;
	} else if ( set > max ) {
		set = 1;
	}

	//現愛の要素名
	var now_name = contents_name + "." + page_name + now;

	//移動後の要素名
	var set_name = "";
	if ( set_num == 0 ) {
		set_name = contents_name + "." + page_name + set;
	} else {
		set_name = contents_name + "." + page_name + set_num;
	}

	$(now_name).removeClass('active');
	$(now_name).hide();
	$(set_name).fadeIn(500);
	$(set_name).addClass('active');

	//DATEコンテンツの場合、マークも変更
	if ( page_name == "date" ) {
		var mark_now_name = ".l-date .l-date__list " + "." + page_name + now;

		var mark_set_name = "";
		if ( set_num == 0 ) {
			mark_set_name = ".l-date .l-date__list " + "." + page_name + set;
		} else {
			mark_set_name = ".l-date .l-date__list " + "." + page_name + set_num;
		}

		$(mark_now_name).removeClass('active');
		$(mark_set_name).addClass('active');
	}

}

$('.slider_gallery').slick({
	arrows: false,
	autoplay: true,
	autoplaySpeed: 0,
	speed: 6000,
	infinite: true,
	pauseOnHover: false,
	pauseOnFocus: false,
	cssEase: 'linear',
	slidesToShow: 1.25,
	slidesToScroll: 1,
});

$('.slider_logo.list1').slick({
	arrows: false,
	autoplay: true,
	autoplaySpeed: 0,
	speed: 7000,
	infinite: true,
	pauseOnHover: false,
	pauseOnFocus: false,
	cssEase: 'linear',
	slidesToShow: 1.5,
	slidesToScroll: 1,
});

$('.slider_logo.list2').slick({
	arrows: false,
	autoplay: true,
	autoplaySpeed: 0,
	speed: 6000,
	infinite: true,
	pauseOnHover: false,
	pauseOnFocus: false,
	cssEase: 'linear',
	slidesToShow: 1.5,
	slidesToScroll: 1,
});

//最初のアニメーション
$('html').css('overflow-y','hidden');
var show_time = 0;
var hide_time = 0;
var obj;
/*
setTimeout(function(){
		$('.l-animation__text').each(function(i, e){
		show_time = i * 3500;
		hide_time = i * 3500 + 2500;
		setTimeout(function(){
			$(e).removeClass('hidden');
			$(e).addClass('active');
		}, show_time);
		setTimeout(function(){
			$(e).removeClass('active');
			$(e).addClass('hidden');
		}, hide_time);
	});
}, 1500);

setTimeout(function(){
	showMain();
}, 12000);
*/

setTimeout(function(){
	showMain();
}, 1500);


//円を拡げる調整
if ( $(window).width() > $(window).height() ) {
	$('.l-mask').css('width', 'calc(100% * 1.5)');
	$('.l-mask').css('height', 'unset');
	$('.l-mask').css('border-width', $(window).width());
} else {
	$('.l-mask').css('border-width', $(window).height());
}

//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
	var scroll = $(window).scrollTop();
	if (scroll >= 100){//上から100pxスクロールしたら
		$('#page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
		$('#page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
	}else{
		if($('#page-top').hasClass('UpMove')){//すでに#page-topにUpMoveというクラス名がついていたら
			$('#page-top').removeClass('UpMove');//UpMoveというクラス名を除き
			$('#page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
		}
	}
}

function fadeAnime(){

    //4-1 ふわっ（その場で）
    $('.fadeInTrigger').each(function(){ //fadeInTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
		$(this).addClass('fadeIn');// 画面内に入ったらfadeInというクラス名を追記
		}else{
		$(this).removeClass('fadeIn');// 画面外に出たらfadeInというクラス名を外す
		}
		});
    //4-1 ふわっ（下から）
	$('.fadeUpTrigger').each(function(){ //fadeUpTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
		$(this).addClass('fadeUp');// 画面内に入ったらfadeUpというクラス名を追記
		}else{
		$(this).removeClass('fadeUp');// 画面外に出たらfadeUpというクラス名を外す
		}
		});

	//4-2 パタッ（左上へ）
	$('.flipLeftTopTrigger').each(function(){ //flipLeftTopTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
		$(this).addClass('flipLeftTop');// 画面内に入ったらflipLeftTopというクラス名を追記
		}else{
		$(this).removeClass('flipLeftTop');// 画面外に出たらflipLeftTopというクラス名を外す
		}
		});

    //4-2 パタッ（右上へ）
    $('.flipRightTopTrigger').each(function(){ //flipRightTopTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
		$(this).addClass('flipRightTop');// 画面内に入ったらflipRightTopというクラス名を追記
		}else{
		$(this).removeClass('flipRightTop');// 画面外に出たらflipRightTopというクラス名を外す
		}
		});

	// 4-4 ボンッ（拡大）
	$('.zoomInTrigger').each(function(){ //zoomInTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
		$(this).addClass('zoomIn');// 画面内に入ったらzoomInというクラス名を追記
		}else{
		$(this).removeClass('zoomIn');// 画面外に出たらzoomInというクラス名を外す
		}
		});
}

APNG.ifNeeded().then(function () {
	var images = document.querySelectorAll(".apng-image");
	for (var i = 0; i < images.length; i++) APNG.animateImage(images[i]);
});


var rotate = [];
var set_position = 0;
var pm = 1;

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  PageTopAnime();//機能編 8-1-8	リンクボタンをクリックしたら形状が変化の関数を呼ぶ
	fadeAnime();//印象編 4 最低限おぼえておきたい動きの関数を呼ぶ

	if (set_position < document.documentElement.scrollTop) {
		pm = -1;
	} else {
		pm = 1;
	}

	set_position = document.documentElement.scrollTop;
	rotateParts(pm);	//文字を回転させる
});


// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load',function(){

	$('.parts').each(function(i, e){
		rotate[i+1] = getRotationDegrees($(e));
	});

	//テキストのカウントアップ+バーの設定
	var bar = new ProgressBar.Line(splash_text, {//id名を指定
		easing: 'easeInOut',//アニメーション効果linear、easeIn、easeOut、easeInOutが指定可能
		duration: 1000,//時間指定(1000＝1秒)
		strokeWidth: 0.2,//進捗ゲージの太さ
		color: '#fff',//進捗ゲージのカラー
		trailWidth: 0.2,//ゲージベースの線の太さ
		trailColor: '#aaa',//ゲージベースの線のカラー
		text: {//テキストの形状を直接指定
			style: {//天地中央に配置
				position: 'absolute',
				left: '50%',
				top: '50%',
				padding: '0',
				margin: '-30px 0 0 0',//バーより上に配置
				transform:'translate(-50%,-50%)',
				'font-size':'1rem',
				color: '#fff',
			},
			autoStyleContainer: false //自動付与のスタイルを切る
		},
		step: function(state, bar) {
			bar.setText(Math.round(bar.value() * 100) + ' %'); //テキストの数値
		}
	});

	//プログレスバーのアニメーションスタート
	bar.animate(1.0, function () {//バーを描画する割合を指定します 1.0 なら100%まで描画します
		$("#splash_text").fadeOut(10);//フェードアウトでローディングテキストを削除
		$(".loader_cover-up").addClass("coveranime");//カバーが上に上がるクラス追加
		$(".loader_cover-down").addClass("coveranime");//カバーが下に下がるクラス追加

		//splash削除
		setTimeout(function(){
			$('.l-splash').remove();
		}, 500);
	});//=====ここまでプログレスバー表示

});// ここまでページが読み込まれたらすぐに動かしたい場合の記述


// eachTextAnimeにappeartextというクラス名を付ける定義
function EachTextAnimeControl() {
	$('.eachTextAnime').each(function () {
		var elemPos = $(this).offset().top - 50;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass("appeartext");

		} else {
			$(this).removeClass("appeartext");
		}
	});
}


//文字の回転
function rotateParts(pm){
	$('.parts').each(function(i, e){
		var key = i + 1;
		var n = i % 4 + 2;
		if ( i % 2 == 1 ) {
			rotate[key] += n * pm;
		} else {
			rotate[key] -= n * pm;
		}
		$(e).css({ transform: 'rotate(' + rotate[key] + 'deg)' })
	});
}

//現在の回転位置取得
function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}

//コンテンツ表示
function showMain(){
	$('html').css('overflow-y','auto');
	$(window).scrollTop(0);
	$('.l-animation').hide();
	$('.l-mask').css('border-width', '0px');
	setTimeout(function(){
		$('.l-mask').hide();
	}, 1500);

	//トップsectionの強調文字
	setTimeout(function(){
		$('.l-top__contents--topics li.hyougo span').addClass('border');
	}, 1000);
	setTimeout(function(){
		$('.l-top__contents--topics li.famous span').addClass('border');
	}, 3000);
	setTimeout(function(){
		$('.l-top__contents--topics li.campaign span').addClass('border');
	}, 5000);
}


var modeX,posiX;

//タッチ開始時の処理
function start_check(event) {
	/** 現在の座標取得 */
	posiX = getX(event);

	/** 移動距離状態を初期化 */
	moveX = "";

}

//スワイプ中の処理
function move_check(event){
		/** 右→左と判断 */
	if (posiX - getX(event) > 70) {
		moveX = "left";
		/** 左→右と判断 */
	} else if (posiX - getX(event) < -70) {
		moveX = "right";
	}
}

//指が離れた時の処理
function end_check(){
	return moveX;
}
//縦方向の座標を取得
function getY(event) {
	return (event.originalEvent.touches[0].pageY);
}
//横方向の座標を取得
function getX(event) {
	return (event.originalEvent.touches[0].pageX);
}


//ドキュメントルートの設定
var uri = new URL(window.location.href);

if ( uri.hostname == 'localhost' ) {
  var root_path = "/Harimatch/";
} else {
  var root_path = "/";
}

/*
 * ユーザーがログイン済みかチェック
 */
function chkUserLogin(){

  var r_bool = false;
  var user_login = localStorage.getItem('UserLogin');

  if ( user_login == "" ) {

    //ユーザーIDの取得
    $.ajax({
      url      : root_path + "ajax/common/get_user_id_ajax.php",
      type     : "post",
      dataType : "json",
      async    : false,

    }).done(function(data) {

      if ( data.UID != null && data.UID != "" && data.UID != "null" ) {
        localStorage.setItem('UserLogin', 'true');
        localStorage.setItem('LoginName', data.LoginName);
        r_bool = true;
      } else {
        localStorage.setItem('UserLogin', '');
        localStorage.setItem('LoginName', '');
      }

    }).fail(function(jqXHR, textStatus, errorThrown) {

      console.log(jqXHR.status);
      console.log(jqXHR.responseText);
      console.log(textStatus);
      console.log(errorThrown);
      console.log('エラー');

    });


  } else {
    r_bool = true;
  }

  //ログインしていない
  if (!r_bool) {
		$('#form-01').fadeOut(200, function() {
			$('#form-login').fadeIn(200);
		})
  }

  return r_bool;

}

/* イベント予約状態の取得 */
function checkEvent(){

  //ユーザーのログインチェック
  if (!chkUserLogin()){
    return;
  }

  showSpiner();    //スピナーの表示

  var event_id = $('#EventID').val();

  //情報登録
  $.ajax({
    url      : root_path + "ajax/event/check_user_ajax.php",
    type     : "post",
    data     : {"event_id" : event_id},
    dataType : "json"

  }).done(function(data) {

    hideSpiner();    //スピナーの非表示

    if ( data.reserve_status == "ok" ) {
      $('#form-01 p').text('この就活イベントに予約しますか？');
      $('#reseve_btn').show();

    } else if ( data.reserve_status == "reserved" ) {
      $('#form-01 p').text('この就活イベントの予約をキャンセルしますか？');
      $('#cancel_btn').show();

    } else if ( data.reserve_status == "before" ) {
      $('#form-01 p').text('予約受付前になります');

    } else if ( data.reserve_status == "expired" ) {
      $('#form-01 p').text('予約の期限が過ぎています');

    } else if ( data.reserve_status == "full" ) {
      $('#form-01 p').text('定員が満員になりました');

    }


  }).fail(function(jqXHR, textStatus, errorThrown) {

    console.log(jqXHR.status);
    console.log(jqXHR.responseText);
    console.log(textStatus);
    console.log(errorThrown);

    hideSpiner();    //スピナーの非表示

    alert('予約に失敗しました');

  });

}

/* イベントの予約 */
function reserveEvent(){
/*
  //ユーザーのログインチェック
  if (!chkUserLogin()){
    return;
  }
*/
  showSpiner();    //スピナーの表示

  var event_id = $('#EventID').val();

  //情報登録
  $.ajax({
    url      : root_path + "ajax/event/reserve_user_ajax.php",
    type     : "post",
    data     : {"event_id" : event_id},
    dataType : "json"

  }).done(function(data) {

    hideSpiner();    //スピナーの非表示

    if ( data.r_bool == false ) {
      alert('予約に失敗しました');
      return;
    }

    $('#form-02 p').text('予約が完了しました');
    $('#form-01').fadeOut(200, function() {
			$('#form-02').fadeIn(200);
		});

  }).fail(function(jqXHR, textStatus, errorThrown) {

    console.log(jqXHR.status);
    console.log(jqXHR.responseText);
    console.log(textStatus);
    console.log(errorThrown);

    hideSpiner();    //スピナーの非表示

    alert('予約に失敗しました');

  });

}

/* イベント予約のキャンセル */
function cancelEvent(){
/*
  //ユーザーのログインチェック
  if (!chkUserLogin()){
    return;
  }
*/
  if ( !confirm('予約をキャンセルします。\nよろしいですか？') ) {
    return;
  }

  showSpiner();    //スピナーの表示

  var event_id = $('#EventID').val();

  //情報登録
  $.ajax({
    url      : root_path + "ajax/event/cancel_user_ajax.php",
    type     : "post",
    data     : {"event_id" : event_id},
    dataType : "json"

  }).done(function(data) {

    hideSpiner();    //スピナーの非表示

    if ( data.r_bool == false ) {
      alert('キャンセル期限が過ぎているため、キャンセルできませんでした。');
      return;
    }

    $('#form-02 p').text('予約をキャンセルしました');
    $('#form-01').fadeOut(200, function() {
			$('#form-02').fadeIn(200);
		});

  }).fail(function(jqXHR, textStatus, errorThrown) {

    console.log(jqXHR.status);
    console.log(jqXHR.responseText);
    console.log(textStatus);
    console.log(errorThrown);

    hideSpiner();    //スピナーの非表示
    alert('キャンセルに失敗しました');

  });

}


/*
 * スピナーの表示（円）
 */
function showSpiner(obj_name='body') {

  var html = ''
  + '<div class="ouro">'
  + '  <span class="left">'
  + '    <span class="anim"></span>'
  + '  </span>'
  + '  <span class="right">'
  + '    <span class="anim"></span>'
  + '  </span>'
  + '</div>'
  ;

  $(obj_name).append(html);
}

/*
 * スピナーの削除
 */
function hideSpiner(obj_name='body') {
  $(obj_name + ' .ouro').hide();
}
