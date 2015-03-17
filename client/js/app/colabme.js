$(document).ready(function() {

	// menu start

	var body =  $(window),  
			wrapper = $('.wrapper'),
			content = $('.content'),
			menu_btn = $('.menu_btn'),
			nav_menu = $('.nav_menu'),
			form_input = $('.content .add_moodboard_form .form_input input'),
			workflow = $('.workflow'),
			left_sb = $('.left_sidebar');

	var wrapperWidth = wrapper.width();
	var wrapperHeight0 = wrapper.height();
	var contentWidth = content.width();
	var contentWidthSlide = wrapperWidth - 309;

	form_input.width(contentWidth - 26);

	menu_btn.on('click', function() {
		content.toggleClass('slide');
		nav_menu.toggleClass('slide');
		content.width(contentWidthSlide);
		form_input.width(contentWidthSlide - 26);
		var wrapperHeight = wrapper.height();
		if ( $('.content h1').hasClass('add_moodboard_title') ){
			nav_menu.height(wrapperHeight + 82);
		} else if (content.hasClass('page') ) {
			nav_menu.height(body.height() - 92);
		} else {
			nav_menu.height(wrapperHeight + 65);
		}
		if (!content.hasClass('slide')) {
			content.width(contentWidth);
			form_input.width(contentWidth - 26);
			nav_menu.height(wrapperHeight0);
		}
	});

	workflow.width( body.width() - left_sb.width() - 54 );
	workflow.height( body.height() - 92 );
	left_sb.height( body.height() - 92 );



	$(window).resize( function() {
		location.reload();
	});

	// menu end

	// select2 start 

		$('.participants').select2({
			data: [
				{id:0, text: "Ivan Ivanenko"},
				{id:1, text: "Petro Petrenko"},
				{id:2, text: "Dima Dimenko"}
			],
			multiple: true,
			width: "100%"
		});

	// select2 end

});