var $ = jQuery;

//Form Stylization
function formStylization() {
	var radio = 'input[type="radio"]',
		checkbox = 'input[type="checkbox"]';

	$(radio).wrap('<div class="new-radio"></div>').closest('.new-radio').append('<span></span>');
	$(checkbox).wrap('<div class="new-checkbox"></div>').closest('.new-checkbox').append('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 13 11" enable-background="new 0 0 13 11" xml:space="preserve"><polyline points="0.2,4.6 1,4 5,9 12,0 12.8,0.6 5.8,9.6 5,10.6 4.2,9.6 0.2,4.6 "/></svg>');
	$(checkbox + ':checked').parent('.new-checkbox').addClass('checked');
	$(radio + ':checked').parent('.new-radio').addClass('checked');
	$(checkbox + ':disabled').closest('.checkbox').addClass('disabled');
	$(radio + ':disabled').closest('.radio').addClass('disabled');

	$('body').on('click', function () {
		$(radio).parent('.new-radio').removeClass('checked');
		$(radio + ':checked').parent('.new-radio').addClass('checked');
		$(checkbox).parent('.new-checkbox').removeClass('checked');
		$(checkbox + ':checked').parent('.new-checkbox').addClass('checked');
		$(radio).closest('.radio').removeClass('disabled');
		$(checkbox).closest('.checkbox').removeClass('disabled');
		$(radio + ':disabled').closest('.radio').addClass('disabled');
		$(checkbox + ':disabled').closest('.checkbox').addClass('disabled');
	});

	if ($.fn.selectpicker) {
		$('select:not(".without-styles")').selectpicker();
	}
}

//Main Menu
function mainMenu() {
	var menu = $('#main-menu'),
		link = $('#main-menu a, .go-section'),
		url = window.location.href,
		hash = url.substring(url.indexOf('#')),
		homeId = 'home';
	console.log(hash)
	link.on('click', function (e) {
		var $this = $(this),
			id = $this.attr('href').split('#').pop(),
			duration = 1;

		e.preventDefault();

		console.log(id)
		if (!$('#' + id).length) {
			console.log('No such section!');
			return false;
		}

		link.removeClass('active');

		animateFinish();

		$('.section.active [data-out-animation]').each(function () {
			var $this = $(this);

			if ($this.data('outAnimationDelay')) {
				if ($this.data('outAnimationDelay') >= duration) {
					duration = $this.data('outAnimationDelay');
				}
			}
		});

		if (!$this.hasClass('open')) {
			link.removeClass('open');

			menu.find('[href="#' + id + '"]').addClass('active').addClass('open');

			$('body').find('.preloader').delay(duration + 500).fadeIn(400, function () {
				$('.section').removeClass('active');

				$('#' + id).addClass('active');

				$(this).fadeOut(400);

				setTimeout(function () {
					contentScroll();
					animateStart();
				}, 0);

				document.location.hash = '#' + id;
			});
		} else {
			$('body').find('.preloader').delay(duration + 500).fadeIn(400, function () {
				link.removeClass('open');

				$('.section').removeClass('active');

				$('#' + homeId).addClass('active');

				$(this).fadeOut(400);

				setTimeout(function () {
					contentScroll();
					animateStart();
				}, 0);

				document.location.hash = '#' + homeId;
			});
		}
	});

	if (hash != '#')
		$('[href="' + hash + '"]').trigger('click');
}

//Animate Start
function animateStart() {
	var activeSection = $('.section.active');

	$('[data-animation]').each(function () {
		var $this = $(this),
			animation = 'fadeIn',
			delay = 1;

		if ($this.data('animation')) {
			animation = $this.data('animation');
		}

		if ($this.data('animationDelay')) {
			delay = $this.data('animationDelay');
		}

		if ($this.closest('.section').hasClass('active')) {
			$this.css('animation-delay', delay + 'ms').addClass('animated').addClass(animation);
		}
	});
}

