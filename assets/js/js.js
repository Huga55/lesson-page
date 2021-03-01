

//при клике на название урока берем ID видео и оправляем запрос на сервер для получения данных урока
$("body").on("click", ".nk-menu-link_video", function(e) {
	e.preventDefault();
	const idVideo = $(this).attr("data-video-id");
});


//получение всех уроков для формирования ссылок на них
$.ajax({
	type: "GET",
	url: "/lesson",
	success: function(response) {
		if(response.success) {

		}
	},
	error: function(error) {
		console.log(error);
	}
});