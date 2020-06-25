$(document).ready(function () {

	// ********* the admin accounts animation ************

	$('.admin ul ').click(function (e) {
		if (e.target.className == 'btn btn-sm btn-success read_more') {
			$(e.target.parentElement.parentElement).toggleClass('admin_li_anmi')
		}
	})



})
