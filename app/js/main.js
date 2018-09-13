$(document).ready(function() {

	const mobileScreen = window.matchMedia("(max-width: 768px)");
	const tabletScreen = window.matchMedia("(min-width: 768px)");
	const descktopScreen = window.matchMedia("(min-width: 1200px)");

	// FIXED HEADER
	if (mobileScreen.matches || descktopScreen.matches) {
		let headerFixed = $("#headerFixed");
		$(window).scroll(function(){
			if ($(window).scrollTop() > 200) {
				headerFixed.slideDown(500);
			} else {
				headerFixed.slideUp(500);
			}
		})
	}

	// PRICES CAROUSEL mobile only
	if (mobileScreen.matches) {
		$('#carouselPrices').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			initialSlide: 1,
			prevArrow: '<div class="price-arrow price-arrow--prev icon-left-open-big"></div>',
			nextArrow: '<div class="price-arrow price-arrow--next icon-right-open-big"></div>',
		});
	}
	
	// TARIFFS TABS toggle
	var tariffTabs = $("#tariffTabs");
	tariffTabs.on('click', 'dt', function (e){
		e.preventDefault();
		if (!$(this).hasClass('active')) {
			tariffTabs.find('.active').removeClass('active');
			$(this).addClass('active');
		}
	})

	// LAST WORKS CAROUSEL
	$('#carouselLastWorks').slick({
		slidesToShow: 2,
		slidesToScroll: 1,
		dots: true,
		prevArrow: '<div class="last-works-arrow icon-left-open-big"></div>',
		nextArrow: '<div class="last-works-arrow icon-right-open-big"></div>',
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 1
			}
		}]
	});

	// FEEDBACK FORMS

	// placeholder animation & textarea resize 
	function animateForm(form) {
		var form = $(form);
			formInput = $(form).find('.input');
		formInput.on('blur', function () {
			var $this = $(this);
			if ($this.val().trim() !== '') {
				$this.addClass('input--valid');
			} else {
				$this.removeClass('input--valid');
			}
		});
		form.find('textarea').autoResize();
	}
	animateForm('#formModal');
	animateForm('#formStatic');

	// validator
	function validateForm(form) {
		var form = $(form),
			userName = form.find('.input[name="name"]'),
			userEmail = form.find('.input[name="email"]'),
			userComment = form.find('textarea.input'),
			emailPattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i,
			error = form.find("#regisErr");
		form.on('submit', function (e) {
			// e.preventDefault();
			if (userName.val().trim() == '') {
				error.addClass('is-error').text('Заполните Ваше имя');
				userName.focus();
				return false
			}

			if (userEmail.val().trim() == '') {
				error.addClass('is-error').text('Заполните Ваш email');
				userEmail.focus();
				return false
			} 
			if (!emailPattern.test(userEmail.val().trim())) {
				console.log('1111');
				error.addClass('is-error').text('Неверный формат email');
				userEmail.focus();
				return false
			}
			
			if (userComment.val().trim() == '') {
				error.addClass('is-error').text('Оставьте комментарий');
				userComment.focus();
				return false
			}
		})
	}
	validateForm('#formModal');
	validateForm('#formStatic');

	// MODAL 
	$('.open-modal').on('click', function () {
		$('#modalForm').arcticmodal({
			closeOnOverlayClick: false
		});
	})

	// PARALLAX descktop only
	if (descktopScreen.matches) {
		function parallaxCloud(screen) {
			var screen = $(screen),
				cloud = screen.find(".cloud");
			$(window).on("mousemove", function (e) {
				var width = screen.width(),
					height = screen.height(),
					indent = screen.offset(),
					offsetX = 0.5 - e.pageX / width,
					offsetY = 0.5 - e.pageY / (height + indent.top);
				cloud.each(function (index, elem) {
					var offset = parseInt($(elem).data("offset"));
					var translate = "translate3d(" + Math.round(offsetX * offset) 
					+ "px," + Math.round(offsetY * offset) + "px, 0px";
					$(elem).css({"transform":translate})
				})
			})
		}
		parallaxCloud("#parallaxMain");
		parallaxCloud("#parallaxServices");
		parallaxCloud("#parallaxForm");
	}

	// ANIMATION
	var wow = new WOW({
		boxClass: 'wow',
		offset: 100,
		mobile: false,
		callback: function(box) {},
		scrollContainer: null,
		resetAnimation: true
	});
	wow.init();

});