//Animate Finish
function animateFinish() {
	var activeSection = $('.section.active'),
		duration = 1;

	$('[data-out-animation]').each(function () {
		var $this = $(this),
			animation = 'fadeIn',
			outAnimation = 'fadeOut',
			delay = 1,
			outDelay = 1;

		if ($this.data('animation')) {
			animation = $this.data('animation');
		}

		if ($this.data('outAnimation')) {
			outAnimation = $this.data('outAnimation');
		}

		if ($this.data('animationDelay')) {
			delay = $this.data('animationDelay');
		}

		if ($this.data('outAnimationDelay')) {
			outDelay = $this.data('outAnimationDelay');
		}

		$this.css('animation-delay', delay + 'ms');

		if ($this.closest('.carousel')) {
			var carousel = $this.closest('.carousel'),
				carouselAnimate = 'zoomIn';

			if (carousel.data('carouselAnimation')) {
				carouselAnimate = carousel.data('carouselAnimation');
			}

			$this.removeClass(carouselAnimate);
		}

		if ($this.closest('.section').hasClass('active')) {
			if (outDelay >= duration) {
				duration = outDelay;
			}

			$this.removeClass(animation).addClass(outAnimation);

			if ($this.data('outAnimationDelay')) {
				$this.css('animation-delay', outDelay + 'ms');
			} else {
				$this.css('animation-delay', '1ms');
			}
		} else {
			$this.removeClass(animation).removeClass(outAnimation).removeAttr('style', 'animation-delay');
		}
	});
}

//Carousels
// function carousels(){
//   var carouselBox = $('.carousel-box');

//   carouselBox.each(function(){
// 		var thisBox      = $(this),
// 				carousel     = $(this).find('.carousel'),
// 				animation    = 'zoomIn',
// 				animationOut = 'zoomOut',
// 				items        = {0 : {items : 1}, 768 : { items : 3}};

// 		if (thisBox.data('carouselAnimation')){
// 			animation = thisBox.data('carouselAnimation');
// 		}

// 		if (thisBox.data('carouselOutAnimation')){
// 			animationOut = thisBox.data('carouselOutAnimation');
// 		}

// 		carousel.owlCarousel({
// 			loop            : true,
// 			margin          : 20,
// 			pullDrag        : false,
// 			responsiveClass : true,
// 			responsive      : items,
// 			mouseDrag       : false,
// 			touchDrag       : false,
// 			navRewind       : false,
// 			dots            : false
// 		}).touchwipe({
// 			wipeLeft: function(){
// 				thisBox.find('.carousel-controls .next').trigger('click');
// 			},
// 			wipeRight: function(){
// 				thisBox.find('.carousel-controls .prev').trigger('click');
// 			},
// 			preventDefaultEvents: false
// 		});

// 		carousel.closest('.carousel-box').on('click', '.nav-item', function(e){
// 			var item = carousel.find('.owl-item .item');

// 			e.preventDefault();

// 			item.css('animation-delay', '1ms');

// 			item.each(function(){
// 				var $this = $(this);

// 				if ($this.data('animation')){
// 					$this.removeClass($this.data('animation'));
// 				}

// 				$this.addClass(animationOut);
// 			});

// 			var event = 'next';

// 			if ($(this).hasClass('prev')) {
// 				event = 'prev';
// 			}

// 			setTimeout(function(){
// 				carousel.trigger(event + '.owl.carousel');
// 			}, 400);

// 			setTimeout(function(){
// 				item.removeClass(animationOut).addClass(animation);
// 			}, 800);
// 		});
//   });
// }

//Send Email
function sendEmail() {
	$('.send-email').on('click', function (e) {
		var $this = $(this);

		e.preventDefault();

		$.ajax({
			url: 'php/u-c.php',
			type: 'POST',
			data: $this.closest('.under-construction').serialize(),
			success: function (data) {
				if ($(data).is('.send-true')) {
					$this.addClass('loading').delay(650).queue(function () {
						$this.addClass('success').addClass('loaded').dequeue();
					});
				} else {
					$this.addClass('error');
				}

				$this.delay(500).queue(function () {
					$this.removeClass('loaded').removeClass('loading').dequeue();
				});

				$this.delay(400).queue(function () {
					if ($(data).is('.send-true')) {
						$this.removeClass('success').closest('.under-construction').trigger('reset');
					} else {
						$this.removeClass('error');
					}
					$this.dequeue();
				});
			}
		});

		return false;
	});
}

//Contact Form
function contactForm() {
	$('.btn-submit').on('click', function (e) {
		var $this = $(this);

		e.preventDefault();

		$.ajax({
			url: 'php/contact.php',
			type: 'POST',
			data: $this.closest('.contact-form').serialize(),
			success: function (data) {
				if ($(data).is('.send-true')) {
					$this.addClass('loading').delay(650).queue(function () {
						$this.addClass('success').addClass('loaded').dequeue();
					});
				} else {
					$this.addClass('error');
				}

				$this.delay(500).queue(function () {
					$this.removeClass('loaded').removeClass('loading').dequeue();
				});

				$this.delay(400).queue(function () {
					if ($(data).is('.send-true')) {
						$this.removeClass('success').closest('.contact-form').trigger('reset');
					} else {
						$this.removeClass('error');
					}
					$this.dequeue();
				});
			}
		});
	});
}

