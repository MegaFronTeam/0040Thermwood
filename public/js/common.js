"use strict";
const JSCCommon = {
	modalCall() {
		const link = '.btn-modal-js';
		Fancybox.bind(link, {
			type: 'html',
			arrows: false,
			// // infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			showClass: "fancybox-throwOutUp",
			hideClass: "fancybox-throwOutDown",
			l10n: {
				CLOSE: "Закрыть",
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
				MODAL: "Вы можете закрыть это модальное окно с помощью клавиши ESC.",
				ERROR: "Что-то пошло не так. Пожалуйста, повторите попытку позже",
				IMAGE_ERROR: "Изображение не найдено",
				ELEMENT_NOT_FOUND: "HTML-элемент не найден",
				AJAX_NOT_FOUND: "Ошибка при загрузке AJAX: не найдено",
				AJAX_FORBIDDEN: "Ошибка при загрузке AJAX: запрещено",
				IFRAME_ERROR: "Ошибка загрузки iframe",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		document.addEventListener('click', (event) => {
			let element = event.target.closest(link)
			if (!element) return;
			let modal = document.querySelector(element.dataset.src);
			const data = element.dataset;

			function setValue(val, elem) {
				if (elem && val) {
					const el = modal.querySelector(elem)
					el.tagName == "INPUT"
						? el.value = val
						: el.innerHTML = val;
					// console.log(modal.querySelector(elem).tagName)
				}
			}
			setValue(data.title, '.ttu');
			setValue(data.text, '.after-headline');
			setValue(data.btn, '.btn');
			setValue(data.order, '.order');
		})
	},
	// /modalCall
	toggleMenu() {
		const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
		const menu = document.querySelector('.menu-mobile--js');
		toggle.forEach((el) => el.classList.toggle('on'));
		menu.classList.toggle('active');
		[document.body, document.querySelector('html')].forEach((el) => el.classList.toggle('fixed'));
	},
	closeMenu() {
		const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
		const menu = document.querySelector('.menu-mobile--js');
		toggle.forEach((element) => element.classList.remove('on'));
		if (menu) {
			menu.classList.remove('active');
			[document.body, document.querySelector('html')].forEach((el) => el.classList.remove('fixed'));
		}
	},
	mobileMenu() {
		document.addEventListener('click', (event) => {
			let container = event.target.closest('.menu-mobile--js'); // (1)
			let toggle = event.target.closest('.toggle-menu-mobile--js'); // (1)
			if (toggle) this.toggleMenu();
			if (!container && !toggle) this.closeMenu();
		},
			{ passive: true },
		);

		window.addEventListener('resize', () => {
			if (window.matchMedia('(min-width: 992px)').matches) this.closeMenu();
		},
			{ passive: true },
		);
	},

	// tabs  .
	tabscostume(tab) {
		// const tabs = document.querySelectorAll(tab);
		// const indexOf = element => Array.from(element.parentNode.children).indexOf(element);
		// tabs.forEach(element => {
		// 	let tabs = element;
		// 	const tabsCaption = tabs.querySelector(".tabs__caption");
		// 	const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		// 	const tabsWrap = tabs.querySelector(".tabs__wrap");
		// 	const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		// 	const random = Math.trunc(Math.random() * 1000);
		// 	tabsBtn.forEach((el, index) => {
		// 		const data = `tab-content-${random}-${index}`;
		// 		el.dataset.tabBtn = data;
		// 		const content = tabsContent[index];
		// 		content.dataset.tabContent = data;
		// 		if (!content.dataset.tabContent == data) return;

		// 		const active = content.classList.contains('active') ? 'active' : '';
		// 		// console.log(el.innerHTML);
		// 		content.insertAdjacentHTML("beforebegin", `<div class="tabs__btn-accordion  btn btn-primary  mb-1 ${active}" data-tab-btn="${data}">${el.innerHTML}</div>`)
		// 	})


		// 	tabs.addEventListener('click', function (element) {
		// 		const btn = element.target.closest(`[data-tab-btn]:not(.active)`);
		// 		if (!btn) return;
		// 		const data = btn.dataset.tabBtn;
		// 		const tabsAllBtn = this.querySelectorAll(`[data-tab-btn`);
		// 		const content = this.querySelectorAll(`[data-tab-content]`);
		// 		tabsAllBtn.forEach(element => {
		// 			element.dataset.tabBtn == data
		// 				? element.classList.add('active')
		// 				: element.classList.remove('active')
		// 		});
		// 		content.forEach(element => {
		// 			element.dataset.tabContent == data
		// 				? (element.classList.add('active'), element.previousSibling.classList.add('active'))
		// 				: element.classList.remove('active')
		// 		});
		// 	})
		// })

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({ "mask": "+9(999)999-99-99", showMaskOnHover: false }).mask(InputTel);
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	heightSlide() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		function getSlideH() {
			let slideI = document.querySelectorAll('.sTeam__img-wrap');
			if (slideI.length == 0) return;
			let slideH, index = 0;
			for (const iterator of slideI) {
				if (index < 1) {
					slideH = iterator.offsetHeight;
					index++;
				} else break;
			};
			// console.log(slideH);
			document.documentElement.style.setProperty('--slideH', `${slideH}px`);
		};
		getSlideH();
		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			getSlideH();
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {

		// let parents = document.querySelectorAll('.dd-group-js');
		// for (let parent of parents) {
		// 	if (parent) {
		// 		// childHeads, kind of funny))
		// 		let ChildHeads = parent.querySelectorAll('.dd-head-js:not(.disabled)');
		// 		$(ChildHeads).click(function () {
		// 			let clickedHead = this;

		// 			$(ChildHeads).each(function () {
		// 				if (this === clickedHead) {
		// 					//parent element gain toggle class, style head change via parent
		// 					$(this.parentElement).toggleClass('active');
		// 					$(this.parentElement).find('.dd-content-js').slideToggle(function () {
		// 						$(this).toggleClass('active');
		// 					});
		// 				}
		// 				else {
		// 					$(this.parentElement).removeClass('active');
		// 					$(this.parentElement).find('.dd-content-js').slideUp(function () {
		// 						$(this).removeClass('active');
		// 					});
		// 				}
		// 			});

		// 		});
		// 	}
		// }
	},
	imgToSVG() {
		const convertImages = (query, callback) => {
			const images = document.querySelectorAll(query);

			images.forEach(image => {
				fetch(image.src)
					.then(res => res.text())
					.then(data => {
						const parser = new DOMParser();
						const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

						if (image.id) svg.id = image.id;
						if (image.className) svg.classList = image.classList;

						image.parentNode.replaceChild(svg, image);
					})
					.then(callback)
					.catch(error => console.error(error))
			});
		};

		convertImages('.img-svg-js');
	},
	disabledBtn(input = '.form-wrap__policy input', btn = ".form-wrap__btn", parent = ".form-wrap") {
		$(document).on("change", input, function () {
			let btnDisabled = $(this).parents(parent).find(btn)
			if (this.checked) {
				btnDisabled.removeAttr('disabled');
			}
			else {
				btnDisabled.attr('disabled', 'disabled');
			}
		})
	},
	rangerSlider(){
		var $range = $(".js-range-slider");
		var $input = $(".js-range-input");
		var valueArr = [0, 500, 900, 1500, 2000, 2800, 3500, 5000];

		$range.ionRangeSlider({
			type: "single",
			min: 0,
			max: 5000,
			from: 0,
			grid: true,
			prettify: valueArr,
			skin: "round",
			onStart: function (data) {
				$input.prop("value", valueArr[data.from]);
			},
			onChange: function (data) {
				$input.prop("value", valueArr[data.from]);
			}
		});
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();

	JSCCommon.disabledBtn();
	JSCCommon.rangerSlider();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = 'screen/' + document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(${screenName});"></div>`);
	}


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiperbreadcrumb = new Swiper('.breadcrumb-slider--js', {
		slidesPerView: 'auto',
		freeMode: true,
		watchOverflow: true
	});

	const swiperTabs = new Swiper('.tabs-swiper', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		watchOverflow: true,
		slideToClickedSlide: true,
		freeMode: {
			enabled: true,
			// sticky: true,
			momentumVelocityRatio: 0.3
		},
	});

	const sliderParents = document.querySelectorAll('.slider-wrapper');
	for (const sliderParent of sliderParents) {
		const autoSlider = new Swiper((sliderParent.querySelector('.slider-auto-js')), {
			slidesPerView: 'auto',
			spaceBetween: 0,
			watchOverflow: true,
			observer: true,
			observeSlideChildren: true,
			freeMode: {
				enabled: true,
				sticky: true,
				momentumVelocityRatio: 0.3
			},
			lazy: {
				loadPrevNext: true,
			},
			// breakpoints: {
			// 	768: {
			// 		spaceBetween: 24
			// 	}
			// },
			navigation: {
				nextEl: sliderParent.querySelector('.swiper-button-next'),
				prevEl: sliderParent.querySelector('.swiper-button-prev'),
			},
			pagination: {
				el: sliderParent.querySelector('.swiper-pagination'),
				type: 'bullets',
				clickable: true,
				// renderBullet: function (index, className) {
				// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
				// }
			},
		});
	};
	JSCCommon.heightSlide();

	var sProdCardThumbSwiper = new Swiper(".sProdCard__thumb-slider--js", {
		// spaceBetween: 10,
		slidesPerView: 'auto',
		spaceBetween: 0,
		watchSlidesProgress: true,
		navigation: {
			nextEl: ".sProdCard__thumb-wrapper .swiper-button-next",
			prevEl: ".sProdCard__thumb-wrapper .swiper-button-prev",
		},
	});
	var sProdCardSwiper = new Swiper(".sProdCard__slider--js", {
		slidesPerView: 'auto',
		spaceBetween: 0,
		// spaceBetween: 10,
		// navigation: {
		// 	nextEl: ".swiper-button-next",
		// 	prevEl: ".swiper-button-prev",
		// },
		thumbs: {
			swiper: sProdCardThumbSwiper,
		},
	});

	var sProjectSwiper = new Swiper(".sSlider__slider--proj", {
		slidesPerView: '2',
		spaceBetween: 16,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
              ' / ' +
              '<span class="' + totalClass + '"></span>';
      }
    },
    breakpoints: {
      768: {
        slidesPerView: '3',
      }
    },
		// thumbs: {
		// 	swiper: sProdCardThumbSwiper,
		// },
	});

  function initializeSwiper(selector) {
    return new Swiper(selector, {
        slidesPerView: '3',
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination-progressbar",
            type: "progressbar",
        },
        on: {
            slideChange: function () {
                var currentIndex = this.activeIndex + 1;
                document.querySelector(selector + ' .current-slide').innerText = currentIndex;
            },
        },
        breakpoints: {
            960: {
                spaceBetween: 20,
                slidesPerView: '6',
            }
        },
    });
}

  var sPaletteSwiper1 = initializeSwiper("#sSlidersPalette .swiper-1");
  var sPaletteSwiper2 = initializeSwiper("#sSlidersPalette .swiper-2");
  var sPaletteSwiper3 = initializeSwiper("#sSlidersPalette .swiper-3");
  var sPaletteSwiper4 = initializeSwiper("#sSlidersPalette .swiper-4");
  var sPaletteSwiper5 = initializeSwiper("#sSlidersPalette .swiper-5");
  var sPaletteSwiper6 = initializeSwiper("#sSlidersPalette .swiper-6");
  var sPaletteSwiper7 = initializeSwiper("#sSlidersPalette .swiper-7");

  // if (sPaletteSwiper.length > 1) {
  //     for (const item of sPaletteSwiper) {
  //       item.el.childNodes[3].children[0].childNodes[0].innerText = item.activeIndex + 1;
  //     }
  //   }

	// modal window
	const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
	const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl, {
		placement: 'auto',
		trigger: 'hover focus'
	}));


	const faqSlider = new Swiper('.sFaq__slider--js', {
		direction: 'vertical',
		slidesPerView: 'auto',
		freeMode: true,
		observeParents: true,
		observeSlideChildren: true,
		observer: true,
		scrollbar: {
			el: ".sFaq .swiper-scrollbar",
			draggable: true,
		},
		navigation: {
			nextEl: '.sFaq .swiper-button-next',
			prevEl: '.sFaq .swiper-button-prev',
		},
		mousewheel: true,
	});




	$('.dd-head-js').on('click', function () {
		let clickedHead = this;
		$(this).parent().toggleClass('active');
		$(this)
			.next()
			.slideToggle(function () {
				$(this).toggleClass('active');
				if ($(this).has('.sFaq__slider--js').length){
					faqSlider.update()
				}
			});
	});

	const sBlogSlider = new Swiper('.sBlog__slider--js', {
		// loop: true,
		spaceBetween: 70,
		slidesPerView: 1,
		navigation: {
			nextEl: '.sBlog .swiper-button-next',
			prevEl: '.sBlog .swiper-button-prev',
		}
	});

	new Swiper('.section__slider--js', {
		// loop: true,
		spaceBetween: 10,
		slidesPerView: 'auto',
		// navigation: {
		// 	nextEl: '.sBlog .swiper-button-next',
		// 	prevEl: '.sBlog .swiper-button-prev',
		// }
	});



	const sBlogSlider2 = new Swiper('.sBlog__slider--2js', {
		loop: true,
		// spaceBetween: 30,
		slidesPerView: 'auto',
		navigation: {
			nextEl: '.sBlog .swiper-button-next',
			prevEl: '.sBlog .swiper-button-prev',
		}
	});

	new Swiper('.section__slider--js', {
		// loop: true,
		spaceBetween: 10,
		slidesPerView: 'auto',
		// navigation: {
		// 	nextEl: '.sBlog .swiper-button-next',
		// 	prevEl: '.sBlog .swiper-button-prev',
		// }
	});


	var swipersPortfolio = new Swiper(".sPortfolio__slider--js", {
		effect: "coverflow",
		grabCursor: true,
		centeredSlides: true,
		slidesPerView: "auto",
		loop: true,
		// loopedSlides: 10,
		coverflowEffect: {
			rotate: 0,
			stretch: -60,
			depth: 100,
			modifier: 4,
			slideShadows: false,
		},
	});

	document.addEventListener('click', function (event) {
		let menuItemWithSubMenuTarget = event.target.closest('.menu-item-has-children span');
		let menuItemWithSubMenu = document.querySelector('.menu-item-has-children');
		if (menuItemWithSubMenuTarget && window.matchMedia('(max-width: 992px)').matches) {
			menuItemWithSubMenu.classList.toggle('active');
			$('.menu-item-has-children .sub-menu').slideToggle();
		}
	})

	let modalSliders = document.querySelectorAll(".modal-win");
	if (modalSliders){

		for (const item of modalSliders) {
			
			var modalThumbSwiper = new Swiper(item.querySelector(".modal-win__slider--thumbs-js"), {
				// spaceBetween: 10,
			slidesPerView: 'auto',
			// spaceBetween: 0,
			watchSlidesProgress: true,

			observeParents: true,
			observer: true,
		});
		var modalSwiper = new Swiper(item.querySelector(".modal-win__slider--js"), {
			slidesPerView: 'auto',
			// spaceBetween: 0,
			observeParents: true,
			observer: true,
			thumbs: {
				swiper: modalThumbSwiper,
			},
		});
		} 
	}

	function inputFile() {
		if (document.querySelector('.upload-field')) {
			let uploadField = document.querySelectorAll('.upload-field');
			for (let i = 0; i < uploadField.length; i++) {
				let inputFile = uploadField[i].querySelector('.input-upload');
				inputFile.addEventListener('change', () => uploadField[i].querySelector('.upload-field__file-name').innerHTML = inputFile.files[0].name);
			}
		}
	}
	inputFile();



};

if (document.readyState !== 'loading') {

	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }