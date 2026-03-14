// Faculty Popovers
document.querySelectorAll(".teacher").forEach(el => {
    new bootstrap.Popover(el, {
        trigger: "hover",
        placement: "top",
        html: true,
        content: `
        <div class="d-flex align-items-center gap-3">
            <img src="assets/teacher.jpg" class="teacher-img" style="width:50px; height:50px; border-radius:50%; object-fit:cover;">
            <div>
                <strong class="d-block">${el.innerText}</strong>
                <small class="text-muted">Faculty Member</small>
            </div>
        </div>`
    });
});

// Intersection Observer for Reveal Animations
const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, {
    threshold: 0.1
});

document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
});
