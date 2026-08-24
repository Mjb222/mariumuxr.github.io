// Lightweight scroll-spy for the case-study process tracker.
// Highlights the current phase as the visitor scrolls, and marks
// earlier phases as "done". No dependencies.
(function () {
	document.addEventListener('DOMContentLoaded', function () {
		var items = Array.prototype.slice.call(document.querySelectorAll('.tracker li[data-step]'));
		var sections = items
			.map(function (li) {
				var id = li.getAttribute('data-step');
				return { li: li, el: document.getElementById(id) };
			})
			.filter(function (s) { return s.el; });

		if (!sections.length) return;

		function setActive(index) {
			sections.forEach(function (s, i) {
				s.li.classList.remove('is-active', 'is-done');
				if (i < index) s.li.classList.add('is-done');
				if (i === index) s.li.classList.add('is-active');
			});
		}

		if ('IntersectionObserver' in window) {
			var observer = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							var idx = sections.findIndex(function (s) { return s.el === entry.target; });
							if (idx > -1) setActive(idx);
						}
					});
				},
				{ rootMargin: '-40% 0px -55% 0px', threshold: 0 }
			);
			sections.forEach(function (s) { observer.observe(s.el); });
		}

		setActive(0);
	});
})();