//Content Scroll
function contentScroll() {
	var section = $('.section.active');

	if (section.length && $.fn.mCustomScrollbar) {
		section.each(function () {
			var $this = $(this);

			if (($this.height() - 40) < $this.find('.container').height()) {
				$this.addClass('scroll-content');

				if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/)) {
					$this.find('.section-content').mCustomScrollbar({
						scrollInertia: 100
					});
				}
			} else {
				$this.removeClass('scroll-content');
			}
		});
	}
}

//Notify My
function notifyMy() {
	var margin = 70;

	if (($('body').height() < 600) || ($('body').width() < 768)) {
		margin = 0;
	}

	$('.notify-my .modal-dialog').css('margin-top', (($('body').height() - $('.notify-my .modal-dialog').height()) / 2) - margin);
}

$(document).ready(function () {
	'use strict';

	var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/);

	//Touch device
	if (isTouchDevice) {
		$('body').addClass('touch-device');
		$('.background-video').remove();
	}

	//Bootstrap Elements
	$('[data-toggle="tooltip"], .tooltip-link').tooltip();

	$('a[data-toggle=popover]')
		.popover()
		.click(function (e) {
			e.preventDefault();
		});

	$('.disabled, fieldset[disabled] .selectBox').click(function () {
		return false;
	});

	//Functions
	formStylization();
	mainMenu();
	sendEmail();
	contactForm();

	//Functions(load)
	$(window).load(function () {
		animateStart();
		contentScroll();

		//Preloader
		$('body').delay(500).addClass('loaded').find('.preloader').fadeOut(400);
	});

	//Notify me (MailChimp)
	if (($('.mailchimp').length) && ($.fn.ajaxChimp)) {
		$('.mailchimp').ajaxChimp({
			url: 'http://us10.list-manage.com/subscribe/post?u=69007f000c70b89e124b9308d&amp;id=1225ba8aee'
		});
	}

	//Retina
	if ('devicePixelRatio' in window && window.devicePixelRatio >= 2) {
		var imgToReplace = $('img.replace-2x').get();

		for (var i = 0, l = imgToReplace.length; i < l; i++) {
			var src = imgToReplace[i].src;

			src = src.replace(/\.(png|jpg|gif)+$/i, '@2x.$1');

			imgToReplace[i].src = src;

			$(imgToReplace[i]).load(function () {
				$(this).addClass('loaded');
			});
		}
	}

	//Count Down
	if (($('.countdown').length) && ($.fn.countdown)) {
		var countdown = $('.countdown');

		countdown.each(function () {
			var $this = $(this),
				austDay = new Date(2016, 1 - 1, 1);

			if ($this.data('date')) {
				var date = $this.data('date').split(' ');

				austDay = new Date(parseFloat(date[0]), parseFloat(date[1]) - 1, parseFloat(date[2]));
			}

			$this.countdown({
				until: austDay,
				format: 'DHMS',
				significant: 1,
				description: ' left'
			});
		});
	}

	//Notify My
	$('.notify-my').on('shown.bs.modal', function () {
		notifyMy();
	});


	$('.modal').on('hidden.bs.modal', function (e) {
		var video = $(this).find('.vimeo-video iframe');

		if (video.length) {
			var player = $f(video[0]);

			player.api('pause');
		}
	});

	//Pin It
	if ($('[data-pin-do]').length) {
		!function (a, b, c) {
			var d, e, f;

			f = 'PIN_' + ~~((new Date).getTime() / 864e5), a[f] || (a[f] = !0, a.setTimeout(function () {
				d = b.getElementsByTagName('SCRIPT')[0],
					e = b.createElement('SCRIPT'),
					e.type = 'text/javascript',
					e.async = !0,
					e.src = c + '?' + f,
					d.parentNode.insertBefore(e, d)
			}, 10))
		} (window, document, '//assets.pinterest.com/js/pinit_main.js');
	}
});

//Window Resize
(function () {
	var delay = (function () {
		var timer = 0;
		return function (callback, ms) {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		};
	})();

	function resizeFunctions() {
		//Functions
		videoBg();
		contentScroll();
		notifyMy();
	}

	if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|Windows Phone)/)) {
		$(window).bind('orientationchange', function () {
			resizeFunctions();
		});
	} else {
		$(window).on('resize', function () {
			delay(function () {
				resizeFunctions();
			}, 500);
		});
	}
} ());