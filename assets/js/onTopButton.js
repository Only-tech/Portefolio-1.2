window.addEventListener("scroll", function() {
    let scrollProgressWrapper = document.getElementById("scrollProgressWrapper");

    if (window.scrollY > 500) {
        scrollProgressWrapper.style.display = "flex";
    } else {
        scrollProgressWrapper.style.display = "none";
    }
});

function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('scroll', updateScrollProgress);

function updateScrollProgress() {
    const circle = document.getElementById('progressActive');

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollRatio = scrollHeight === 0 ? 0 : scrollTop / scrollHeight;

    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - scrollRatio);

    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = `${offset}`;
}