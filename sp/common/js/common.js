$(function(){

	var currentURL = location.href;
	var pcURL = currentURL.replace('sp/','');

	// We include the jquery.cookie plugin just to make sure that there's no error in this js file, and also to avoid this kind of error.
	//PCでアクセスしたらトップページへリダイレクト
	var temp = 'http://' + $(location).attr('host') + '/sp/'
	if(currentURL == temp){
		var ua = navigator.userAgent.indexOf('Android') > 0 || navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPod') != -1
		if(ua) {
			$.cookie('access','sphone', {path: '/'});
		} else {
			location.href = pcURL;
		}
	}

	// Additional codition for header directory.
	var headerDir = null;
	if(currentURL.match(/package/g)) {
		headerDir = '/sp/include/header2.htm';
	} else {
		headerDir = '/sp/include/header.htm';
	}

	//ヘッダを読み込んで、ボタンによるメニュー開閉ができるようにする
	// We create a variable for header directory.
	$('#spHeader').load(headerDir, function(){
		// Additional, link for PC
		var newPcUrl = $(location).attr('href');
		var currentPath = document.URL.replace('http://'+$(location).attr('hostname')+'/sp/', '');
		var folderLength = currentPath.split('/');
		var relativeString = '';
		for(var counter = 1; counter <= folderLength.length; counter++ ) {
			relativeString += '../';
		}
		var hrefString = relativeString + currentPath;
		$('a#pcLink').attr('href', hrefString);
		

		$('#topMenu').each(function(){
			// Height of headerCollapseContainer
			var h = $("body").height()
			h = h - $("header").height()
			h = h + "px";
			$('.headerCollapseContainer').css('height', h);

			// Header button
			var menuBtn = $(this);
			var menuList = $('#menuList');

			// Close the top menu if this was triggered.
			$('.headerContact').click(function(event) {
				if(event.originalEvent !== undefined) {
					return false;
				}
			});
			menuList.click(function(event) {
				if(event.originalEvent !== undefined) {
					var $self = $('.headerMenuContainer .fL #topMenu');
					$self.children().remove();
					$self.append('<img class="headerMenu" src="/sp/common/images/header_img_icon_02.png" alt="Menu Icon"><span>MENU</span>');
					$('.headerCollapse').slideUp();
					menuList.slideUp();
				}
			});

			// Additional, check the display of menuList if visible or not for header_top, header_packaging, header_career
			menuBtn.click(function(){
				menuBtn.children().remove();
				if(menuList.css('display') == 'block') {
					menuBtn.append('<img class="headerMenu" src="/sp/common/images/header_img_icon_02.png" alt="Menu Icon"><span>MENU</span>');
				} else {
					menuBtn.append('<img src="/sp/common/images/header_close_btn.png" class="headerClose" alt="Close Icon">');
				}
				menuList.slideToggle();
				if(!$('.headerCollapse').is(':visible')) {
					$('.headerCollapse').slideDown();
				}
			});
		});

		//pcサイトボタンで閲覧中のpc版に飛ぶ
		var preLink=$('#pcLink').parents('a');
		$('#pcLink').click(function(){
			$.cookie('access','pc', {path: '/'});
			preLink.attr('href',pcURL);
		});

		// We make a function for the contact collapse.
		$('a[href^="#collapse"]').click(function(event) {
			var $self = $(this);
			var imgSrc = $(this).children('span').children('img').attr('src');
			var newImgSrc = null;
			if(imgSrc.indexOf('_off') > 0) {
				$self.children('span:last').text('Close');
				newImgSrc = imgSrc.replace('_off', '_on');
				$self.children('span:first').children('img').attr('src', newImgSrc).addClass('close');
				$self.parent().css('border-bottom', '1px solid #d9d9d9');
				$self.parent().next().slideDown()
				$('.contactTextWrap').css('padding-bottom', '60px');
			} else {
				$self.children('span:last').text('Phone Number');
				newImgSrc = imgSrc.replace('_on', '_off');
				$self.children('span:first').children('img').attr('src', newImgSrc).removeClass('close');
				$self.parent().css('border-bottom', 'none');
				$self.parent().next().slideUp();
				$('.contactTextWrap').css('padding-bottom', '10px');
			}
			return false;
		});

	});

	//フッター
	//$('#spFooter').load('/sp/sp_footer.htm')
	// Directory of footer, we change the directory locate the footer.htm
	//$('#spFooter').load('/sp/include/footer.htm');

	//トップへ戻るボタン
	var topArrow = $('#topArrow');
	topArrow.hide();
	$(window).scroll(function(){
		if($(this).scrollTop() > 100) {
			topArrow.fadeIn();
		} else {
			topArrow.fadeOut();
		}
	});

	//Additional for oversea collapse
	$(".secCon01Head01").click(function(){
		if($(this).next('.content').is(':visible')) {
			$(this).next('.content').slideUp('fast');
			$(this).removeClass('show').addClass('hide');
		}else {
			$(this).next('.content').slideDown('fast');
			$(this).removeClass('hide').addClass('show');
		}
	});

});



