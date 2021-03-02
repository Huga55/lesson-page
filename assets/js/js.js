

//при клике на название урока подгружаем видео в frame по ссылке ютуба
$("body").on("click", ".nk-menu-link_video", function(e) {
	e.preventDefault();
	const idVideo = $(this).attr("data-video-id");
});


//получение всех уроков для формирования ссылок на них
$.ajax({
	type: "GET",
	url: "education.php?getLessons=true",
	success: function(response) {
		console.log(JSON.parse(response));
		const data = JSON.parse(response);
		if(data.success) {
			const lessons = data.result;
			let lessonsHtml = "";
			for(let category in lessons) {
				lessonsHtml += '<li class=\"nk-menu-item has-sub\"><a href=\"#\" class=\"nk-menu-link nk-menu-toggle\"><span class=\"nk-menu-text\">' + category + '</span></a><ul class=\"nk-menu-sub\">';
				for(let lesson of lessons[category]) {
					lessonsHtml += '<li class=\"nk-menu-item\"><a href="' + lesson.link + '" class=\"nk-menu-link nk-menu-link_video\"><span class=\"nk-menu-text\">' + lesson.lesson + '</span></a></li>';
				}
				lessonsHtml += '</ul></li>';
			}

			$(".nk-menu").html(lessonsHtml);
		}
	},
	error: function(error) {
		console.log(error);
	}
});