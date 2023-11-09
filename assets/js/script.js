$(function() {

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

	//SCHEDULEコンテンツ
	$('.l-schedule .paging .left').on('click', function(){
		pageMove('schedule', -1);
	});
	$('.l-schedule .paging .right').on('click', function(){
		pageMove('schedule', 1);
	});

	//SEMINARコンテンツ
	$('.l-seminar .paging .left').on('click', function(){
		pageMove('seminar', -1);
	});
	$('.l-seminar .paging .right').on('click', function(){
		pageMove('seminar', 1);
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
		}
	});
	$(".btn_primary").on('click', function(){
		var date_id = $(this).attr('date-id');
		var title = "";
		
		if ( date_id == "1" ) {
			title = "2月29日（木）午前の部";
		} else if ( date_id == "2" ) {
			title = "2月29日（木）午後の部";
		} else if ( date_id == "3" ) {
			title = "3月1日（金）午前の部";
		} else if ( date_id == "4" ) {
			title = "3月1日（金）午後の部";
		} else if ( date_id == "5" ) {
			title = "3月2日（土）午前の部";
		} else if ( date_id == "6" ) {
			title = "3月2日（土）午後の部";
		}

		$('#form-01 h3').text(title);
		$('#form-02 h3').text(title);
	});
	
	$('#reseve_btn').on('click', function(){
		$('#form-01').fadeOut(200, function() {
			$('#form-02').fadeIn(200);
		})
	});
	$('#close_btn').on('click', function(){
		$('.btn_primary').modaal('close');
		setTimeout(function(){
			$('#form-01').show();
			$('#form-02').hide();
		}, 200);
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
/*
//ずらすために時間差で動かす
setTimeout(function(){
}, 2000);
*/
//$('html').css('overflow-y','hidden');



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
