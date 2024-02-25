const tooltipElements = document.querySelectorAll('.has-tooltip');

tooltipElements.forEach((element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();

    const text = element.getAttribute('title');
    const position = element.getBoundingClientRect();

    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = text;

    tooltip.style.top = position.top + element.offsetHeight + 'px';
    tooltip.style.left = position.left + 'px';

    document.body.appendChild(tooltip);

    element.removeAttribute('title');

    const handleClickOutside = (event) => {
      if (!element.contains(event.target) && !tooltip.contains(event.target)) {
        tooltip.parentNode.removeChild(tooltip);
        document.removeEventListener('click', handleClickOutside);
      }
    };

    document.addEventListener('click', handleClickOutside);
  });
});